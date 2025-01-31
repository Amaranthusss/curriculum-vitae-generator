import { useCallback } from "react";

import type { Content } from "pdfmake/interfaces";

import { pictureBase64 } from "../../../../assets/images/mockPicture";
import { layout } from "../Preview.config";

export const usePicture = () => {
  const renderPicture = useCallback((): Content => {
    return {
      image: pictureBase64,
      width: layout.imageWidth,
      marginBottom: layout.imageBottomMargin,
    };
  }, []);

  return { renderPicture };
};
