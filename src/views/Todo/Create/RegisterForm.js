import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Button, TextField } from "@material-ui/core";
import PropTypes from "prop-types";

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

function RegisterForm({ hasError, formState, handleChange, handleSubmit, className, ...rest }) {
	const classes = useStyles();

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
	hasError: PropTypes.func,
	formState: PropTypes.object,
	handleChange: PropTypes.func,
	handleSubmit: PropTypes.func,
};

export default RegisterForm;
