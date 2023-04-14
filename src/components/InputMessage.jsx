import styles from './InputMessage.module.css';
import classNames from 'classnames/bind';

function InputMessage({ testID, message, isError }) {
	return (
		<div className="d-flex mt-1">
			<i
				data-testid={testID}
				className={classNames(
					styles.icon,
					'fa-solid',
					isError ? 'fa-circle-exclamation' : 'fa-circle-check',
					isError ? styles.error_icon : styles.success_icon
				)}
			></i>
			<p className={classNames(styles.text_message, isError ? styles.error : styles.success)}>
				{message}
			</p>
		</div>
	);
}

export default InputMessage;
