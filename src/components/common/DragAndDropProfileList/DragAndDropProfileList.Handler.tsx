import { HolderOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { useContext } from "react";

import { DragAndDropProfileListHandlerContext } from "./contexts/DragAndDropProfileListHandlerContext";

export const DragAndDropProfileListHandler = (): React.ReactNode => {
	const { setActivatorNodeRef, listeners, attributes } = useContext(DragAndDropProfileListHandlerContext);

	return (
		<Button
			type="text"
			size="small"
			icon={<HolderOutlined />}
			style={{ cursor: 'move' }}
			ref={setActivatorNodeRef}
			{...attributes}
			{...listeners}
		/>
	);
}