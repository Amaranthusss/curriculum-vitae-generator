import { SortableListItemContext, SortableListItemContextProps } from "../../../contexts/SortableListItemContext";

import { useSortable } from '@dnd-kit/sortable';
import { CSSProperties, useMemo } from "react";

import { CSS } from '@dnd-kit/utilities';

import type { SortableItemProps } from "./SortableItem.interface";

export const SortableItem = ({ itemKey, children }: SortableItemProps): React.ReactNode => {
	const {
		listeners,
		transform,
		transition,
		isDragging,
		setNodeRef,
		attributes,
		setActivatorNodeRef,
	} = useSortable({
		id: itemKey,
		animateLayoutChanges: () => false
	});

	const listStyle = useMemo((): CSSProperties => {
		return {
			transform: CSS.Translate.toString(transform),
			transition,
			...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
		};
	}, [transform, transition, isDragging]);

	const memoizedValue = useMemo((): SortableListItemContextProps => {
		return { setActivatorNodeRef, listeners, attributes };
	}, [setActivatorNodeRef, listeners, attributes]);

	return (
		<SortableListItemContext.Provider value={memoizedValue}>
			<div ref={setNodeRef} style={listStyle}>
				{children}
			</div>
		</SortableListItemContext.Provider>
	);
}