import { SortableContext } from "@dnd-kit/sortable";

import { useDragAndDropProfileListContext } from "./hooks/useDragAndDropProfileListContext";

import { assignOrderIndexes } from "../../../utils/assignOrderIndexes";
import _ from "lodash";

import type { PropsWithChildren } from "react";
import type { OrderIndex } from "../../../store/profile/interface";

import { verticalListSortingStrategy } from "@dnd-kit/sortable";

export const DragAndDropProfileListContext = <T extends OrderIndex>({ children }: PropsWithChildren) => {
	const { form, listName } = useDragAndDropProfileListContext();
	const items: T[] = assignOrderIndexes<T>(form.getFieldValue(listName));

	return (
		<SortableContext strategy={verticalListSortingStrategy} items={_.map(items, (i, idx) => i.orderIndex ?? idx)}>
			{children}
		</SortableContext>
	);
};
