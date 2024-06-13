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
	const [styl, setStyl] = useState({
		fontFamilyOption: defaultArticleState.fontFamilyOption.value,
		fontSizeOption: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
		bgColor: defaultArticleState.backgroundColor.value,
	});

	function resBut() {
		setStyl({
			...styl,
			fontFamilyOption: defaultArticleState.fontFamilyOption.value,
			fontSizeOption: defaultArticleState.fontSizeOption.value,
			fontColor: defaultArticleState.fontColor.value,
			contentWidth: defaultArticleState.contentWidth.value,
			bgColor: defaultArticleState.backgroundColor.value,
		});
	}

	const confBut = (e: any) => {
		setStyl({
			...styl,
			fontFamilyOption: e.fontFamilyOption.value,
			fontSizeOption: e.fontSizeOption.value,
			fontColor: e.fontColor.value,
			contentWidth: e.contentWidth.value,
			bgColor: e.bgColor.value,
		});
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': styl.fontFamilyOption,
					'--font-size': styl.fontSizeOption,
					'--font-color': styl.fontColor,
					'--container-width': styl.contentWidth,
					'--bg-color': styl.bgColor,
				} as CSSProperties
			}>
			<ArticleParamsForm confirm={confBut} reset={resBut} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
