import { createContext } from "react";

import type { ProfileListName } from "../DragAndDropProfileList.interface";
import type { FormInstance } from "antd";
import type { Profile } from "../../../../store/profile/interface";

export interface DragAndDropProfileListInnerContextValue {
	form: FormInstance<Profile>;
	listName: ProfileListName;
}

export const DragAndDropProfileListInnerContext = createContext<DragAndDropProfileListInnerContextValue | null>(null);
