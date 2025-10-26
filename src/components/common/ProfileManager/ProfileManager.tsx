import { ReadOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";

import { useTranslation } from "react-i18next";

import { useProfileStore } from "../../../store/profile/useProfileStore";

export const ProfileManager = (): React.ReactNode => {
	const saveProfile = useProfileStore(({ saveProfile }) => saveProfile);
	const loadProfile = useProfileStore(({ loadProfile }) => loadProfile);
	const { t } = useTranslation();

	return (
		<Space.Compact block>
			<Tooltip title={t('app-settings.load-profile')}>
				<Button icon={<ReadOutlined />} onClick={loadProfile} />
			</Tooltip>
			<Tooltip title={t('app-settings.save-profile')}>
				<Button icon={<SaveOutlined />} onClick={saveProfile} />
			</Tooltip>
		</Space.Compact>
	)
}