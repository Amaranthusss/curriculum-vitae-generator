import { useCallback, useState } from "react";

export const useModalOpenState = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const show = useCallback((): void => {
		setIsModalOpen(true);
	}, [])

	const close = useCallback((): void => {
		setIsModalOpen(false);
	}, [])

	return { isModalOpen, show, close };
}