import { useEffect } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";
import { useFormStore } from "../../../../store/form/useFormStore";

import _ from "lodash";

import type { UploadImageController } from "../../../common/UploadImage/UploadImage.interface";
import type { MutableRefObject } from "react";
import type { FormInstance } from "antd";
import type { Profile } from "../../../../store/profile/interface";

export const useProfilePictureListener = (
	form: FormInstance<Profile>,
	imageController: MutableRefObject<UploadImageController | null>
): void => {
	const signalProfile: number | null = useFormStore(({ signalProfile }) => signalProfile);

	useEffect((): void => {
		if (signalProfile == null) return;

		const profile: Profile = useProfileStore.getState().getProfile();

		if (profile.picture && _.startsWith(profile.picture, 'data:')) {
			imageController.current?.setFileList([
				{
					uid: '-1',
					name: 'profile-picture.png',
					status: 'done',
					url: profile.picture
				},
			]);
		} else {
			imageController.current?.setFileList([]);
		}

		form.setFieldsValue(profile);
	}, [imageController, signalProfile, form]);
}