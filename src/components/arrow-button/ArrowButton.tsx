import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

export type OnClick = {
	state: string;
	onClick: () => void;
};

export const ArrowButton = ({ state, onClick }: OnClick) => {
	const toggleForm =
		state === 'true' ? styles.container_open : styles.container;
	const toggleArrow = state === 'true' ? styles.arrow_open : styles.arrow;

	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={toggleForm}
			onClick={onClick}>
			<img src={arrow} alt='иконка стрелочки' className={toggleArrow} />
		</div>
	);
};
