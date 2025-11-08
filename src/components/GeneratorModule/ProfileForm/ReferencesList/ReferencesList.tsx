import { Form, Input, Divider, Flex, Select } from "antd";
import { DragAndDropProfileList } from "../../../common/DragAndDropProfileList";
import { FormListItemToolbar } from "../../../common/FormListItemToolbar/FormListItemToolbar";
import { AddListItem } from "../../../common/AddListItem/AddListItem";
import { Trans } from "react-i18next";

import { useTranslation } from "react-i18next";
import { useMemo } from "react";

import { useAppStore } from "../../../../store/app/useAppStore";

import _ from "lodash";

import type { FormInstance, FormListFieldData } from "antd";
import type { SelectOption } from "../../../../types/antd";
import type { Profile } from "../../../../store/profile/interface";

import { iconsAssetsFolderPath } from "./ReferencesList.config";
import { predefiniedLinkIcons } from "./ReferencesList.config";

import styles from "./ReferencesList.module.scss";

export const ReferencesList = (): React.ReactNode => {
	const form: FormInstance<Profile> = Form.useFormInstance();
	const isCompact: boolean = useAppStore(({ isCompact }) => isCompact);
	const { t } = useTranslation();

	const predefiniedIcons = useMemo((): SelectOption[] => {
		return _.chain(predefiniedLinkIcons)
			.map((filePath: string): SelectOption => {
				const [type, name] = _.split(filePath, "/");
				const src = iconsAssetsFolderPath + filePath;
				let translatedType: string = "";

				switch (type) {
					case "colored":
						translatedType = `${t("references.colored-icon")}`;
						break;
					case "filled":
						translatedType = `${t("references.filled-icon")}`;
						break;
					case "light":
						translatedType = `${t("references.light-icon")}`;
						break;
					case "dark":
						translatedType = `${t("references.dark-icon")}`;
						break;
				}

				return {
					label: (
						<div className={styles.label}>
							<img src={src} alt={type + " " + name} />
							<span>
								{translatedType}&nbsp;{name}
							</span>
						</div>
					),
					value: src,
					type,
				};
			})
			.sortBy("type")
			.value();
	}, [t]);

	return (
		<DragAndDropProfileList form={form} listName={'references'}>
			<Form.List name={"references" satisfies keyof Profile}>
				{(fields: FormListFieldData[], { add, remove }): React.ReactNode => (
					<DragAndDropProfileList.Context>
						<Divider orientation={"left"}>
							<Trans i18nKey={"references.caption"} />
						</Divider>

						{fields.map(
							({ key, name, ...restField }): React.ReactNode => (
								<DragAndDropProfileList.Item key={key} name={name} >
									<Flex gap={8}>
										<Flex vertical={isCompact} flex={1} gap={isCompact ? 0 : 8}>
											<Form.Item
												{...restField}
												name={[name, "label"]}
												style={{ flex: 1 }}
											>
												<Input placeholder={t("references.label")} />
											</Form.Item>

											<Form.Item
												{...restField}
												name={[name, "link"]}
												style={{ flex: 1 }}
											>
												<Input placeholder={t("references.website-address")} />
											</Form.Item>

											<Form.Item
												{...restField}
												name={[name, "icon"]}
												style={{ flex: 1 }}
											>
												<Select
													placeholder={t("references.icon")}
													options={predefiniedIcons}
													popupMatchSelectWidth={false}
													allowClear
												/>
											</Form.Item>
										</Flex>

										<FormListItemToolbar name={name} remove={remove} />
									</Flex>
								</DragAndDropProfileList.Item>
							)
						)}

						<AddListItem add={add} text={t("references.add")} />
					</DragAndDropProfileList.Context>
				)}
			</Form.List>
		</DragAndDropProfileList >
	);
};
