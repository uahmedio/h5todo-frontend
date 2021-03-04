import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Typography, Divider, Link } from "@material-ui/core";
import Page from "../../../components/Page";
import RegisterForm from "./RegisterForm";

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

function UpdatePassword() {
	const classes = useStyles();

	return (
		<Page className={classes.root}>
			<Card className={classes.card}>
				<CardContent className={classes.content}>
					<Typography gutterBottom variant="h3">
						Opdater Kodeord
					</Typography>
					<RegisterForm className={classes.registerForm} />
				</CardContent>
			</Card>
		</Page>
	);
}

export default UpdatePassword;
