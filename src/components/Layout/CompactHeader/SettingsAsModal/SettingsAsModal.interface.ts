export interface SettingsAsModalController {
	show: () => void
}

export interface SettingsAsModalProps {
	setController?: (controller: SettingsAsModalController) => void
}