import './Register.css';
import { Formik } from 'formik';
import { InputMessage } from '../../components';
import { checkExistingUsername } from '../../utilities/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import storage from '../../utilities/storage';

export default function Register() {
	const registerNewAccount = (value) => {
		const listAccount = storage.get('accounts', []);
		if (!checkExistingUsername(listAccount, value.username)) {
			return toast.error(`${value.username} already exist!`, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
		storage.set('accounts', [
			...listAccount,
			{
				email: value.email,
				password: value.password,
				username: value.username,
			},
		]);
	};

	return (
		<div>
			<div className="register-background">
				<div className="register-card px-5 py-4">
					<h1 className="register-title mb-5">Register</h1>
					<Formik
						initialValues={{
							firstName: '',
							lastName: '',
							username: '',
							email: '',
							password: '',
							confirmPassword: '',
						}}
						initialErrors={{
							email_valid: true,
							firstName_length: true,
							lastName_length: true,
							password_length: true,
							same_password: false,
						}}
						validate={(values) => {
							const errors = {};
							if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
								errors.email_valid = true;
							}
							if (values.firstName.length < 3) {
								errors.firstName_length = true;
							}
							if (values.lastName.length < 3) {
								errors.lastName_length = true;
							}
							if (values.password.length < 8) {
								errors.password_length = true;
							}
							if (values.password != values.confirmPassword) {
								errors.same_password = true;
							}
							return errors;
						}}
						onSubmit={(values) => {
							registerNewAccount(values);
						}}
					>
						{({ values, errors, handleChange, handleBlur, handleSubmit }) => (
							<form onSubmit={handleSubmit}>
								<div className="d-flex justify-content-between mb-4">
									<div className="register-message-input-container d-flex flex-column">
										<div className="register-container-input mb-0">
											<input
												className="register-input"
												name="firstName"
												placeholder="First Name"
												onChange={handleChange}
												value={values.firstName}
												onBlur={handleBlur}
											/>
											<span className="register-symbol">
												<i className="fa fa-user-tag" />
											</span>
										</div>
										<div className="ml-2">
											<InputMessage
												message={'First Name must be at least 3 characters long'}
												isError={errors.firstName_length ?? false}
											/>
										</div>
									</div>
									<div className="register-message-input-container d-flex flex-column">
										<div className="register-container-input mb-0">
											<input
												className="register-input"
												name="lastName"
												placeholder="Last Name"
												value={values.lastName}
												onBlur={handleBlur}
												onChange={handleChange}
											/>
											<span className="register-symbol">
												<i className="fa fa-user-minus" />
											</span>
										</div>
										<div className="ml-2">
											<InputMessage
												message={'Last Name must be at least 3 characters long'}
												isError={errors.lastName_length ?? false}
											/>
										</div>
									</div>
								</div>
								<div className="d-flex justify-content-between mb-4">
									<div className="register-message-input-container d-flex flex-column">
										<div className="register-container-input">
											<input
												className="register-input"
												name="username"
												placeholder="Username"
												value={values.username}
												onBlur={handleBlur}
												onChange={handleChange}
											/>
											<span className="register-symbol">
												<i className="fa fa-user" />
											</span>
										</div>
									</div>
									<div className="register-message-input-container d-flex flex-column">
										<div className="register-container-input mb-0">
											<input
												className="register-input"
												name="email"
												placeholder="Email"
												value={values.email}
												onBlur={handleBlur}
												onChange={handleChange}
											/>
											<span className="register-symbol">
												<i className="fa fa-envelope" />
											</span>
										</div>
										<div className="ml-2">
											<InputMessage
												message={'Please provide a valid email address'}
												isError={errors.email_valid ?? false}
											/>
										</div>
									</div>
								</div>
								<div className="d-flex justify-content-between mb-4">
									<div className="register-message-input-container d-flex flex-column">
										<div className="register-container-input mb-0">
											<input
												className="register-input"
												name="password"
												type="password"
												placeholder="Password"
												value={values.password}
												onBlur={handleBlur}
												onChange={handleChange}
											/>
											<span className="register-symbol">
												<i className="fa fa-lock" />
											</span>
										</div>
										<div className="ml-2">
											<InputMessage
												message={'Your password must be at least 8 characters long'}
												isError={errors.password_length ?? false}
											/>
										</div>
									</div>
									<div className="register-message-input-container d-flex flex-column">
										<div className="register-container-input mb-0">
											<input
												className="register-input"
												name="confirmPassword"
												type="password"
												placeholder="Confirm Password"
												value={values.confirmPassword}
												onBlur={handleBlur}
												onChange={handleChange}
											/>
											<span className="register-symbol">
												<i className="fa fa-lock" />
											</span>
										</div>
										<div className="ml-2">
											<InputMessage
												message={'Must be the same as the password'}
												isError={errors.same_password ?? false}
											/>
										</div>
									</div>
								</div>
								<div className="mb-3">
									<button type="submit" className="register-button">
										DAFTAR
									</button>
									<ToastContainer />;
								</div>
								<div className="text-center">
									<a href="/login">
										<i className="fa fa-long-arrow-left mr-2" />
										Already have an Account
									</a>
								</div>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}
