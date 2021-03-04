import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Typography, Divider } from "@material-ui/core";
import Page from "../../../components/Page";
import RegisterForm from "./RegisterForm";
import axios from "../../../axios";
import validate from "validate.js";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Snackbar from "../../../components/Snackbar";

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
	root: {
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: theme.spacing(6, 2),
	},
	content: {
		padding: theme.spacing(8, 4, 3, 4),
	},
	registerForm: {
		marginTop: theme.spacing(3),
	},
	divider: {
		margin: theme.spacing(2, 0),
	},
	person: {
		marginTop: theme.spacing(2),
		display: "flex",
	},
	avatar: {
		marginRight: theme.spacing(2),
	},
}));

function Create({ match }) {
	const classes = useStyles();
	const { id } = match.params;
	const [isUpdate, setIsUpdate] = useState(false);
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
		try {
			if (isUpdate) {
				console.log("Det er todo");
				const data = {
					id,
					title: formState.values.title,
					description: formState.values.description,
					done: formState.values.done,
				};
				const todoitem = await axios.put("/api/todoitem", data);

				if (todoitem.data.todoitem) {
					handleSnackbarClick("Todo opdateret!", "success");
				}
			} else {
				const data = {
					title: formState.values.title,
					description: formState.values.description,
					userId: state.auth.userId,
				};
				const todoitem = await axios.post("/api/todoitem/create", data);

				if (todoitem.data.todoItem) {
					handleSnackbarClick("Todo oprettet!", "success");
					setFormState({
						isValid: false,
						values: {},
						touched: {},
						errors: {},
					});
				}
			}
		} catch (error) {
			if (isUpdate) {
				handleSnackbarClick("Kunne ikke opdatere todo!", "error");
			} else {
				handleSnackbarClick("Kunne ikke oprette todo!", "error");
			}
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

	useEffect(() => {
		// if the id isset then the thing already exist and we want to view/update it
		if (id) {
			setIsUpdate(true);
			axios
				.get(`/api/todoitem/one/${id}`)
				.then((res) => {
					console.log(res);

					setFormState((prevState) => ({
						...prevState,
						values: {
							id: res.data.todoitem.id,
							title: res.data.todoitem.title,
							description: res.data.todoitem.description,
							done: res.data.todoitem.done,
						},
						touched: {
							...prevState.touched,
							id: true,
							title: true,
							description: true,
							done: true,
						},
					}));
				})
				.catch((err) => console.log(err));
		}
	}, [id]);

	return (
		<Page className={classes.root}>
			<Card className={classes.card}>
				<CardContent className={classes.content}>
					<Typography gutterBottom variant="h3">
						Opret Todo item
					</Typography>
					<RegisterForm
						className={classes.registerForm}
						hasError={hasError}
						formState={formState}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
					/>
					<Divider className={classes.divider} />
				</CardContent>
			</Card>
			{snackbarMessage && snackbarOpen && snackbarSeverity ? (
				<Snackbar
					open={snackbarOpen}
					autoHideDuration={6000}
					message={snackbarMessage}
					onClose={handleSnackbarClose}
					severity={snackbarSeverity}
				/>
			) : null}
		</Page>
	);
}

Create.propTypes = {
	match: PropTypes.object.isRequired,
};

export default Create;
