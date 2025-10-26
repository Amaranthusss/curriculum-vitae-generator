import { useEffect } from "react"

export const useControllerCallback = <Controller extends object>(
	setController: ((controller: Controller) => void) | undefined,
	definition: Controller
): void => {
	useEffect((): void => {
		setController?.(definition);
	}, [setController, definition])
}