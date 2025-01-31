import { Image, Upload } from "antd";
import ImgCrop from "antd-img-crop";

import { useCallback, useState } from "react";

import { getBase64 } from "../../../utils/getBase64";
import _ from "lodash";

import type { UploadChangeParam } from "antd/es/upload";
import type { UploadImageProps } from "./UploadImage.interface";
import type { UploadProps } from "antd";
import type { UploadFile } from "antd";

export const UploadImage = ({
  onChange,
}: UploadImageProps): React.ReactNode => {
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = useCallback(async (file: UploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  }, []);

  const handleChange: UploadProps["onChange"] = useCallback(
    (info: UploadChangeParam<UploadFile<unknown>>): void => {
      setFileList(info.fileList);
      if (_.isEmpty(info.fileList)) onChange?.(null);
    },
    [onChange]
  );

  const onModalOk = useCallback(
    (
      value: ReturnType<Exclude<UploadProps["beforeUpload"], undefined>>
    ): void => {
      return onChange?.(value as File);
    },
    [onChange]
  );

  return (
    <>
      <ImgCrop
        rotationSlider
        aspect={1 / 1.5}
        onModalOk={onModalOk}
        quality={1}
      >
        <Upload
          customRequest={({ onSuccess }): void => onSuccess?.("ok")}
          listType={"picture-circle"}
          fileList={fileList}
          multiple={false}
          maxCount={1}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length === 0 && <>Add picture</>}
        </Upload>
      </ImgCrop>

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};
