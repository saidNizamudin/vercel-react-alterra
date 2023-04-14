import styles from './CreateProduct.module.css';
import React from 'react';
import { Header, Form } from '../../components';

export default function CreateProduct() {
	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.card}>
				<Form />
			</div>
		</div>
	);
}
