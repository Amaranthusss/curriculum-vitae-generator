import { Image, Upload } from "antd";
import ImgCrop from "antd-img-crop";

import { useCallback, useState } from "react";

import type { GetProp, UploadFile, UploadProps } from "antd";
import { UploadChangeParam } from "antd/es/upload";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const UploadImage = (): React.ReactNode => {
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = useCallback(async (file: UploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  }, []);

  const handleChange: UploadProps["onChange"] = useCallback(
    ({
      fileList: newFileList,
    }: UploadChangeParam<UploadFile<unknown>>): void => {
      setFileList(newFileList);
    },
    []
  );

  return (
    <ImgCrop rotationSlider>
      <Upload
        action={"https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"}
        listType={"picture-circle"}
        fileList={fileList}
        multiple={false}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      </Upload>
    </ImgCrop>
  );
};
