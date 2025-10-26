import { Flex, Menu, Space } from "antd";
import { LanguageSelector } from "../../common/LanguageSelector/LanguageSelector";
import { ProfileManager } from "../../common/ProfileManager/ProfileManager";

import { useMemo } from "react";

import type { MenuItemType } from "antd/es/menu/interface";
import type { ItemType } from "antd/es/menu/interface";

import { RouteUrl } from "../../../constants/RouteUrl";

export const Header = (): React.ReactNode => {
	const items = useMemo((): ItemType<MenuItemType>[] => {
		return [{ key: RouteUrl.Generator, label: "Curriculum Vitae Generator" }];
	}, []);

	return (
		<Flex justify={"space-between"} align={"center"}>
			<Menu
				theme={"dark"}
				mode={"horizontal"}
				items={items}
				style={{ width: "100%" }}
				defaultSelectedKeys={[RouteUrl.Generator]}
			/>
			<Space>
				<ProfileManager />
				<LanguageSelector />
			</Space>
		</Flex>
	);
};
