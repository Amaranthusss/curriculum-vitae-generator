import type { DefaultOptionType } from "antd/es/select";
import type { FormItemProps } from "antd";
import type { CSSProperties } from "react";
import type { DisplayLimit } from "../../../constants/DisplayLimit";

export interface DisplayLimitFormItemProps {
	name: FormItemProps['name'];
	restField?: { fieldKey?: number };
	className?: string;
	defaultValue?: DisplayLimit;
	style?: CSSProperties;
	onChange?: (value: DisplayLimit, option: DefaultOptionType) => void;
}