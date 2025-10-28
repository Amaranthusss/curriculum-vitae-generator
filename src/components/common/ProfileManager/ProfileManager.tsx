import { ReadOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";

import { Trans, useTranslation } from "react-i18next";

import { useProfileStore } from "../../../store/profile/useProfileStore";

export const ProfileManager = (): React.ReactNode => {
	const saveProfile = useProfileStore(({ saveProfile }) => saveProfile);
	const loadProfile = useProfileStore(({ loadProfile }) => loadProfile);
	const { t } = useTranslation();

	return (
		<Space.Compact block>
			<Tooltip title={t('app-settings.load-profile-tooltip')}>
				<Button icon={<ReadOutlined />} onClick={loadProfile}>
					<Trans i18nKey={'app-settings.load-profile'} />
				</Button>
			</Tooltip>
			<Tooltip title={t('app-settings.save-profile-tooltip')}>
				<Button icon={<SaveOutlined />} onClick={saveProfile}>
					<Trans i18nKey={'app-settings.save-profile'} />
				</Button>
			</Tooltip>
		</Space.Compact>
	)
}