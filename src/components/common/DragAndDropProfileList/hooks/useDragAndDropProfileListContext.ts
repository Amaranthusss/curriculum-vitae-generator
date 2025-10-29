import { DragAndDropProfileListInnerContext } from "../contexts/DragAndDropProfileListInnerContext";

import { useContext } from "react";

import _ from "lodash";

import type { DragAndDropProfileListInnerContextValue } from "../contexts/DragAndDropProfileListInnerContext";

export const useDragAndDropProfileListContext = () => {
	const ctx: DragAndDropProfileListInnerContextValue | null = useContext(DragAndDropProfileListInnerContext);

	if (_.isNil(ctx)) {
		throw new Error("useDragAndDropProfileListContext must be used within <DragAndDropProfileList>");
	}

	return ctx;
};
