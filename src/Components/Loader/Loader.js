import { Spin } from "antd";
import React from "react";
import classes from "./Loader.module.scss";

function Loader() {
	return (
		<div className={classes.loader}>
			<Spin />
		</div>
	);
}

export default Loader;