import { gql } from '@apollo/client';

export const FETCH_PRODUCT_BY_ID = gql`
	query getProductById($id: uuid) {
		product(order_by: { product_name: asc }, where: { id: { _eq: $id } }) {
			additional_description
			id
			price
			product_category
			product_freshness
			product_name
			product_image
		}
	}
`;

export const FETCH_COMMENT_BY_PRODUCT_ID = gql`
	query getCommentByProductId($id: uuid) {
		comment(where: { product_id: { _eq: $id } }) {
			id
			comment
		}
	}
`;

export const CREATE_COMMENT = gql`
	mutation createComment($productId: uuid, $comment: String) {
		insert_comment(objects: { product_id: $productId, comment: $comment }) {
			affected_rows
		}
	}
`;

export const DELETE_PRODUCT_BY_ID = gql`
	mutation deleteProduct($id: uuid) {
		delete_product(where: { id: { _eq: $id } }) {
			returning {
				id
				product_name
			}
		}
	}
`;

export const INSERT_PRODUCT = gql`
	mutation insertProduct(
		$name: String
		$price: numeric
		$description: String
		$image: String
		$category: String
		$freshness: String
	) {
		insert_product(
			objects: {
				additional_description: $description
				price: $price
				product_category: $category
				product_freshness: $freshness
				product_image: $image
				product_name: $name
			}
			on_conflict: { constraint: table_product_name_key }
		) {
			returning {
				id
				additional_description
				price
				product_category
				product_freshness
				product_image
				product_name
			}
		}
	}
`;

export const UPDATE_PRODUCT = gql`
	mutation updateProduct(
		$id: uuid
		$name: String
		$price: numeric
		$description: String
		$image: String
		$category: String
		$freshness: String
	) {
		update_product(
			where: { id: { _eq: $id } }
			_set: {
				additional_description: $description
				price: $price
				product_category: $category
				product_freshness: $freshness
				product_image: $image
				product_name: $name
			}
		) {
			returning {
				id
				additional_description
				price
				product_category
				product_freshness
				product_image
				product_name
			}
		}
	}
`;

export const SUBSCRIBE_PRODUCT = gql`
	subscription productList {
		product {
			id
			product_name
			product_category
			product_freshness
			price
		}
	}
`;

export const SUBSCRIBE_LIMITED_PRODUCT = gql`
	subscription LimitedProductList {
		product(limit: 3) {
			id
			product_name
			product_image
		}
	}
`;
