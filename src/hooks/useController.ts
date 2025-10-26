import { useCallback, useRef } from "react"

export const useController = <Controller extends object>() => {
	const controller = useRef<Controller | null>(null);

	const setController = useCallback((nextController: Controller): void => {
		controller.current = nextController;
	}, [])

	return { controller, setController };
}