import { Form, Input, Divider, Flex, Space } from "antd";
import { DatePickerFormItem } from "../../../common/DatePickerFormItem/DatePickerFormItem";
import { DeleteListItem } from "../../../common/DeleteListItem/DeleteListItem";
import { AddListItem } from "../../../common/AddListItem/AddListItem";
import { Trans } from "react-i18next";

import { useTranslation } from "react-i18next";

import type { QualificationField } from "../../../../store/profile/interface";
import type { FormListFieldData } from "antd";
import type { Profile } from "../../../../store/profile/interface";

export const QualificationsList = (): React.ReactNode => {
	const { t } = useTranslation();

	return (
		<Form.List name={"qualifications" satisfies keyof Profile}>
			{(fields: FormListFieldData[], { add, remove }): React.ReactNode => (
				<>
					<Divider orientation={"left"}>
						<Trans i18nKey={"qualifications.caption"} />
					</Divider>

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
	);
};
