import { DeleteOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import { useTranslation } from "react-i18next";
import { useCallback } from "react";

import type { DeleteListItemProps } from "./DeleteListItem.interface";

export const DeleteListItem = ({
	name,
	remove,
	className,
}: DeleteListItemProps): React.ReactNode => {
	const { t } = useTranslation();

	const removeHandler = useCallback((): void => {
		remove(name);
	}, [remove, name]);

	return (
		<Tooltip title={t('app-settings.remove-form-list-element')}>
			<DeleteOutlined className={className} onClick={removeHandler} />
		</Tooltip>
	);
};
