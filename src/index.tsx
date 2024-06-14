import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [currentArticleState, setCurrentArticleState] = useState({
		fontFamilyOption: defaultArticleState.fontFamilyOption.value,
		fontSizeOption: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
	});

	function onCurrentArticleState(styles: ArticleStateType) {
		setCurrentArticleState({
			...currentArticleState,
			fontFamilyOption: styles.fontFamilyOption.value,
			fontSizeOption: styles.fontSizeOption.value,
			fontColor: styles.fontColor.value,
			contentWidth: styles.contentWidth.value,
			backgroundColor: styles.backgroundColor.value,
		});
	}

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentArticleState.fontFamilyOption,
					'--font-size': currentArticleState.fontSizeOption,
					'--font-color': currentArticleState.fontColor,
					'--container-width': currentArticleState.contentWidth,
					'--bg-color': currentArticleState.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm setCurrentArticleState={onCurrentArticleState} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
