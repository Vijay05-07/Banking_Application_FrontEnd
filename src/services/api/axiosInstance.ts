import axios,{AxiosError} from "axios";
import tokenManager from "../tokenManager";


declare module "axios"{
  export interface InternalAxiosRequestConfig{
    _retry?:boolean;
  }
}

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081";

const axiosInstance = axios.create({
  baseURL,
  withCredentials:true,
  timeout: 15000, 
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshClient =axios.create({
  baseURL,
  withCredentials:true,
  timeout: 15000,
  headers :{
    "Content-Type" : "application/json"
  }
})

//shared RefreshPromise

let refreshPromise: Promise<string> | null= null ;

let isRedirecting =false;

 
//Attach access token to every API request
axiosInstance.interceptors.request.use(
  (config) => {
    const accessTokeen = tokenManager.getAccessToken();

    if (accessTokeen) {
      config.headers["Authorization"] = `Bearer ${accessTokeen}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

//Refresh accessToken
async function refreshAccessToken(): Promise<string> {

  const currentSession = tokenManager.getSessionVersion();

  const response = await refreshClient.post<{
    accessToken: string;
  }>("/auth/refresh", {});

  if (currentSession !== tokenManager.getSessionVersion()) {
    throw new Error("Authentication session has ended");
  }

  const newAccessToken = response.data.accessToken;

  if (!newAccessToken) {
    throw new Error("Access token missing in refresh response");
  }

  tokenManager.setAccessToken(newAccessToken);

  return newAccessToken;
}

export function restoreSession(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ code?: string}>) =>{

    if(error.response){
      console.error(
        "API Error:",
        error.response.status,
        error.response.data
      );
    } else if(error.request){
      console.error("No response recieved:", error.request);
    } else {
       console.error("Error setting request:",error.message);
    }

    const originalRequest =error.config;

    if(error.response?.status !== 401 || !originalRequest || originalRequest._retry ||
      error.response.data?.code !== "ACCESS_TOKEN_EXPIRED"
    ){
      return Promise.reject(error);
    }
    originalRequest._retry=true;

    try{
      const newAccessToken = await restoreSession();

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return axiosInstance(originalRequest);
    } catch(refreshError){
      tokenManager.clearTokens();

      if(!isRedirecting){
        isRedirecting =true;
        window.location.href = "/login";
      }
      return Promise.reject(refreshError);
    }
  }
);

export default axiosInstance;
