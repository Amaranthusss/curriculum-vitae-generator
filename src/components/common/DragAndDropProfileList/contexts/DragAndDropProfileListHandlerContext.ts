import { createContext } from "react";

import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import type { DraggableAttributes } from "@dnd-kit/core";

export interface DragAndDropProfileListHandlerContextValue {
	setActivatorNodeRef?: (element: HTMLElement | null) => void;
	listeners?: SyntheticListenerMap;
	attributes?: DraggableAttributes;
}

export const DragAndDropProfileListHandlerContext = createContext<DragAndDropProfileListHandlerContextValue>({});