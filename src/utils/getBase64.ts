import _ from "lodash";

export const getBase64 = (file: File | undefined): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (file == null) return resolve("no data");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(_.toString(reader.result));
    reader.onerror = (error) => reject(error);
  });
};
