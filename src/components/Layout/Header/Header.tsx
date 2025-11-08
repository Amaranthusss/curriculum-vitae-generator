import { RenderModeSelector } from "../../common/RenderModeSelector/RenderModeSelector";
import { Flex, Menu, Space } from "antd";
import { LanguageSelector } from "../../common/LanguageSelector/LanguageSelector";
import { ProfileManager } from "../../common/ProfileManager/ProfileManager";

import { useMemo } from "react";

import { useAppStore } from "../../../store/app/useAppStore";

import type { MenuItemType } from "antd/es/menu/interface";
import type { ItemType } from "antd/es/menu/interface";

import { RouteUrl } from "../../../constants/RouteUrl";

export const Header = (): React.ReactNode => {
	const isCompact: boolean = useAppStore(({ isCompact }) => isCompact);

	const items = useMemo((): ItemType<MenuItemType>[] => {
		return [{ key: RouteUrl.Generator, label: "Curriculum Vitae Generator" }];
	}, []);

	if (isCompact) return null;

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
				<RenderModeSelector />
				<ProfileManager />
				<LanguageSelector />
			</Space>
		</Flex>
	);
};
