import { DragAndDropProfileListContext } from "./DragAndDropProfileList.Context";
import { DragAndDropProfileListHandler } from "./DragAndDropProfileList.Handler";
import { DragAndDropProfileListBase } from "./DragAndDropProfileList.Base";
import { DragAndDropProfileListItem } from "./DragAndDropProfileList.Item";

import type { DragAndDropProfileListBaseProps } from "./DragAndDropProfileList.interface";

export interface DragAndDropProfileListComponent
  extends React.FC<DragAndDropProfileListBaseProps> {
  Context: typeof DragAndDropProfileListContext;
	Handler: typeof DragAndDropProfileListHandler;
  Item: typeof DragAndDropProfileListItem;
}

export const DragAndDropProfileList = DragAndDropProfileListBase as DragAndDropProfileListComponent;
DragAndDropProfileList.Context = DragAndDropProfileListContext;
DragAndDropProfileList.Handler = DragAndDropProfileListHandler;
DragAndDropProfileList.Item = DragAndDropProfileListItem;
