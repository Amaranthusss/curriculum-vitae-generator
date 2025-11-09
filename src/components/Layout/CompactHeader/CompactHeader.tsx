import { Button, Flex, Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { SettingsAsModal } from "./SettingsAsModal/SettingsAsModal";
import { PreviewAsModal } from "./PreviewAsModal/PreviewAsModal";
import { EyeOutlined } from "@ant-design/icons";
import { Logo } from "../../common/Logo/Logo";

import { useController } from "../../../hooks/useController";
import { useCallback } from "react";

import type { SettingsAsModalController } from "./SettingsAsModal/SettingsAsModal.interface";
import type { PreviewAsModalController } from "./PreviewAsModal/PreviewAsModal.interface";

export const CompactHeader = (): React.ReactNode => {
	const { controller: settingsAsModalController, setController: setSettingsAsModalController } = useController<SettingsAsModalController>();
	const { controller: previewAsModalController, setController: setPreviewAsModalController } = useController<PreviewAsModalController>();

	const showPreview = useCallback((): void => previewAsModalController.current?.show(), [previewAsModalController]);
	const showSettings = useCallback((): void => settingsAsModalController.current?.show(), [settingsAsModalController]);

	return (
		<>
			<Flex align={'center'} justify={'space-between'} gap={12} style={{ height: '100%' }}>
				<Logo />

				<Space>
					<Button type={'primary'} size={'large'} onClick={showPreview} icon={<EyeOutlined />} />
					<Button type={'primary'} size={'large'} onClick={showSettings} icon={<SettingOutlined />} />
				</Space>
			</Flex>

			<PreviewAsModal setController={setPreviewAsModalController} />
			<SettingsAsModal setController={setSettingsAsModalController} />
		</>
	)
}