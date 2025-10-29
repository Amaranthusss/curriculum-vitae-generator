import { HolderOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { useContext } from "react";

import { SortableListItemContext } from "../../../contexts/SortableListItemContext";

export const DragHandle = (): React.ReactNode => {
	const { setActivatorNodeRef, listeners, attributes } = useContext(SortableListItemContext);

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