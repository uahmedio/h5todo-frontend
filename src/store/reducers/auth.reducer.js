import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/utility";

const initialState = {
	loggedIn: false,
	firstName: null,
	lastName: null,
	email: null,
	token: null,
	userId: null,
	errorMessage: null,
	errorStatus: null,
	errorStatusText: null,
	loading: null,
};

// start the authentication
const authStart = (state, action) => {
	const updatedState = updateObject(state, {
		errorMessage: null,
		errorStatus: null,
		errorStatusText: null,
		loading: true,
	});
	localStorage.setItem("AUTH_STATE", JSON.stringify(updatedState));
	return updatedState;
};

const authSuccess = (state, action) => {
	const updatedState = updateObject(state, {
		loggedIn: true,
		firstName: action.user.firstName,
		lastName: action.user.lastName,
		email: action.user.email,
		token: action.token,
		userId: action.userId,
		errorMessage: null,
		errorStatus: null,
		errorStatusText: null,
		loading: false,
	});

	localStorage.setItem("AUTH_STATE", JSON.stringify(updatedState));
	return updatedState;
};

const authFail = (state, action) => {
	const updatedState = updateObject(state, {
		errorMessage: action.errorMessage,
		errorStatus: action.errorStatus,
		errorStatusText: action.errorStatusText,
		loading: false,
	});
	localStorage.setItem("AUTH_STATE", JSON.stringify(updatedState));
	return updatedState;
};

const authClearErrors = (state, action) => {
	const updatedState = updateObject(state, {
		errorMessage: null,
		errorStatus: null,
		errorStatusText: null,
	});
	localStorage.setItem("AUTH_STATE", JSON.stringify(updatedState));
	return updatedState;
};

const authLogout = (state, action) => {
	const updatedState = updateObject(state, {
		loggedIn: false,
		firstName: null,
		lastName: null,
		email: null,
		token: null,
		userId: null,
		errorMessage: null,
		errorStatus: null,
		errorStatusText: null,
		loading: false,
	});
	localStorage.setItem("AUTH_STATE", JSON.stringify(updatedState));
	return updatedState;
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state, action);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAIL:
			return authFail(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action);
		case actionTypes.AUTH_ERROR_CLEAR:
			return authClearErrors(state, action);
		default: {
			return state;
		}
	}
};

export default authReducer;
