let accessToken: string | null = null;
let sessionVersion = 0;

const tokenManager = {
    startSession: (access: string) => {
        sessionVersion++;
        accessToken = access;
    },

    setAccessToken: (access: string) => {
        accessToken = access;
    },

    getAccessToken: () => accessToken,

    getSessionVersion: () => sessionVersion,

    clearTokens: () => {
        sessionVersion++;
        accessToken = null;
    },
};

export default tokenManager;