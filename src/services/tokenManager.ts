let accessToken: string | null = null;
let refreshToken: string | null = null;

const tokenManager = {
  setTokens: (access: string, refresh: string) => {
    accessToken = access;
    refreshToken = refresh;
  },
  getAccessToken: () => accessToken,
  getRefreshToken: () => refreshToken,

  clearTokens: () => {
    accessToken = null;
    refreshToken = null;
  },
};

export default tokenManager;