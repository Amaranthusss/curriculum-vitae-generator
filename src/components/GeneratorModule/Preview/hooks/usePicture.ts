import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import _ from "lodash";

import type { Content } from "pdfmake/interfaces";

import { pictureBase64 } from "../../../../assets/images/stockPicture";
import { layout } from "../Preview.config";

export const usePicture = () => {
  const picture = useProfileStore(({ picture }) => picture);

  const renderPicture = useCallback((): Content => {
    return {
      image: _.isEmpty(picture) ? pictureBase64 : picture,
      width: layout.imageWidth,
      marginBottom: layout.imageBottomMargin,
    };
  }, [picture]);

  return { renderPicture };
};
