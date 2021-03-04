import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Typography, Grid, Button } from "@material-ui/core";
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

function UpdateUser() {
	const classes = useStyles();

	return (
		<Page className={classes.root}>
			<Card className={classes.card}>
				<CardContent className={classes.content}>
					<Grid container justify="space-between" spacing={3} alignItems="flex-end">
						<Grid item>
							<Typography component="h1" gutterBottom variant="h3">
								Opdater bruger information
							</Typography>
						</Grid>
						<Grid item>
							<Button
								color="primary"
								className={classes.button}
								variant="contained"
								component={RouterLink}
								to="/user/updatepassword"
							>
								Rediger kodeord
							</Button>
						</Grid>
					</Grid>
					<RegisterForm className={classes.registerForm} />
				</CardContent>
			</Card>
		</Page>
	);
}

export default UpdateUser;
