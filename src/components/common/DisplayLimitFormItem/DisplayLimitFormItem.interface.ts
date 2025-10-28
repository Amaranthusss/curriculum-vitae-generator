import type { DefaultOptionType } from "antd/es/select";
import type { DisplayLimit } from "../../../constants/DisplayLimit";
import type { FormItemProps } from "antd";

export interface DisplayLimitFormItemProps {
	name: FormItemProps['name'];
	restField?: { fieldKey?: number };
	className?: string;
	defaultValue?: DisplayLimit;
	onChange?: (value: DisplayLimit, option: DefaultOptionType) => void;
}