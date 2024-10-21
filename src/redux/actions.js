export const loginRequest = () => ({ type: "LOGIN_REQUEST" });
export const loginSuccess = (user, token) => ({ type: "LOGIN_SUCCESS", payload: { user, token } });
export const loginFailure = (error) => ({ type: "LOGIN_FAILURE", payload: error });
export const logout = () => ({ type: "LOGOUT" });
export const updateIdentity = (updatedUserInfo) => ({
	type: "UPDATE_IDENTITY",
	payload: updatedUserInfo,
});
