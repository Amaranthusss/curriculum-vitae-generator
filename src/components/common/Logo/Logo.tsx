import styles from './Logo.module.scss';

export const Logo = (): React.ReactNode => {
	return (
		<img
			src={'assets/logo.png'}
			className={styles.logo}
			alt={'Curriculum Vitae Generator'}
		/>
	);
}