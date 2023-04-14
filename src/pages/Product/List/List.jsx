import { Button } from '../../../components';
import React, { useState, useEffect } from 'react';
import styles from './List.module.css';
import classNames from 'classnames/bind';
import { useSubscription, useMutation } from '@apollo/client';
import { SUBSCRIBE_PRODUCT, DELETE_PRODUCT_BY_ID } from '../../../clients/product';
import { LoopCircleLoading } from 'react-loadingg';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

function List() {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [selectedData, setSelectedData] = useState({});
	const [data, setData] = useState([]);
	const [search, setSearch] = useState('');
	const [limit, setLimit] = useState(5);
	const [offset, setOffset] = useState(1);

	const navigate = useNavigate();

	const {
		data: response,
		loading: loadingFetching,
		error: errorFetching,
	} = useSubscription(SUBSCRIBE_PRODUCT);

	const [deleteProduct, { loading: loadingDeleting, error: errorDeleting }] = useMutation(
		DELETE_PRODUCT_BY_ID,
		{
			onCompleted: () => {
				setShowDeleteModal(false);
			},
		}
	);

	useEffect(() => {
		console.log(offset);
		const start = (offset - 1) * limit;
		const end = start + limit;
		if (search) {
			const filteredData = response.product.filter((data) => {
				return data.product_name.toLowerCase().includes(search.toLowerCase());
			});
			setData(filteredData.slice(start, end));
		} else {
			if (response) {
				setData(response.product.slice(start, end));
			}
		}
	}, [search, limit, offset, response]);

	if (errorFetching) {
		console.log(errorFetching);
		return <div>Error</div>;
	}

	if (errorDeleting) {
		console.log(errorDeleting);
		return <div>Error</div>;
	}

	if (loadingFetching || loadingDeleting) {
		return <LoopCircleLoading size="large" color="#0d47a1" />;
	}

	return (
		<div className={styles.table_container}>
			<span className={styles.title}>List Product</span>
			<div className={styles.search}>
				<i className="fa fa-search mr-2"></i>
				<input
					className={styles.searchinput}
					type="text"
					placeholder="Search by product name"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
					}}
				/>
			</div>
			{data.length > 0 ? (
				<div className="d-flex flex-column align">
					<div className="d-flex justify-content-end align-items-center">
						<div className={styles.select}>
							<label htmlFor="limit" className={styles.label}>
								Show:
							</label>
							<select
								name="limit"
								id="limit"
								onChange={(e) => {
									setLimit(e.target.value);
									setOffset(1);
								}}
							>
								<option value={5}>5 per Page</option>
								<option value={10}>10 per Page</option>
								<option value={15}>15 per Page</option>
								<option value={20}>20 per Page</option>
							</select>
						</div>
						<div
							className={styles.pageLeft}
							onClick={() => {
								if (offset > 1) {
									setOffset(offset - 1);
								}
							}}
						>
							<i className="fa fa-arrow-left"></i>
						</div>
						<div
							className={styles.pageRight}
							onClick={() => {
								if (offset < Math.ceil(response.product.length / limit)) {
									setOffset(offset + 1);
								}
							}}
						>
							<i className="fa fa-arrow-right"></i>
						</div>
					</div>
					<table className={classNames('table mt-4', styles.table)}>
						<thead>
							<tr>
								<th scope="col">No</th>
								<th scope="col">Product Name</th>
								<th scope="col">Product Category</th>
								<th scope="col">Product Freshness</th>
								<th scope="col">Product Price</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody className={styles.table_body}>
							{data.map((datum) => {
								return (
									<tr key={datum.id}>
										<td scope="col" className={styles.id}>
											{datum.id}
										</td>
										<td scope="col">{datum.product_name}</td>
										<td scope="col">{datum.product_category}</td>
										<td scope="col">{datum.product_freshness}</td>
										<td scope="col">{datum.price}</td>
										<td scope="col">
											<div className={styles.button_section}>
												<div className={styles.margin_right}>
													<Button
														clickFunction={() => {
															setSelectedData(datum);
															setShowDeleteModal(true);
														}}
														text="DELETE"
														type="Delete"
														size="Fit"
													/>
												</div>
												<div className={styles.margin_right}>
													<Button
														clickFunction={() => {
															navigate(`/product/${datum.id}/edit`);
														}}
														text="EDIT"
														type="Primary"
														size="Fit"
													/>
												</div>
												<Button
													clickFunction={() => {
														navigate(`/product/${datum.id}`);
													}}
													text="DETAIL"
													type="Secondary"
													size="Fit"
												/>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			) : (
				<div className="mt-2">
					<div className={styles.title}>Tidak ada data untuk ditampilkan</div>
					<div className={styles.empty_detail}>Anda dapat membuat produk terlebih dahulu</div>
					<div className={styles.button}>
						<Button
							text={
								<>
									<i className="fa fa-plus-circle mr-2"></i>Add Product
								</>
							}
							type="Secondary"
							size="Regular"
							clickFunction={() => navigate('/create')}
						/>
					</div>
				</div>
			)}

			<Modal show={showDeleteModal} centered>
				<Modal.Body>
					Apakah anda yakin ingin menghapus <b>{selectedData.name}</b> dengan id{' '}
					<b>{selectedData.id}</b>
				</Modal.Body>
				<Modal.Footer>
					<Button
						text="Close"
						size="Fit"
						type="Delete"
						clickFunction={() => {
							setShowDeleteModal(false);
						}}
					/>
					<Button
						text="Delete"
						size="Fit"
						type="Primary"
						clickFunction={() => {
							deleteProduct({
								variables: { id: selectedData.id },
							});

							const newData = data.filter((data) => data.id !== selectedData.id);
							setData(newData);
						}}
					/>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default List;
