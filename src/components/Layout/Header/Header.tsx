import { LanguageSelector } from "../../common/LanguageSelector/LanguageSelector";
import { Flex, Menu } from "antd";

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
      <LanguageSelector />
    </Flex>
  );
};
