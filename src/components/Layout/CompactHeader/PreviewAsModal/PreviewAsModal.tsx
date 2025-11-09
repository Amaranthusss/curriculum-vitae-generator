import { Preview } from "../../../GeneratorModule/Preview/Preview";
import { Modal } from "antd";

import { useControllerCallback } from "../../../../hooks/useControllerCallback";
import { useModalOpenState } from "../../../../hooks/useModalOpenState";
import { useTranslation } from "react-i18next";

import type { PreviewAsModalProps } from "./PreviewAsModal.interface";

export const PreviewAsModal = ({ setController }: PreviewAsModalProps): React.ReactNode => {
	const { isModalOpen, show, close } = useModalOpenState();
	const { t } = useTranslation();

	useControllerCallback(setController, { show });

	return (
		<>
			<Modal
				centered
				closable
				maskClosable
				footer={null}
				open={isModalOpen}
				onCancel={close}
				title={t('compact-components.preview-modal-title')}
			>
				<div style={{ height: '75vh' }}>
					<Preview />
				</div>
			</Modal>
		</>
	);
}