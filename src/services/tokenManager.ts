
let accessToken: string | null = null;

const tokenManager = {
    setAccessToken: (access: string) => {
        accessToken = access;
    },

    getAccessToken: () => accessToken,

    clearTokens: () => {
        accessToken = null;
    },
};

export default tokenManager;
