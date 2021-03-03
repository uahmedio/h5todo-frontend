/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import DashboardLayout from "./layout/Dashboard";
import AuthLayout from "./layout/Auth";
import ErrorLayout from "./layout/Error";

import Todo from "./views/Todo/Items/Todo";
import TodoCreate from "./views/Todo/Create/";

export default [
	{
		path: "/",
		exact: true,
		component: () => <Redirect to="/todo/items" />,
	},
	{
		path: "/auth",
		component: AuthLayout,
		routes: [
			{
				path: "/auth/login",
				exact: true,
				component: lazy(() => import("./views/Auth/Login")),
			},
			{
				path: "/auth/register",
				exact: true,
				component: lazy(() => import("./views/Auth/Register")),
			},
			{
				component: () => <Redirect to="/errors/error-404" />,
			},
		],
	},
	{
		path: "/errors",
		component: ErrorLayout,
		routes: [
			{
				path: "/errors/error-401",
				exact: true,
				component: lazy(() => import("./views/Error401")),
			},
			{
				path: "/errors/error-404",
				exact: true,
				component: lazy(() => import("./views/Error404")),
			},
			{
				path: "/errors/error-500",
				exact: true,
				component: lazy(() => import("./views/Error500")),
			},
			{
				component: () => <Redirect to="/errors/error-404" />,
			},
		],
	},
	{
		route: "*",
		component: DashboardLayout,
		routes: [
			{
				path: "/todo/items",
				exact: true,
				component: Todo,
			},
			{
				path: "/todo/create",
				exact: true,
				component: TodoCreate,
			},
		],
	},
];
