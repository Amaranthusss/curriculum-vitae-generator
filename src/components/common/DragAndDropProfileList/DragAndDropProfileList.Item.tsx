import { SortableItem } from "../SortableItem/SortableItem";
import { DragAndDropProfileListItemProps } from "./DragAndDropProfileList.interface";

import { useDragAndDropProfileListContext } from "./hooks/useDragAndDropProfileListContext";

export const DragAndDropProfileListItem = ({ name, children }: DragAndDropProfileListItemProps): React.ReactNode => {
	const { form, listName } = useDragAndDropProfileListContext();
	const orderIndex = form.getFieldValue([listName, name, "orderIndex"]) ?? name;

	return (
		<SortableItem itemKey={orderIndex}>
			{children}
		</SortableItem>
	);
};
