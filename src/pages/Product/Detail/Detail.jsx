import styles from './Detail.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Button } from '../../../components';
import classNames from 'classnames/bind';
import { useQuery, useMutation } from '@apollo/client';
import {
	FETCH_PRODUCT_BY_ID,
	DELETE_PRODUCT_BY_ID,
	FETCH_COMMENT_BY_PRODUCT_ID,
	CREATE_COMMENT,
} from '../../../clients/product';
import { LoopCircleLoading } from 'react-loadingg';

export default function Detail() {
	const location = useLocation();
	const navigate = useNavigate();
	const id = location.pathname.split('/').pop();
	const [comment, setComment] = useState('');

	const [deleteProduct, { loading: loadingDeleting, error: errorDeleting }] = useMutation(
		DELETE_PRODUCT_BY_ID,
		{
			onCompleted: () => {
				navigate('/');
			},
		}
	);

	const {
		data,
		loading: loadingFetching,
		error: errorFetching,
	} = useQuery(FETCH_PRODUCT_BY_ID, {
		variables: { id },
	});

	const {
		data: dataComment,
		loading: loadingFetchingComment,
		error: errorFetchingComment,
	} = useQuery(FETCH_COMMENT_BY_PRODUCT_ID, {
		variables: { id },
	});

	const [createComment, { loading: loadingCreatingComment }] = useMutation(CREATE_COMMENT, {
		variables: { productId: id, comment },
		onCompleted: () => {
			setComment('');
		},
	});

	if (errorFetching) {
		console.log(errorFetching);
		return <div>Error</div>;
	}

	if (errorDeleting) {
		console.log(errorDeleting);
		return <div>Error</div>;
	}

	if (errorFetchingComment) {
		console.log(errorFetchingComment);
		return <div>Error</div>;
	}

	if (loadingFetching || loadingDeleting || loadingFetchingComment) {
		return <LoopCircleLoading size="large" color="#0d47a1" />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.cardImage}>
					<img className="rounded" src={data.product[0].product_image} alt="Product Image" />
				</div>
				<div className={styles.point_wrapper}>
					<div className={styles.point}>
						<i className={'fa fa-circle mr-2'}></i>
						{'Name: '}
						{data.product[0].product_name}
					</div>
					<div className={styles.point}>
						<i className={'fa fa-circle mr-2'}></i>
						{'Price: $'}
						{data.product[0].price}
					</div>
					<div className={styles.point}>
						<i className={'fa fa-circle mr-2'}></i>
						{'Category: '}
						{data.product[0].product_category}
					</div>
					<div className={styles.point}>
						<i className={'fa fa-circle mr-2'}></i>
						{'Freshness: '}
						{data.product[0].product_freshness}
					</div>
					<div className={styles.point}>
						<i className={'fa fa-circle mr-2'}></i>
						{'Description: '}
						{data.product[0].additional_description}
					</div>
				</div>
				<div className={styles.button_section}>
					<div className={classNames('mr-1', styles.button)}>
						<Button
							text={
								<>
									<i className="fa fa-trash mr-2"></i>Delete Product
								</>
							}
							type="Secondary"
							size="Fit"
							clickFunction={() => {
								deleteProduct({
									variables: { id: data.product[0].id },
								});
							}}
						/>
					</div>
					<div className={classNames('ml-1', styles.button)}>
						<Button
							text={
								<>
									<i className="fa fa-edit mr-2"></i>Edit Product
								</>
							}
							type="Secondary"
							size="Fit"
							clickFunction={() => navigate(`/product/${data.product[0].id}/edit`)}
						/>
					</div>
				</div>
				<div className={styles.button_section}>
					<div className={styles.button}>
						<Button
							text={
								<>
									<i className="fa fa-arrow-left mr-2"></i>Back to Home
								</>
							}
							type="Secondary"
							size="Fit"
							clickFunction={() => navigate('/')}
						/>
					</div>
				</div>
			</div>

			<div className={styles.cardComment}>
				<form className={styles.form}>
					<div className={styles.input}>
						<label className={styles.label} htmlFor="comment">
							Add a Comment:
						</label>
						<textarea
							id="comment"
							className="form-control"
							rows="3"
							value={comment}
							onChange={(e) => {
								setComment(e.target.value);
							}}
						/>
					</div>
					<Button
						text={loadingCreatingComment ? 'Loading...' : 'Add Comment'}
						type={comment ? 'Primary' : 'Disabled'}
						size="Fit"
						clickFunction={() => {
							createComment();
						}}
					/>
				</form>
			</div>

			<div className={styles.cardComment}>
				{dataComment.comment.length === 0 ? (
					<div className={styles.noComment}>
						<i className="fa fa-stop mr-2"></i>
						{'No Comment'}
					</div>
				) : (
					dataComment.comment.map((data, index) => {
						return (
							<div
								className={index === dataComment.comment.length - 1 ? 'mb-0' : 'mb-4'}
								key={data.id}
							>
								<i className="fa fa-comment mr-2"></i>
								{data.comment}
							</div>
						);
					})
				)}
			</div>
		</div>
	);
}
