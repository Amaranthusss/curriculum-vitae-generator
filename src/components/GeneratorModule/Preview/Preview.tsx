import { useCallback, useEffect, useRef } from "react";
import { useProfileStore } from "../../../store/profile/useProfileStore";
import { useDocumentDefinition } from "./hooks/useDocumentDefinition";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import type { ProfileStore } from "../../../store/profile/interface";

import styles from "./Preview.module.scss";

pdfMake.vfs = pdfFonts.vfs;

export const Preview = (): React.ReactNode => {
  const ref = useRef<HTMLIFrameElement | null>(null);

  const { createDocumentDefinition } = useDocumentDefinition();

  const profileStore: ProfileStore = useProfileStore();

  const renderPdf = useCallback((): void => {
    if (ref.current == null) return;

    pdfMake
      .createPdf(createDocumentDefinition())
      .getBlob((blob: Blob): void => {
        if (ref.current == null) return;
        ref.current.src = URL.createObjectURL(blob);
      });
  }, [createDocumentDefinition]);

  useEffect((): void => {
    renderPdf();
  }, [profileStore, renderPdf]);

  return <iframe ref={ref} title={"CV-Preview"} className={styles.iframe} />;
};
