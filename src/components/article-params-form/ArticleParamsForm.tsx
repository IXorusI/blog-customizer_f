import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group/RadioGroup';
import { Select } from '../select/Select';
import { Separator } from '../separator/Separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	contentWidthArr,
	backgroundColors,
	fontColors,
} from '/dev/blog-customizer/src/constants/articleProps';

export type ArticleParamsFormType = {
	confirm: ({}) => void;
	reset: () => void;
};

export const ArticleParamsForm = ({
	confirm,
	reset,
}: ArticleParamsFormType) => {
	const ref = useRef<HTMLDivElement>(null);
	const [state, toggleState] = useState('false');
	const [selectedFontFamily, setSelectedFontFamily] = useState(
		fontFamilyOptions[0]
	);
	const [selectedFontSize, setSelectedFontSize] = useState(fontSizeOptions[0]);
	const [selectedFontColors, setSelectedFontColors] = useState(fontColors[0]);
	const [selectedBackgroundColors, setSelectedBackgroundColors] = useState(
		backgroundColors[0]
	);
	const [selectedContentWidthArr, setSelectedContentWidthArr] = useState(
		contentWidthArr[0]
	);
	const toggleForm =
		state === 'true' ? styles.container_open : styles.container;

	function handleArrowClick() {
		toggleState(state === 'true' ? 'false' : 'true');
		document.addEventListener('mousedown', handleClickOutside);
	}

	function handleClickOutside(event: any) {
		if (ref.current && !ref.current.contains(event.target)) {
			document.removeEventListener('mousedown', handleClickOutside);
			toggleState('false');
		}
	}

	const resetButton = () => {
		reset();
		setSelectedFontFamily(fontFamilyOptions[0]);
		setSelectedFontSize(fontSizeOptions[0]);
		setSelectedFontColors(fontColors[0]);
		setSelectedBackgroundColors(backgroundColors[0]);
		setSelectedContentWidthArr(contentWidthArr[0]);
		toggleState(state === 'true' ? 'false' : 'true');
	};

	const confirmButton = () => {
		confirm({
			fontFamilyOption: selectedFontFamily,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColors,
			contentWidth: selectedContentWidthArr,
			bgColor: selectedBackgroundColors,
		});
		toggleState(state === 'true' ? 'false' : 'true');
	};

	return (
		<>
			<ArrowButton state={state} onClick={handleArrowClick} />
			<aside ref={ref} className={toggleForm}>
				<form className={styles.form}>
					<h1 className={styles.title}>Задайте параметры</h1>
					<Select
						options={fontFamilyOptions}
						selected={selectedFontFamily}
						onChange={setSelectedFontFamily}
						title={'Шрифт'}
					/>
					<RadioGroup
						name={'radio'}
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={setSelectedFontSize}
						title={'Размер шрифта'}
					/>
					<Select
						options={fontColors}
						selected={selectedFontColors}
						onChange={setSelectedFontColors}
						title={'Цвет шрифта'}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={selectedBackgroundColors}
						onChange={setSelectedBackgroundColors}
						title={'Цвет фона'}
					/>
					<Select
						options={contentWidthArr}
						selected={selectedContentWidthArr}
						onChange={setSelectedContentWidthArr}
						title={'Ширина контента'}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='button' onClick={resetButton} />
						<Button title='Применить' type='button' onClick={confirmButton} />
					</div>
				</form>
			</aside>
		</>
	);
};
