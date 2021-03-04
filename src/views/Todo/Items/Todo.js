import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { CircularProgress, Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import axios from "../../../axios";
import { Link as RouterLink } from "react-router-dom";
import Snackbar from "../../../components/Snackbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Header from "./Header";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		backgroundColor: theme.palette.background.paper,
	},
}));

const Items = ({ match }) => {
	const classes = useStyles();
	const [checked, setChecked] = React.useState([0]);
	const state = useSelector((state) => state);
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("");

	useEffect(() => {
		// if the id isset then the thing already exist and we want to view/update it
		if (state.auth.userId) {
			fetchItems();
		}
	}, [state.auth.userId]);

	const fetchItems = () => {
		setIsLoading(true);
		axios
			.get(`/api/todoitem/${state.auth.userId}`)
			.then((res) => {
				console.log(res);

				setIsLoading(false);
				setItems(res.data.todoItems);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	};

	const handleToggle = (value) => () => {
		const item = items.filter((item) => item.id === value);
		console.log(item);
		if (item[0].id) {
			const changedDone = !item[0].done;

			const data = {
				id: item[0].id,
				title: item[0].title,
				description: item[0].description,
				done: changedDone,
			};

			console.log(item);
			console.log(data);

			axios
				.put(`/api/todoitem/`, data)
				.then((res) => {
					console.log(res);

					fetchItems();
				})
				.catch((err) => console.log(err));
		}
	};

	const onDeleteHandler = (id) => () => {
		axios
			.delete(`/api/todoitem/${id}`)
			.then((res) => {
				console.log(res);

				handleSnackbarClick("Todo slettet!", "success");

				fetchItems();
			})
			.catch((err) => {
				console.log(err);
				handleSnackbarClick("Kunne ikke slette todo!", "error");
			});
	};

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
		<Container>
			<Header />
			<List className={classes.root}>
				{isLoading ? <CircularProgress /> : null}

				{!isLoading && items.length <= 0 ? <div>Du har ikke nogle todo endnu</div> : null}
				{items.map((item) => {
					const labelId = `checkbox-list-label-${item.id}`;

					return (
						<ListItem key={item.id} role={undefined} dense button onClick={handleToggle(item.id)}>
							<ListItemIcon>
								<Checkbox
									edge="start"
									checked={item.done}
									tabIndex={-1}
									disableRipple
									inputProps={{ "aria-labelledby": labelId }}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={`${item.title}`} secondary={`${item.description}`} />
							<ListItemSecondaryAction>
								<IconButton aria-label="update">
									<Button component={RouterLink} to={`/todo/update/${item.id}`}>
										<EditIcon />
									</Button>
								</IconButton>
								<IconButton edge="end" aria-label="delete">
									<DeleteIcon onClick={onDeleteHandler(item.id)} />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					);
				})}
			</List>
			{snackbarMessage && snackbarOpen && snackbarSeverity ? (
				<Snackbar
					open={snackbarOpen}
					autoHideDuration={6000}
					message={snackbarMessage}
					onClose={handleSnackbarClose}
					severity={snackbarSeverity}
				/>
			) : null}
		</Container>
	);
};

export default Items;
