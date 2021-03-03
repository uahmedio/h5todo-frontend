import React from "react";
import { TextValidator } from "react-material-ui-form-validator";
import classes from "./Input.css";
// import Select from "@material-ui/core/Select";
// import InputLabel from "@material-ui/core/InputLabel";
// import FormControl from "@material-ui/core/FormControl";

const input = props => {
	let inputElement = null;
	const inputClasses = [classes.InputElement];

	// if (props.invalid && props.shouldValidate && props.touched) {
	//     inputClasses.push("text-danger  is-invalid");
	// }

	// let validationError = null;
	// if (props.invalid && props.touched) {
	//     validationError = (
	//         <label style={{ fontSize: "14px" }}>
	//             Angiv venligst en rigtig værdi!
	// 		</label>
	//     );
	// }

	switch (props.elementType) {
		case "input":
			inputClasses.push("common-input mb-20 form-control");
			inputElement = (
				<TextValidator
					style={{
						backgroundColor: "white",
						borderTopLeftRadius: "3px",
						borderTopRightRadius: "3px"
					}}
					label={props.object.label}
					value={props.object.value}
					fullWidth
					variant="filled"
					disabled={props.disabled}
					validators={props.object.validators}
					errorMessages={props.object.errormessages}
					onChange={props.changed}
				/>
			);
			break;
		case "textarea":
			inputClasses.push("common-textarea form-control");
			inputElement = (
				<textarea
					className={inputClasses.join(" ")}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case "select":
			inputClasses.push("common-input mb-20 form-control");

			// inputElement = (
			//     <FormControl fullWidth variant="filled" >
			//         <InputLabel id="demo-simple-select-filled-label">{props.object.label}</InputLabel>
			//         <Select
			//             native
			//             fullWidth
			//             style={{ backgroundColor: "white", borderTopLeftRadius: "3px", borderTopRightRadius: "3px" }}
			//             value={props.object.value}
			//             onChange={props.changed}
			//         >
			//             <option value="">
			//             </option>
			//             {props.options.map(postalCode => {
			//                 return (
			//                     <option key={postalCode.ID} value={JSON.stringify(postalCode)}>{postalCode.PostalCode}</option>
			//                 )
			//             })}
			//         </Select>
			//     </FormControl>
			// );

			inputElement = (
				<select
					className={inputClasses.join(" ")}
					value={props.value}
					onChange={props.changed}
					name={props.name}
				>
					<option value="0" disabled hidden>
						Choose a option
					</option>
					{props.elementConfig.options.map(option => {
						return (
							<option key={option.id} value={option.id}>
								{option.name}
							</option>
						);
					})}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					className={inputClasses.join(" ")}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
	}
	return (
		<div className={classes.Input}>
			<label className={"Label"}>{props.Label}</label>
			{inputElement}
			{/* {validationError} */}
		</div>
	);
};

export default input;
