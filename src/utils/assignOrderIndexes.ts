import _ from "lodash";

import type { OrderIndex } from "../store/profile/interface";

export const assignOrderIndexes = <T extends OrderIndex>(list: T[]): T[] => {
	return _.map(list, (element: T, index: number): T => {
		if (_.isNil(element)) element = { orderIndex: index } as T;
		else element.orderIndex = index;
		return element;
	});
}