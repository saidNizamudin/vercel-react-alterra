import React, { useState, useEffect } from 'react';
import InputMessage from '../../../components/InputMessage';
import styles from './Edit.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQuery, gql } from '@apollo/client';
import { UPDATE_PRODUCT, FETCH_PRODUCT_BY_ID } from '../../../clients/product';
import { LoopCircleLoading } from 'react-loadingg';

function Edit() {
	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [image, setImage] = useState('');
	const [freshness, setFreshness] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');
	const [isValidated, setIsValidated] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const id = location.pathname.split('/')[2];

	const [updateProduct, { loading: loadingUpdate, error: errorUpdate }] = useMutation(
		UPDATE_PRODUCT,
		{
			onCompleted: () => {
				navigate(`/product/${id}`);
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

	const getBase64 = (e) => {
		return new Promise((resolve) => {
			let baseURL = '';
			let reader = new FileReader();
			reader.readAsDataURL(e);

			reader.onload = () => {
				baseURL = reader.result;
				resolve(baseURL);
			};
		});
	};

	const handleImageInput = (e) => {
		const file = e.target.files[0];

		getBase64(file)
			.then((result) => {
				file['base64'] = result;
				setImage(result);
			})
			.catch((err) => {
				alert(err);
			});
	};

	useEffect(() => {
		const validName = /[^\s]/.test(name) && !/[@/#{}]/.test(name) && /^.{0,25}$/.test(name);
		const validCategory = /[^\s]/.test(category);
		const validFreshness = /[^\s]/.test(freshness);
		const validPrice = /[^\s]/.test(price);
		const validImage = /[^\s]/.test(image);
		setIsValidated(!(validName && validCategory && validFreshness && validPrice && validImage));
	}, [name, category, freshness, price, image]);

	useEffect(() => {
		setIsValidated(true);
	}, []);

	useEffect(() => {
		if (data) {
			setName(data.product[0].product_name);
			setCategory(data.product[0].product_category);
			setFreshness(data.product[0].product_freshness);
			setPrice(data.product[0].price);
			setImage(data.product[0].product_image);
			setDescription(data.product[0].additional_description);
		}
	}, [data]);

	if (errorFetching) {
		return <div>{errorFetching.message}</div>;
	}

	if (errorUpdate) {
		return <div>{errorUpdate.message}</div>;
	}

	if (loadingUpdate || loadingFetching) {
		return <LoopCircleLoading size="large" color="#0d47a1" />;
	}

	return (
		<div className={styles.card}>
			<form id="myForm" name="myForm">
				<div className="mb-4">
					<strong className={styles.label} htmlFor="name">
						Product Name
					</strong>
					<input
						type="text"
						data-testid="input-text"
						className="form-control"
						id="name"
						placeholder="Product Name"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
					<InputMessage
						testID="validate-name-required"
						isError={!/[^\s]/.test(name)}
						message={'The Name field must be filled in'}
					/>
					<InputMessage
						testID="validate-name-symbol"
						isError={/[@/#{}]/.test(name)}
						message={"Name must not contain '@/#{}'"}
					/>
					<InputMessage
						testID="validate-name-length"
						isError={!/^.{0,25}$/.test(name)}
						message={'Product Name must not exceed 25 characters'}
					/>
				</div>
				<div className="mb-4">
					<div className="input-group">
						<strong className={styles.label} htmlFor="category">
							Product Category
						</strong>
						<select
							className="custom-select d-block w-100"
							id="category"
							data-testid="input-select"
							value={category}
							onChange={(e) => {
								setCategory(e.target.value);
							}}
						>
							<option value="" defaultValue disabled>
								Select a Category
							</option>
							<option value="Phone">Phone</option>
							<option value="TV">TV</option>
							<option value="Tablet">Tablet</option>
							<option value="Ipad">Ipad</option>
						</select>
						<InputMessage
							testID="validate-category-required"
							isError={!/[^\s]/.test(category)}
							message={'The Category field must be filled in'}
						/>
					</div>
				</div>
				<div className="mb-4">
					<div className={styles.image_input_wrapper}>
						<strong className={styles.label} htmlFor="image">
							Product Image
						</strong>
						<label className={styles.image_input}>
							<i className="fa fa-cloud-upload mr-2"></i>
							{image ? 'Change Product Image' : 'Upload Product Image'}
							<input
								type="file"
								data-testid="input-file"
								id="image"
								placeholder="Product Image"
								accept={['image/jpg', 'image/jpeg', 'image/png']}
								onChange={handleImageInput}
							/>
						</label>
					</div>
					<InputMessage
						testID="validate-image-required"
						isError={!/[^\s]/.test(image)}
						message={'The Image field must be filled in'}
					/>
				</div>
				<div className="mb-4">
					<strong className={styles.label}>Product Freshness</strong>
					<div className="custom-control custom-radio">
						<input
							id={'new'}
							name="freshness"
							type="radio"
							className="custom-control-input"
							value="Brand New"
							checked={freshness === 'Brand New'}
							onChange={(e) => {
								setFreshness(e.target.value);
							}}
						/>
						<label className="custom-control-label" htmlFor={'new'}>
							Brand New
						</label>
					</div>
					<div className="custom-control custom-radio">
						<input
							id={'second'}
							name="freshness"
							type="radio"
							className="custom-control-input"
							value="Second Hand"
							checked={freshness === 'Second Hand'}
							onChange={(e) => {
								setFreshness(e.target.value);
							}}
						/>
						<label className="custom-control-label" htmlFor={'second'}>
							Second Hand
						</label>
					</div>
					<div className="custom-control custom-radio">
						<input
							id={'ref'}
							name="freshness"
							type="radio"
							className="custom-control-input"
							value="Refufbished"
							checked={freshness === 'Refufbished'}
							onChange={(e) => {
								setFreshness(e.target.value);
							}}
						/>
						<label className="custom-control-label" htmlFor={'ref'}>
							Refufbished
						</label>
					</div>
					<InputMessage
						testID="validate-freshness-required"
						isError={!/[^\s]/.test(freshness)}
						message={'The Freshness field must be filled in'}
					/>
				</div>
				<div className="mb-4">
					<strong className={styles.label} htmlFor="price">
						Product Price ($)
					</strong>
					<div className="d-flex">
						<input
							type="number"
							data-testid="input-number"
							className="form-control"
							id="price"
							name="price"
							placeholder="Product Price"
							value={price}
							onChange={(e) => {
								setPrice(e.target.value);
							}}
						/>
					</div>
					<InputMessage
						testID="validate-price-required"
						isError={!/[^\s]/.test(price)}
						message={'The Price field must be filled in'}
					/>
				</div>
				<div className="mb-4">
					<strong className={styles.label} htmlFor="description">
						Product Description
					</strong>
					<textarea
						className="form-control"
						id="description"
						placeholder="Product Descirption"
						value={description}
						onChange={(e) => {
							setDescription(e.target.value);
						}}
					/>
				</div>
				<button
					className={styles.button}
					disabled={isValidated}
					type="button"
					data-testid="button-submit"
					onClick={() => {
						updateProduct({
							variables: {
								id: data.product[0].id,
								name,
								category,
								image,
								price,
								freshness,
								description,
							},
						});
					}}
				>
					Update
				</button>
			</form>
		</div>
	);
}

export default Edit;
