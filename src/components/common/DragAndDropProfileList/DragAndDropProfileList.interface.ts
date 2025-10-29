import type { OrderIndex, Profile } from "../../../store/profile/interface";
import type { PropsWithChildren } from "react";
import type { FormInstance } from "antd";

export type ProfileListName = Exclude<{
  [P in keyof Profile]: Profile[P] extends OrderIndex[] ? P : never
}[keyof Profile], undefined>;

export interface DragAndDropProfileListBaseProps extends PropsWithChildren {
	form: FormInstance<Profile>,
	listName: ProfileListName
}

export interface DragAndDropProfileListItemProps extends PropsWithChildren {
	name: number;
}