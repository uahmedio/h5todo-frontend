import React, { Component } from "react";
import { connect } from "react-redux";

export default (OriginalComponent) => {
	class MixedComponent extends Component {
		checkAuth() {
			if ((!this.props.token && !this.props.userId) || this.props.permission !== "ADMINISTRATOR") {
				// If not auth then redirect to "/"
				this.props.history.push("/");
			}
		}

		componentDidMount() {
			// Check if the user is authenticated
			this.checkAuth();
		}

		componentDidUpdate() {
			// Check if the User is auth
			this.checkAuth();
		}

		render() {
			return <OriginalComponent {...this.props} />;
		}
	}

	const mapStateToProps = (state) => {
		return {
			token: state.auth.token,
			userId: state.auth.userId,
			permission: state.auth.permission,
		};
	};

	return connect(mapStateToProps)(MixedComponent);
};
