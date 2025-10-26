import type { Dispatch, SetStateAction } from "react";
import type { UploadFile, UploadProps } from "antd";

export interface UploadImageController {
	setFileList: Dispatch<SetStateAction<UploadFile<unknown>[]>>
}

export interface UploadImageProps {
	setController?: (controller: UploadImageController) => void
	onChange?: (
		file: ReturnType<Exclude<UploadProps["beforeUpload"], undefined>> | null
	) => void;
}
