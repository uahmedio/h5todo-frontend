import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import validate from "validate.js";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Button, TextField } from "@material-ui/core";
import axios from "../../../axios";
import { useSelector } from "react-redux";

const schema = {
	title: {
		presence: { allowEmpty: false, message: "is required" },
		length: {
			maximum: 255,
		},
	},
	description: {
		length: {
			maximum: 255,
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

function RegisterForm({ className, ...rest }) {
	const classes = useStyles();
	const history = useHistory();
	const state = useSelector((state) => state);
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

		const data = {
			title: formState.values.title,
			description: formState.values.description,
			userId: state.auth.userId,
		};
		console.log(data);

		console.log(state);

		try {
			const todoitem = await axios.post("/api/todoitem/create", data);

			if (todoitem.data.todoItem) {
				console.log("Oprettet!");

				setFormState({
					isValid: false,
					values: {},
					touched: {},
					errors: {},
				});
			}
		} catch (error) {
			console.log(error);
			console.log("There was an error");
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

	return (
		<form {...rest} className={clsx(classes.root, className)} onSubmit={handleSubmit}>
			<div className={classes.fields}>
				<TextField
					error={hasError("title")}
					helperText={hasError("title") ? formState.errors.title[0] : null}
					label="Title"
					name="title"
					fullWidth
					onChange={handleChange}
					value={formState.values.title || ""}
					variant="outlined"
				/>
				<TextField
					error={hasError("description")}
					helperText={hasError("description") ? formState.errors.description[0] : null}
					label="Beskrivelse"
					name="description"
					fullWidth
					multiline
					rows={4}
					onChange={handleChange}
					value={formState.values.description || ""}
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
				Opret Todo item
			</Button>
		</form>
	);
}

RegisterForm.propTypes = {
	className: PropTypes.string,
};

export default RegisterForm;
