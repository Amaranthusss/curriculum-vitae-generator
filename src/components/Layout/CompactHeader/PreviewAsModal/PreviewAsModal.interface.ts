export interface PreviewAsModalController {
	show: () => void
}

export interface PreviewAsModalProps {
	setController?: (controller: PreviewAsModalController) => void
}