import { Navigate, useNavigate } from 'react-router-dom';
import styles from './ProtectedRoute.module.css';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import storage from '../../utilities/storage';

export default function ProtectedRoute({ children }) {
	const navigate = useNavigate();

	if (!storage.get('isLoggedIn', false)) {
		return <Navigate to={'/login'} />;
	}

	const username = storage.get('user', 'John Doe');

	function logout() {
		storage.set('isLoggedIn', false);
		navigate('/login');
	}

	return (
		<div className={styles.container}>
			<Sidebar className={styles.sidebar_wrapper}>
				<Menu className={styles.sidebar}>
					<div className={styles.title}>
						<span> Sidebar </span>
					</div>
					<MenuItem
						className={[styles.menu, styles.link]}
						icon={<i className="fa-solid fa-user"></i>}
					>
						{username}
					</MenuItem>
					<MenuItem
						onClick={() => navigate('/')}
						className={[styles.menu, styles.link]}
						icon={<i className="fa-solid fa-home"></i>}
					>
						Home
					</MenuItem>
					<MenuItem
						onClick={() => navigate('/create')}
						className={[styles.menu, styles.link]}
						icon={<i className="fa-solid fa-plus-circle"></i>}
					>
						Create Product
					</MenuItem>
					<MenuItem
						onClick={() => navigate('/product')}
						className={[styles.menu, styles.link]}
						icon={<i className="fa-solid fa-list"></i>}
					>
						Product List
					</MenuItem>
					<MenuItem
						onClick={logout}
						className={[styles.menu, styles.logout]}
						icon={<i className="fa-solid fa-sign-out"></i>}
					>
						Logout
					</MenuItem>
				</Menu>
			</Sidebar>
			<div className={styles.content}>{children}</div>
		</div>
	);
}
