import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

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

	function onCurrentArticleState(e: any) {
		setCurrentArticleState({
			...currentArticleState,
			fontFamilyOption: e.fontFamilyOption.value,
			fontSizeOption: e.fontSizeOption.value,
			fontColor: e.fontColor.value,
			contentWidth: e.contentWidth.value,
			backgroundColor: e.backgroundColor.value,
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
