import type { UploadProps } from "antd";

export interface UploadImageProps {
  onChange?: (
    file: ReturnType<Exclude<UploadProps["beforeUpload"], undefined>> | null
  ) => void;
}
