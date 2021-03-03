// import React from "react";
import BarChartIcon from "@material-ui/icons/BarChart";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";

export default [
	{
		items: [
			{
				title: "Todo",
				href: "/todo",
				icon: BarChartIcon,
				items: [
					{
						title: "Mine todo items",
						href: "/todo/items",
					},
					{
						title: "Opret todo item",
						href: "/todo/create",
					},
				],
			},
		],
	},
];
