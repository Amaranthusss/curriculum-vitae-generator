import { DragAndDropProfileListHandlerContext } from "./contexts/DragAndDropProfileListHandlerContext";

import { useDragAndDropProfileListContext } from "./hooks/useDragAndDropProfileListContext";
import { useSortable } from "@dnd-kit/sortable";
import { useMemo } from "react";

import { CSS } from "@dnd-kit/utilities";

import type { DragAndDropProfileListHandlerContextValue } from "./contexts/DragAndDropProfileListHandlerContext";
import type { DragAndDropProfileListItemProps } from "./DragAndDropProfileList.interface";
import type { CSSProperties } from "react";

export const DragAndDropProfileListItem = ({ name, children }: DragAndDropProfileListItemProps): React.ReactNode => {
	const { form, listName } = useDragAndDropProfileListContext();
	const orderIndex = form.getFieldValue([listName, name, "orderIndex"]) ?? name;

	const {
		listeners,
		transform,
		transition,
		isDragging,
		setNodeRef,
		attributes,
		setActivatorNodeRef,
	} = useSortable({
		id: orderIndex,
		animateLayoutChanges: () => false,
	});

	const listStyle = useMemo((): CSSProperties => {
		return {
			transform: CSS.Translate.toString(transform),
			transition,
			...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
		};
	}, [transform, transition, isDragging]);

	const memoizedValue = useMemo((): DragAndDropProfileListHandlerContextValue => {
		return { setActivatorNodeRef, listeners, attributes };
	}, [setActivatorNodeRef, listeners, attributes]);

	return (
		<DragAndDropProfileListHandlerContext.Provider value={memoizedValue}>
			<div ref={setNodeRef} style={listStyle}>
				{children}
			</div>
		</DragAndDropProfileListHandlerContext.Provider>
	);
};
