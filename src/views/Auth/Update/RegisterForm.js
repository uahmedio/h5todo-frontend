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
	firstName: {
		presence: { allowEmpty: false, message: "is required" },
		length: {
			maximum: 32,
		},
	},
	lastName: {
		presence: { allowEmpty: false, message: "is required" },
		length: {
			maximum: 32,
		},
	},
	email: {
		presence: { allowEmpty: false, message: "is required" },
		email: true,
		length: {
			maximum: 64,
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
	const history = useHistory();
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

	useEffect(() => {
		// if the id isset then the thing already exist and we want to view/update it
		if (state.auth.userId) {
			axios
				.get(`/api/user/${state.auth.userId}`)
				.then((res) => {
					console.log(res);

					setFormState((prevState) => ({
						...prevState,
						values: {
							id: res.data.user.id,
							firstName: res.data.user.firstName,
							lastName: res.data.user.lastName,
							email: res.data.user.email,
							done: res.data.user.done,
						},
						touched: {
							...prevState.touched,
							id: true,
							firstName: true,
							lastName: true,
							email: true,
							done: true,
						},
					}));
				})
				.catch((err) => console.log(err));
		}
	}, [state.auth.userId]);

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
		console.log(data);

		try {
			const register = await axios.put("/api/user/update", data);

			console.log(register);
			handleSnackbarClick("Bruger opdateret", "success");
		} catch (error) {
			console.log(error);
			console.log("There was an error");
			handleSnackbarClick("Kunne ikke opdater bruger", "error");
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
					error={hasError("firstName")}
					helperText={hasError("firstName") ? formState.errors.firstName[0] : null}
					label="First name"
					name="firstName"
					onChange={handleChange}
					value={formState.values.firstName || ""}
					variant="outlined"
				/>
				<TextField
					error={hasError("lastName")}
					helperText={hasError("lastName") ? formState.errors.lastName[0] : null}
					label="Last name"
					name="lastName"
					onChange={handleChange}
					value={formState.values.lastName || ""}
					variant="outlined"
				/>
				<TextField
					error={hasError("email")}
					fullWidth
					helperText={hasError("email") ? formState.errors.email[0] : null}
					label="Email address"
					name="email"
					onChange={handleChange}
					value={formState.values.email || ""}
					variant="outlined"
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
				Opdater bruger
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
