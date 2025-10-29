import { useMemo } from "react";

import _ from "lodash";

import type { HTMLAttributes, PropsWithChildren } from "react";

import styles from './Outlined.module.scss';

export const Outlined = ({ children, ...rest }: PropsWithChildren & HTMLAttributes<HTMLDivElement>): React.ReactNode => {
	const combinedClassName = useMemo((): string => {
		if (_.isEmpty(rest.className)) return styles.outlined;
		return `${rest.className} ${styles.outlined}`
	}, [rest])

	return (
		<div {...rest} className={combinedClassName}>
			{children}
		</div>
	);
}