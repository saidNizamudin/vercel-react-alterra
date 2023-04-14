import styles from './Button.module.css';
import classNames from 'classnames/bind';

export default function Button({ clickFunction, type, size, text }) {
	const colorStyle =
		type === 'Primary'
			? styles.blue
			: type === 'Secondary'
			? styles.white
			: type === 'Delete'
			? styles.red
			: type === 'Disabled'
			? styles.disabled
			: styles.blue;

	const sizeStyle =
		size === 'Regular'
			? styles.regular
			: size === 'Large'
			? styles.large
			: size === 'Fit'
			? styles.fit
			: styles.regular;

	return (
		<button
			className={classNames(styles.button, colorStyle, sizeStyle)}
			onClick={clickFunction}
			disabled={type === 'Disabled'}
		>
			<span>{text}</span>
		</button>
	);
}
