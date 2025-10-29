import { DragAndDropProfileList } from "../DragAndDropProfileList";
import { DeleteListItem } from "../DeleteListItem/DeleteListItem";
import { Outlined } from "../Outlined/Outlined";

import type { FormListItemToolbarProps } from "./FormListItemToolbar.interface";

import styles from './FormListItemToolbar.module.scss';

export const FormListItemToolbar = ({ name, remove }: FormListItemToolbarProps): React.ReactNode => {
	return (
		<Outlined className={styles.container}>
			<DragAndDropProfileList.Handler />
			<DeleteListItem name={name} remove={remove} />
		</Outlined>
	);
} 