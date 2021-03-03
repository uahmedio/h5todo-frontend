import axios from "../../axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (token, user, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token,
		user,
		userId,
		errorMessage: null,
		errorStatus: null,
		errorStatusText: null,
		loading: false,
	};
};

export const authFail = (errorMessage, errorStatus, errorStatusText) => {
	return {
		type: actionTypes.AUTH_FAIL,
		errorMessage,
		errorStatus,
		errorStatusText,
	};
};

export const logout = () => {
	localStorage.removeItem("JWT_TOKEN");
	localStorage.removeItem("USER_ID");
	localStorage.removeItem("AUTH_STATE");

	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const clearAuthError = () => {
	return {
		type: actionTypes.AUTH_ERROR_CLEAR,
	};
};

export const authSignIn = (data) => {
	return async (dispatch) => {
		try {
			dispatch(authStart());
			const res = await axios.post("/api/user/login", data);
			dispatch(authSuccess(res.data.token, res.data.user, res.data.user.id));

			localStorage.setItem("JWT_TOKEN", res.data.token);
			localStorage.setItem("USER_ID", res.data.user.id);

			axios.defaults.headers.common["Authorization"] = res.data.token;
		} catch (error) {
			dispatch(authFail("Error logging in", 500, "Internal Server Error"));
		}
	};
};
