import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import axios from "../../../axios";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}));

const Items = () => {
	const classes = useStyles();
	const [checked, setChecked] = React.useState([0]);
	const state = useSelector((state) => state);
	const [items, setItems] = useState([]);

	useEffect(() => {
		// if the id isset then the thing already exist and we want to view/update it
		if (state.auth.userId) {
			fetchItems();
		}
	}, [state.auth.userId]);

	const fetchItems = () => {
		axios
			.get(`/api/todoitem/${state.auth.userId}`)
			.then((res) => {
				console.log(res);

				setItems(res.data.todoItems);
			})
			.catch((err) => console.log(err));
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
				.put(`/api/todoitem/${item[0].id}`, data)
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

				fetchItems();
			})
			.catch((err) => console.log(err));
	};

	return (
		<Container>
			<List className={classes.root}>
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
							<ListItemText id={labelId} primary={`${item.title}`} />
							<ListItemSecondaryAction>
								<IconButton edge="end" aria-label="delete">
									<DeleteIcon onClick={onDeleteHandler(item.id)} />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					);
				})}
			</List>
		</Container>
	);
};

export default Items;
