import type { FormItemProps } from "antd";

export interface DisplayLimitFormItemProps {
	name: FormItemProps['name'];
	restField?: { fieldKey?: number };
	className?: string
}