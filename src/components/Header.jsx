import { ARTICLE } from '../constants';
import React, { useState } from 'react';
import styles from './Header.module.css';
import Button from './Button';
import { convertCurrency } from '../utilities/currency';

function Header() {
	const [isEnglish, setIsEnglish] = useState(true);

	const toggleLanguages = () => {
		setIsEnglish(!isEnglish);
	};

	const consoleRandomNumber = () => {
		console.log(Math.floor(Math.random() * 1000));
	};

	const consoleConvertCurrency = async () => {
		const result = await convertCurrency(100, 'USD', 'IDR');
		console.log(result);
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{isEnglish ? ARTICLE.title.en : ARTICLE.title.id}</h1>
			<div>
				<p className={styles.desc}>{isEnglish ? ARTICLE.description.en : ARTICLE.description.id}</p>
				<div className={styles.button_wrapper}>
					<div className="mr-3">
						<Button
							clickFunction={consoleRandomNumber}
							type={'Primary'}
							size={'Regular'}
							text={isEnglish ? ARTICLE.buttonRandom.en : ARTICLE.buttonRandom.id}
						/>
					</div>
					<div className="mr-3">
						<Button
							clickFunction={consoleConvertCurrency}
							type={'Primary'}
							size={'Regular'}
							text={isEnglish ? ARTICLE.buttonCurrency.en : ARTICLE.buttonCurrency.id}
						/>
					</div>
					<Button
						clickFunction={toggleLanguages}
						type={'Primary'}
						size={'Regular'}
						text={
							<>
								<i className="fa-solid fa-language fa-2xl mr-2 translate-icon"></i>
								{isEnglish ? ARTICLE.buttonLanguage.en : ARTICLE.buttonLanguage.id}
							</>
						}
					/>
				</div>
			</div>
		</div>
	);
}

export default Header;
