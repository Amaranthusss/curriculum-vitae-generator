import { Form, Input, Divider, Flex, Space } from "antd";
import { DisplayLimitFormItem } from "../../../common/DisplayLimitFormItem/DisplayLimitFormItem";
import { DatePickerFormItem } from "../../../common/DatePickerFormItem/DatePickerFormItem";
import { DeleteListItem } from "../../../common/DeleteListItem/DeleteListItem";
import { AddListItem } from "../../../common/AddListItem/AddListItem";
import { Trans } from "react-i18next";

import { useTranslation } from "react-i18next";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import type { GeneralSettings, QualificationField } from "../../../../store/profile/interface";
import type { FormListFieldData } from "antd";
import type { Profile } from "../../../../store/profile/interface";

export const QualificationsList = (): React.ReactNode => {
	const generalSettings: GeneralSettings = useProfileStore(({ generalSettings }) => generalSettings);
	const { t } = useTranslation();

	return (
		<>
			<Flex>
				<Flex flex={1}>
					<Divider orientation={"left"}>
						<Trans i18nKey={"qualifications.caption"} />
					</Divider>
				</Flex>

				<Flex style={{ minWidth: 132 }}>
					<Divider orientation={"center"} >
						<DisplayLimitFormItem
							style={{ margin: 0 }}
							name={[
								"generalSettings" satisfies keyof Profile,
								"qualifications" satisfies keyof GeneralSettings,
								"dateDisplayLimit" satisfies keyof GeneralSettings['qualifications'],
							]}
						/>
					</Divider>
				</Flex>
			</Flex>

			<Form.List name={"qualifications" satisfies keyof Profile}>
				{(fields: FormListFieldData[], { add, remove }): React.ReactNode => (
					<>
						{fields.map(
							({ key, name, ...restField }): React.ReactNode => (
								<Flex key={key} gap={8}>
									<Flex vertical flex={1}>
										<Flex gap={8}>
											<Space.Compact block>
												<Form.Item
													{...restField}
													name={[name, "type" satisfies keyof QualificationField]}
													style={{ width: "100%", marginBottom: 8 }}
												>
													<Input placeholder={t("qualifications.type")} />
												</Form.Item>

												<Form.Item
													{...restField}
													name={[name, "name" satisfies keyof QualificationField]}
													style={{ width: "100%", marginBottom: 8 }}
												>
													<Input placeholder={t("qualifications.name")} />
												</Form.Item>
											</Space.Compact>

											<DatePickerFormItem
												name={name}
												disableRange
												restField={restField}
												placeholders={[t("qualifications.issue-date"), '']}
												subname={"date" satisfies keyof QualificationField}
												parentName={["qualifications" satisfies keyof Profile]}
												displayLimitDefault={generalSettings.qualifications.dateDisplayLimit}
											/>
										</Flex>

										<Form.Item
											{...restField}
											name={[name, "description" satisfies keyof QualificationField]}
										>
											<Input.TextArea
												placeholder={t("qualifications.description")}
											/>
										</Form.Item>
									</Flex>

									<DeleteListItem name={name} remove={remove} />
								</Flex>
							)
						)}

						<AddListItem add={add} text={t("qualifications.add")} />
					</>
				)}
			</Form.List>
		</>
	);
};
