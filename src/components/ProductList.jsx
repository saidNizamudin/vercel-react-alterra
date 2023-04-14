import styles from './ProductList.module.css';
import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

export default function ProductInfo({ data }) {
	const navigate = useNavigate();

	return (
		<>
			<div className={styles.loadMore}>
				<div>
					<Button
						text={'Load More'}
						type="Secondary"
						size="Fit"
						clickFunction={() => {
							navigate('/product');
						}}
					/>
				</div>
			</div>
			<div className={styles.wrapper}>
				{data.map((product) => {
					return (
						<div className={styles.container} key={product.id}>
							<div className={styles.card}>
								<div className={styles.image}>
									<img className={styles.img} src={product.product_image} alt="Product Image" />
								</div>
								<div className={styles.button}>
									<Button
										text={
											<>
												<i className="fa fa-circle-exclamation mr-2"></i>
												{product.product_name}
											</>
										}
										type="Secondary"
										size="Fit"
										clickFunction={() => navigate(`/product/${product.id}`)}
									/>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}
