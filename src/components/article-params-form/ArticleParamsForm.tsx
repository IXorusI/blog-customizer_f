import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef, useEffect } from 'react';
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
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

export type ArticleParamsFormType = {
	setCurrentArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setCurrentArticleState,
}: ArticleParamsFormType) => {
	const ref = useRef<HTMLDivElement>(null);
	const [isOpenArticleParams, setIsOpenArticleParams] = useState(false);
	const [selectedFontFamily, setSelectedFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontColors, setSelectedFontColors] = useState(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColors, setSelectedBackgroundColors] = useState(
		defaultArticleState.backgroundColor
	);
	const [selectedContentWidthArr, setSelectedContentWidthArr] = useState(
		defaultArticleState.contentWidth
	);
	const toggleForm = isOpenArticleParams
		? styles.container_open
		: styles.container;

	function handleArrowClick() {
		setIsOpenArticleParams(!isOpenArticleParams);
	}

	useEffect(() => {
		if (toggleForm === true) return;

		function handleClickOutside(event: MouseEvent) {
			const { target } = event;
			const isOutsideClick =
				target instanceof Node && ref.current && !ref.current.contains(target);
			if (isOutsideClick) {
				setIsOpenArticleParams(false);
			}
		}

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsOpenArticleParams(false);
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [toggleForm]);

	const resetButton = () => {
		setCurrentArticleState({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontSizeOption: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			contentWidth: defaultArticleState.contentWidth,
			backgroundColor: defaultArticleState.backgroundColor,
		});
		setSelectedFontFamily(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColors(defaultArticleState.fontColor);
		setSelectedBackgroundColors(defaultArticleState.backgroundColor);
		setSelectedContentWidthArr(defaultArticleState.contentWidth);
		setIsOpenArticleParams(!isOpenArticleParams);
	};

	const confirmButton = () => {
		setCurrentArticleState({
			fontFamilyOption: selectedFontFamily,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColors,
			contentWidth: selectedContentWidthArr,
			backgroundColor: selectedBackgroundColors,
		});
		setIsOpenArticleParams(!isOpenArticleParams);
	};

	return (
		<>
			<ArrowButton state={isOpenArticleParams} onClick={handleArrowClick} />
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
