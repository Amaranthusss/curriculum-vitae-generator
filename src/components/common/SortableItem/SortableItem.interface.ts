import type { UniqueIdentifier } from "@dnd-kit/core";
import type { PropsWithChildren } from "react";

export interface SortableItemProps extends PropsWithChildren {
	itemKey: UniqueIdentifier
}