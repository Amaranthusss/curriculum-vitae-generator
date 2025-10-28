import { Form, Input, Divider, DatePicker, Flex, Space } from "antd";
import { DisplayLimitFormItem } from "../../../common/DisplayLimitFormItem/DisplayLimitFormItem";
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
										<Flex flex={1}>
											<Space.Compact block>
												<Form.Item
													{...restField}
													name={[
														name,
														"type" satisfies keyof QualificationField,
													]}
													style={{ width: "100%", marginBottom: 8 }}
												>
													<Input placeholder={t("qualifications.type")} />
												</Form.Item>

												<Form.Item
													{...restField}
													name={[
														name,
														"name" satisfies keyof QualificationField,
													]}
													style={{ width: "100%", marginBottom: 8 }}
												>
													<Input placeholder={t("qualifications.name")} />
												</Form.Item>
											</Space.Compact>
										</Flex>

										<Flex flex={1} style={{ width: "100%", maxWidth: 300 }}>
											<Space.Compact block>
												<Form.Item
													{...restField}
													name={[
														name,
														"issueDate" satisfies keyof QualificationField,
													]}
													style={{ width: "100%", marginBottom: 8 }}
												>
													<DatePicker
														style={{ width: "100%" }}
														placeholder={t("qualifications.issue-date")}
													/>
												</Form.Item>

												<DisplayLimitFormItem
													restField={restField}
													name={[name, "issueDateDisplayLimit" satisfies keyof QualificationField,]}
												/>
											</Space.Compact>
										</Flex>
									</Flex>

									<Form.Item
										{...restField}
										name={[
											name,
											"description" satisfies keyof QualificationField,
										]}
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
