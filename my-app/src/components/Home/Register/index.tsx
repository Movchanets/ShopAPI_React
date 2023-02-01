import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Field } from "formik";



import { useTypedSelector } from "../../../hooks/useTypedSelector";

import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import { useActions } from '../../../store/Action-Creators/useActions';
import Loader from '../Loader';
import { RegisterSchema } from '../Schemas';
import Copyright from '../../Copyright';
import { InputLabel, MenuItem } from '@mui/material';
import { IRegister } from '../../../types/types';
;

const initialValues: IRegister = { email: "", password: "", CheckPassword: "", UserName: "", FirstName: "", LastName: "" };

const theme = createTheme();

const Register: React.FC = () => {
	const { loading, isAuth } = useTypedSelector((state) => state.userReducer);
	const { GoogleLogin, RegisterUser } = useActions();
	const handleLoginSuccess = (res: any) => {
		const { credential } = res;
		GoogleLogin(credential, 'Google')
	}


	useEffect(() => {
		const clientId =
			"1009097235289-i5b2slokukn2qi1thsphkrqvj9d487r4.apps.googleusercontent.com";
		window.google.accounts!.id.initialize({
			client_id: clientId,
			callback: handleLoginSuccess,
		});

		window.google.accounts!.id.renderButton(document.getElementById("loginGoogleBtn"),
			{ theme: "outline", size: "Large" });

	}, []);


	if (loading) {
		return <Loader />;
	}

	if (isAuth) {
		return <Navigate to="/" />;
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);



		const reg: IRegister = {
			email: data.get("email")?.toString(),
			password: data.get("password")?.toString(),
			UserName: data.get("UserName")?.toString(),
			FirstName: data.get("FirstName")?.toString(),
			LastName: data.get("LastName")?.toString(),
			CheckPassword: data.get("CheckPassword")?.toString()
		};

		RegisterUser(reg);
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "red" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Register
					</Typography>


					<Formik
						initialValues={initialValues}
						onSubmit={() => { }}
						validationSchema={RegisterSchema}
					>
						{({ errors, touched, isSubmitting, isValid, dirty }) => (
							<Box
								onSubmit={handleSubmit}
								style={{ width: "100%", height: "100%" }}
								component="form"
								noValidate
								sx={{ mt: 1 }}
							>
								<Field
									as={TextField}
									margin="normal"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									autoFocus
								/>
								{errors.email && touched.email ? (
									<div style={{ color: "red" }}>{errors.email}</div>
								) : null}
								<Field
									as={TextField}
									margin="normal"
									required
									fullWidth
									id="UserName"
									label="UserName"
									name="UserName"
									autoComplete="UserName"
									autoFocus
								/>
								{errors.UserName && touched.UserName ? (
									<div style={{ color: "red" }}>{errors.UserName}</div>
								) : null}
								<Field
									as={TextField}
									margin="normal"
									required
									fullWidth
									id="FirstName"
									label="FirstName"
									name="FirstName"
									autoComplete="FirstName"
									autoFocus
								/>
								{errors.FirstName && touched.FirstName ? (
									<div style={{ color: "red" }}>{errors.email}</div>
								) : null}
								<Field
									as={TextField}
									margin="normal"
									required
									fullWidth
									id="LastName"
									label="LastName"
									name="LastName"
									autoComplete="LastName"
									autoFocus
								/>
								{errors.LastName && touched.LastName ? (
									<div style={{ color: "red" }}>{errors.LastName}</div>
								) : null}
								<Field
									as={TextField}
									margin="normal"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
								/>
								<Field
									as={TextField}
									margin="normal"
									required
									fullWidth
									name="CheckPassword"
									label="Confirm password"
									type="password"
									id="CheckPassword"
									autoComplete="current-password"
								/>
								{errors.password && touched.CheckPassword ? (
									<div style={{ color: "red" }}>{errors.CheckPassword}</div>
								) : null}



								<Button
									disabled={!(isValid && dirty)}
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
								>
									{isSubmitting ? "Loading" : "Sign up"}
								</Button>

							</Box>
						)}
					</Formik>

					<div id="loginGoogleBtn"></div>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
};

export default Register;
