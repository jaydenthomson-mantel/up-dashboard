
const validTokenRegex = /^up:yeah:[a-zA-Z0-9]+$/

export const validateAccessToken = (accessToken: string) => {
    if (accessToken === "") {
        return { error: true, errorReason: "Access token is empty." };
    }
    if (!validTokenRegex.test(accessToken)) {
        return { error: true, errorReason: "Access token is not in the expected format." };
    }
    return { error: false, errorReason: "" };
};