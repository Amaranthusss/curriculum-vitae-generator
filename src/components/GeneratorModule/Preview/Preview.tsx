import { useCallback, useEffect, useRef } from "react";
import { useDocumentDefinition } from "./hooks/useDocumentDefinition";
import { useShallow } from "zustand/react/shallow";

import { useProfileStore } from "../../../store/profile/useProfileStore";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import _ from "lodash";

import type { Profile } from "../../../store/profile/interface";

import { ProfileKeys } from "../../../constants/ProfileKeys";

import defaultPdf from "../../../assets/pdfs/default.pdf"

import styles from "./Preview.module.scss";

pdfMake.vfs = pdfFonts.vfs;

export const Preview = (): React.ReactNode => {
	const profile: Profile = useProfileStore(useShallow((s) => _.pick(s, ProfileKeys)));
	const isProfileChange: () => boolean = useProfileStore(({ isChange }) => isChange);

	const { createDocumentDefinition } = useDocumentDefinition();

	const ref = useRef<HTMLIFrameElement | null>(null);

	const renderPdf = useCallback(async (): Promise<void> => {
		if (ref.current == null) return;

		pdfMake
			.createPdf(await createDocumentDefinition())
			.getBlob((blob: Blob): void => {
				if (ref.current == null) return;
				ref.current.src = URL.createObjectURL(blob);
			});
	}, [createDocumentDefinition]);

	useEffect((): void => {
		if (isProfileChange()) renderPdf();
		else if (ref.current) ref.current.src = defaultPdf;
	}, [profile, isProfileChange, renderPdf]);

	return <iframe ref={ref} title={"CV-Preview"} className={styles.iframe} />;
};
