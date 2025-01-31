import { Layout as LayoutProvider } from "antd";
import { GeneratorModule } from "../GeneratorModule/GeneratorModule";
import { Menu } from "antd";

import { useMemo } from "react";

import type { MenuItemType } from "antd/es/menu/interface";
import type { ItemType } from "antd/es/menu/interface";

import { RouteUrl } from "../../constants/RouteUrl";
import { theme } from "antd";

import styles from "./Layout.module.scss";

export const Layout = (): React.ReactNode => {
  const items = useMemo((): ItemType<MenuItemType>[] => {
    return [{ key: RouteUrl.Generator, label: "Curriculum Vitae Generator" }];
  }, []);

  const { token } = theme.useToken();

  return (
    <LayoutProvider className={styles.layout}>
      <LayoutProvider.Header>
        <Menu
          theme={"dark"}
          mode={"horizontal"}
          items={items}
          defaultSelectedKeys={[RouteUrl.Generator]}
        />
      </LayoutProvider.Header>

      <LayoutProvider.Content
        className={styles.content}
        style={{
          borderRadius: token.borderRadiusLG,
          backgroundColor: token.colorBgContainer,
        }}
      >
        <GeneratorModule />
      </LayoutProvider.Content>

      <LayoutProvider.Footer className={styles.footer}>
        Oskar Szkurłat ©{new Date().getFullYear()}
      </LayoutProvider.Footer>
    </LayoutProvider>
  );
};
