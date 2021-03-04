import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid, Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(() => ({
	root: {
		marginTop: "30px",
		marginBottom: "30px",
	},
}));

const Header = ({ className, ...rest }) => {
	const classes = useStyles();

	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<Grid container justify="space-between" spacing={3} alignItems="flex-end">
				<Grid item>
					<Typography component="h1" gutterBottom variant="h3">
						Todo App
					</Typography>
				</Grid>
				<Grid item>
					<Button
						color="primary"
						className={classes.button}
						variant="contained"
						component={RouterLink}
						to="/todo/create"
					>
						Opret Todo
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

Header.propTypes = {
	className: PropTypes.string,
};

export default Header;
