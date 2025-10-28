import type { DisplayLimitFormItemProps } from "../DisplayLimitFormItem/DisplayLimitFormItem.interface";

export interface DatePickerFormItemProps {
	restField: { fieldKey?: number };
	name: number;
	parentName: string[];
	subname: string;
	placeholders?: [string, string];
	displayLimitDefault?: DisplayLimitFormItemProps['defaultValue'];
	disableRange?: boolean;
}
