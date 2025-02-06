import { Layout as LayoutProvider } from "antd";
import { GeneratorModule } from "../GeneratorModule/GeneratorModule";
import { Loading } from "../common/Loading/Loading";
import { Header } from "./Header/Header";

import { Suspense } from "react";

import { theme } from "antd";

import styles from "./Layout.module.scss";

export const Layout = (): React.ReactNode => {
  const { token } = theme.useToken();

  return (
    <LayoutProvider className={styles.layout}>
      <Suspense fallback={<Loading />}>
        <LayoutProvider.Header>
          <Header />
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
      </Suspense>
    </LayoutProvider>
  );
};
