import './Login.css';
import { Formik } from 'formik';
import { InputMessage } from '../../components';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAccount } from '../../utilities/utils';
import storage from '../../utilities/storage';

export default function ProductInfo() {
	const navigate = useNavigate();

	const login = (value) => {
		const listAccount = storage.get('accounts', []);
		const account = getAccount(listAccount, value.email, value.password);

		if (account.length == 0) {
			return toast.error('Wrong Email or Password', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}

		storage.set('isLoggedIn', true);
		storage.set('user', account[0]?.username);
		navigate('/');
		window.location.reload();
	};

	return (
		<div>
			<div className="login-background">
				<div className="login-card p-5">
					<h1 className="login-title mb-5">Login</h1>
					<Formik
						initialValues={{ email: '', password: '' }}
						initialErrors={{
							email: true,
							password: true,
						}}
						validate={(values) => {
							const errors = {};
							if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
								errors.email = true;
							}
							if (values.password.length < 8) {
								errors.password = true;
							}
							return errors;
						}}
						onSubmit={(values) => {
							login(values);
						}}
					>
						{({ values, errors, handleChange, handleBlur, handleSubmit }) => (
							<form onSubmit={handleSubmit}>
								<div className="d-flex flex-column mb-4">
									<div className="login-container-input mb-0">
										<input
											className="login-input"
											name="email"
											placeholder="Email"
											value={values.email}
											onBlur={handleBlur}
											onChange={handleChange}
										/>
										<span className="login-symbol">
											<i className="fa fa-envelope" />
										</span>
									</div>
									<div className="ml-2">
										<InputMessage
											message={'Please provide a valid email address'}
											isError={errors.email ?? false}
										/>
									</div>
								</div>
								<div className="d-flex flex-column mb-4">
									<div className="login-container-input mb-0">
										<input
											className="login-input"
											name="password"
											type="password"
											placeholder="Password"
											value={values.password}
											onBlur={handleBlur}
											onChange={handleChange}
										/>
										<span className="login-symbol">
											<i className="fa fa-lock" />
										</span>
									</div>
									<div className="ml-2">
										<InputMessage
											message={'Your password must be at least 8 characters long'}
											isError={errors.password ?? false}
										/>
									</div>
								</div>
								<div className="mb-3">
									<button type="submit" className="login-button">
										LOGIN
									</button>
									<ToastContainer />;
								</div>
								<div className="text-center">
									<a href="/register">
										Create an Account
										<i className="fa fa-long-arrow-right ml-2" />
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
