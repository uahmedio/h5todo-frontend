import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import validate from "validate.js";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Button, TextField, Grid } from "@material-ui/core";
import axios from "../../../axios";
import { useSelector } from "react-redux";
import Snackbar from "../../../components/Snackbar";

const schema = {
	password: {
		presence: { allowEmpty: false, message: "is required" },
		length: {
			maximum: 155,
		},
	},
	confirmPassword: {
		presence: { allowEmpty: false, message: "is required" },
		length: {
			maximum: 155,
		},
	},
	oldPassword: {
		presence: { allowEmpty: false, message: "is required" },
		length: {
			maximum: 155,
		},
	},
};

const useStyles = makeStyles((theme) => ({
	root: {},
	fields: {
		margin: theme.spacing(-1),
		display: "flex",
		flexWrap: "wrap",
		"& > *": {
			flexGrow: 1,
			margin: theme.spacing(1),
		},
	},
	submitButton: {
		marginTop: theme.spacing(2),
		width: "100%",
	},
}));

function UpdateForm({ className, ...rest }) {
	const classes = useStyles();
	const state = useSelector((state) => state);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("");
	const [formState, setFormState] = useState({
		isValid: false,
		values: {},
		touched: {},
		errors: {},
	});

	const handleChange = (event) => {
		event.persist();

		setFormState((prevFormState) => ({
			...prevFormState,
			values: {
				...prevFormState.values,
				[event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
			},
			touched: {
				...prevFormState.touched,
				[event.target.name]: true,
			},
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = formState.values;
		data.userId = state.auth.userId;

		try {
			const register = await axios.put("/api/user/updatepassword", data);

			console.log(register);
			handleSnackbarClick("Kodeord opdateret", "success");
		} catch (error) {
			console.log(error);
			console.log("There was an error");
			handleSnackbarClick("Kunne ikke skifte kodeord", "error");
		}
	};

	const hasError = (field) => !!(formState.touched[field] && formState.errors[field]);

	useEffect(() => {
		const errors = validate(formState.values, schema);

		setFormState((prevFormState) => ({
			...prevFormState,
			isValid: !errors,
			errors: errors || {},
		}));
	}, [formState.values]);

	const handleSnackbarClick = (message, severity) => {
		setSnackbarMessage(message);
		setSnackbarSeverity(severity);
		setSnackbarOpen(true);
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === "clickaway") return;
		setSnackbarMessage("");
		setSnackbarSeverity("");
		setSnackbarOpen(false);
	};

	return (
		<form {...rest} className={clsx(classes.root, className)} onSubmit={handleSubmit}>
			<div className={classes.fields}>
				<TextField
					error={hasError("oldPassword")}
					helperText={hasError("oldPassword") ? formState.errors.oldPassword[0] : null}
					label="Gammelt kodeord"
					name="oldPassword"
					onChange={handleChange}
					value={formState.values.oldPassword || ""}
					variant="outlined"
					type="password"
				/>
				<TextField
					error={hasError("password")}
					helperText={hasError("password") ? formState.errors.password[0] : null}
					label="Nyt kodeord"
					name="password"
					onChange={handleChange}
					value={formState.values.password || ""}
					variant="outlined"
					type="password"
				/>
				<TextField
					error={hasError("confirmPassword")}
					fullWidth
					helperText={hasError("confirmPassword") ? formState.errors.confirmPassword[0] : null}
					label="Skriv nyt kodeord igen"
					name="confirmPassword"
					onChange={handleChange}
					value={formState.values.confirmPassword || ""}
					variant="outlined"
					type="password"
				/>
			</div>
			<Button
				className={classes.submitButton}
				color="secondary"
				disabled={!formState.isValid}
				size="large"
				type="submit"
				variant="contained"
			>
				Opdater kodeord
			</Button>
			{snackbarMessage && snackbarOpen && snackbarSeverity ? (
				<Snackbar
					open={snackbarOpen}
					autoHideDuration={6000}
					message={snackbarMessage}
					onClose={handleSnackbarClose}
					severity={snackbarSeverity}
				/>
			) : null}
		</form>
	);
}

UpdateForm.propTypes = {
	className: PropTypes.string,
};

export default UpdateForm;
