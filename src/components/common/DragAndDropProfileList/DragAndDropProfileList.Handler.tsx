import { HolderOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

import { useTranslation } from 'react-i18next';
import { useContext } from "react";

import { DragAndDropProfileListHandlerContext } from "./contexts/DragAndDropProfileListHandlerContext";

export const DragAndDropProfileListHandler = (): React.ReactNode => {
	const { setActivatorNodeRef, listeners, attributes } = useContext(DragAndDropProfileListHandlerContext);
	const { t } = useTranslation();

	return (
		<Tooltip title={t('app-settings.drag-and-drop-from-list-element')}>
			<Button
				type="text"
				size="small"
				icon={<HolderOutlined />}
				style={{ cursor: 'move' }}
				ref={setActivatorNodeRef}
				{...attributes}
				{...listeners}
			/>
		</Tooltip>
	);
}