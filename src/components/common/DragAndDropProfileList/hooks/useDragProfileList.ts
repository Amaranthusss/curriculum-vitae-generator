import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import { assignOrderIndexes } from "../../../../utils/assignOrderIndexes";
import { arrayMove } from "@dnd-kit/sortable";
import _ from "lodash";

import type { OrderIndex, Profile } from "../../../../store/profile/interface";
import type { ProfileListName } from "../DragAndDropProfileList.interface";
import type { DragEndEvent } from "@dnd-kit/core";
import type { FormInstance } from "antd";

export const useDragProfileList = <T extends OrderIndex>(
	form: FormInstance<Profile>,
	listName: ProfileListName
) => {
	const onDragEnd = useCallback(({ active, over }: DragEndEvent) => {
		if (_.isNil(active) || _.isNil(over)) return;

		if (active.id !== over.id) {
			const currentList: T[] = form.getFieldValue(listName) || [];
			const activeIndex: number = _.findIndex(currentList, (i) => i.orderIndex === active.id);
			const overIndex: number = _.findIndex(currentList, (i) => i.orderIndex === over.id);
			const orderedList: T[] = assignOrderIndexes<T>(arrayMove(currentList, activeIndex, overIndex));

			form.setFieldsValue({ [listName]: orderedList });
			useProfileStore.setState({ [listName]: orderedList });
		}
	}, [form, listName]);

	return { onDragEnd };
}