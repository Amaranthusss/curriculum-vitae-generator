import { Button, Select, Space, Tooltip } from "antd";
import { SyncOutlined } from "@ant-design/icons";

import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useAppStore } from "../../../store/app/useAppStore";

import type { RenderMode, TriggerSignalManualProfile } from "../../../store/app/interface";
import type { DefaultOptionType } from "antd/es/select";

export const RenderModeSelector = (): React.ReactNode => {
	const triggerSignalManualProfile: TriggerSignalManualProfile = useAppStore(({ triggerSignalManualProfile }) => triggerSignalManualProfile);
	const renderMode: RenderMode = useAppStore(({ renderMode }) => renderMode);
	const { t } = useTranslation();

	const options = useMemo((): DefaultOptionType[] => {
		return ([
			{ value: 'onChange' satisfies RenderMode, label: t('app-settings.render-mode-on-change') },
			{ value: 'debounced' satisfies RenderMode, label: t('app-settings.render-mode-debounced') },
			{ value: 'manual' satisfies RenderMode, label: t('app-settings.render-mode-manual') },
		]);
	}, [t])

	const onChange = useCallback((value: RenderMode): void => {
		useAppStore.setState({ renderMode: value });
	}, []);

	return (
		<Space.Compact block >
			<Select
				options={options}
				value={renderMode}
				onChange={onChange}
				style={{ minWidth: 250 }}
			/>

			{renderMode === 'manual' &&
				<Tooltip title={t('app-settings.render-mode-manual-trigger')}>
					<Button
						type={'primary'}
						icon={<SyncOutlined />}
						onClick={triggerSignalManualProfile}
					/>
				</Tooltip>
			}
		</Space.Compact>
	);
}