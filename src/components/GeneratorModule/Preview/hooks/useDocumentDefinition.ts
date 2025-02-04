import { useCallback } from "react";
import { useIndex } from "./useIndex";

import type { TDocumentDefinitions } from "pdfmake/interfaces";

export const useDocumentDefinition = () => {
  const { renderContent } = useIndex();

  const createDocumentDefinition =
    useCallback(async (): Promise<TDocumentDefinitions> => {
      return {
        pageSize: "A4",
        pageMargins: [0, 0, 0, 0],
        content: await renderContent(),
      };
    }, [renderContent]);

  return { createDocumentDefinition };
};
