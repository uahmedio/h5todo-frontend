import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { renderRoutes } from "react-router-config";
import { Provider as StoreProvider } from "react-redux";
import { configureStore } from "./store";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import routes from "./routes";
import axios from "axios";

import "./App.css";

const AuthState = JSON.parse(localStorage.getItem("AUTH_STATE")) || null;
// const AuthState = {
// 	loggedIn: true,
// 	first_name: "Usama",
// 	last_name: "Ahmed",
// 	email: "uah@bwt.dk",
// 	role: "ADMINISTRATOR", // ['EMPLOYEE', 'ADMINISTRATOR']
// 	token:
// 		"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwbGFubmVyIiwic3ViIjoyLCJyb2xlcyI6W3siYml0Ijo4LCJuYW1lIjoidXNlcjpkZWxldGUifSx7ImJpdCI6MTYsIm5hbWUiOiJlbXBsb3llZTpjcmVhdGUifSx7ImJpdCI6MzIsIm5hbWUiOiJlbXBsb3llZTpyZWFkIn0seyJiaXQiOjY0LCJuYW1lIjoiZW1wbG95ZWU6dXBkYXRlIn0seyJiaXQiOjEyOCwibmFtZSI6ImVtcGxveWVlOmRlbGV0ZSJ9LHsiYml0IjoyNTYsIm5hbWUiOiJjb21wYW55OmNyZWF0ZSJ9LHsiYml0Ijo1MTIsIm5hbWUiOiJjb21wYW55OnJlYWQifSx7ImJpdCI6MTAyNCwibmFtZSI6ImNvbXBhbnk6dXBkYXRlIn0seyJiaXQiOjIwNDgsIm5hbWUiOiJjb21wYW55OmRlbGV0ZSJ9LHsiYml0Ijo0MDk2LCJuYW1lIjoicHJvZHVjdDpjcmVhdGUifSx7ImJpdCI6ODE5MiwibmFtZSI6InByb2R1Y3Q6cmVhZCJ9LHsiYml0IjoxNjM4NCwibmFtZSI6InByb2R1Y3Q6dXBkYXRlIn0seyJiaXQiOjMyNzY4LCJuYW1lIjoicHJvZHVjdDpkZWxldGUifSx7ImJpdCI6NjU1MzYsIm5hbWUiOiJwcm9qZWN0OmNyZWF0ZSJ9LHsiYml0IjoxMzEwNzIsIm5hbWUiOiJwcm9qZWN0OnJlYWQifSx7ImJpdCI6MjYyMTQ0LCJuYW1lIjoicHJvamVjdDp1cGRhdGUifSx7ImJpdCI6NTI0Mjg4LCJuYW1lIjoicHJvamVjdDpkZWxldGUifSx7ImJpdCI6MTA0ODU3NiwibmFtZSI6ImFwcGxpY2F0aW9uOmNsaWVudCJ9XSwiaWF0IjoxNTk1NTA3MjcxLCJleHAiOjE1OTgwOTkzMDF9.x6kfa5fR2vFjRLdx4Tpd2ffxUOzaF8WJ98JpB-iO4Xk",
// 	userId: 1,
// 	employeeCode: "uah",
// 	expirationDate: 1598099301,
// 	errorMessage: null,
// 	errorStatus: null,
// 	errorStatusText: null,
// 	loading: null,
// };

let store;
if (AuthState) {
	axios.defaults.headers.common["Authorization"] = AuthState.token;
	store = configureStore({ auth: AuthState });
} else {
	store = configureStore();
}

console.log(AuthState);

// localStorage.removeItem("JWT_TOKEN");
// localStorage.removeItem("USER_ID");
// localStorage.removeItem("EXPIRATION_DATE");
// localStorage.removeItem("AUTH_STATE");
// localStorage.removeItem("PERMISSION_LEVEL");

const history = createBrowserHistory();

function App() {
	return (
		<StoreProvider store={store}>
			<ThemeProvider theme={theme}>
				<MuiPickersUtilsProvider utils={MomentUtils}>
					<Router history={history}>{renderRoutes(routes)}</Router>
				</MuiPickersUtilsProvider>
			</ThemeProvider>
		</StoreProvider>
	);
}

export default App;
