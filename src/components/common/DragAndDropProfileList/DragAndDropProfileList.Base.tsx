import { useDragProfileList } from "./hooks/useDragProfileList";

import type { DragAndDropProfileListBaseProps } from "./DragAndDropProfileList.interface";
import type { OrderIndex } from "../../../store/profile/interface";

import { DragAndDropProfileListInnerContext } from "./contexts/DragAndDropProfileListInnerContext";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { DndContext } from "@dnd-kit/core";

export const DragAndDropProfileListBase = <T extends OrderIndex>({
	form,
	listName,
	children,
}: DragAndDropProfileListBaseProps): React.ReactNode => {
	const { onDragEnd } = useDragProfileList<T>(form, listName);

	return (
		<DragAndDropProfileListInnerContext.Provider value={{ form, listName }}>
			<DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
				{children}
			</DndContext>
		</DragAndDropProfileListInnerContext.Provider>
	);
};
