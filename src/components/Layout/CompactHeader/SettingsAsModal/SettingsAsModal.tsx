import { RenderModeSelector } from "../../../common/RenderModeSelector/RenderModeSelector";
import { LanguageSelector } from "../../../common/LanguageSelector/LanguageSelector";
import { ProfileManager } from "../../../common/ProfileManager/ProfileManager";
import { ColorsPicker } from "../../../common/ColorsPicker/ColorsPicker";
import { Flex, Modal } from "antd";

import { useControllerCallback } from "../../../../hooks/useControllerCallback";
import { useModalOpenState } from "../../../../hooks/useModalOpenState";
import { useTranslation } from "react-i18next";

import type { SettingsAsModalProps } from "./SettingsAsModal.interface";

export const SettingsAsModal = ({ setController }: SettingsAsModalProps): React.ReactNode => {
	const { isModalOpen, show, close } = useModalOpenState();
	const { t } = useTranslation();

	useControllerCallback(setController, { show });

	return (
		<Modal
			centered
			closable
			maskClosable
			footer={null}
			open={isModalOpen}
			onCancel={close}
			title={t('compact-components.settings-modal-title')}
		>
			<Flex vertical gap={12}>
				<RenderModeSelector />
				<ProfileManager />
				<LanguageSelector />
				<ColorsPicker />
			</Flex>
		</Modal>
	);
}