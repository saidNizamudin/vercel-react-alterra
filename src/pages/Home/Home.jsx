import styles from './Home.module.css';
import React from 'react';
import { ProductList } from '../../components';
import { useSubscription } from '@apollo/client';
import { SUBSCRIBE_LIMITED_PRODUCT } from '../../clients/product';
import { LoopCircleLoading } from 'react-loadingg';

export default function Home() {
	const { data, loading, error } = useSubscription(SUBSCRIBE_LIMITED_PRODUCT);

	if (error) {
		console.log(error);
		return <div>Error</div>;
	}

	if (loading) {
		return <LoopCircleLoading size="large" color="#0d47a1" />;
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Create Something Project</h1>
			<h4 className={styles.second_title}>Catalog of Your Products!</h4>
			<div className={styles.card}>
				<ProductList data={data.product} />
			</div>
			<h4 className={styles.author}>Simple project by Said Nizamudin</h4>
		</div>
	);
}
