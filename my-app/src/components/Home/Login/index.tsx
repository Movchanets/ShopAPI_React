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
import { LoginSchema } from '../Schemas';
import Copyright from '../../Copyright';
import { ILogin } from '../../../types/types';

;

const initialValues = { email: "", password: "", rememberMe: false };

const theme = createTheme();

const Login: React.FC = () => {
	const { loading, isAuth } = useTypedSelector((state) => state.userReducer);
	const { LoginUser, GoogleLogin } = useActions();
	const handleLoginSuccess = (res: any) => {

		console.log("Login google result", res);
		const { credential } = res;
		console.log("Token Idsss", credential);

		GoogleLogin(credential, 'Google')

	}
		;

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



		const user: ILogin = {
			email: String(data.get("email")),
			password: String(data.get("password")),

		};

		LoginUser(user);
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
						Sign in
					</Typography>

					<Formik
						initialValues={initialValues}
						onSubmit={() => { }}
						validationSchema={LoginSchema}
					>
						{({ errors, touched, isSubmitting, isValid, dirty }) => (
							<Box
								onSubmit={handleSubmit}
								style={{ width: "100%", height: "326px" }}
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
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
								/>
								{errors.password && touched.password ? (
									<div style={{ color: "red" }}>{errors.password}</div>
								) : null}

								<Button
									disabled={!(isValid && dirty)}
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
								>
									{isSubmitting ? "Loading" : "Sign in"}
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

export default Login;
