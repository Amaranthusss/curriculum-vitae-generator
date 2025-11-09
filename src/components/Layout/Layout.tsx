import { Layout as LayoutProvider } from "antd";
import { GeneratorModule } from "../GeneratorModule/GeneratorModule";
import { CompactHeader } from "./CompactHeader/CompactHeader";
import { Loading } from "../common/Loading/Loading";
import { Header } from "./Header/Header";

import { Suspense } from "react";

import { useAppStore } from "../../store/app/useAppStore";

import { theme } from "antd";

import styles from "./Layout.module.scss";

export const Layout = (): React.ReactNode => {
	const isCompact: boolean = useAppStore(({ isCompact }) => isCompact);
	const { token } = theme.useToken();

	return (
		<LayoutProvider className={styles.layout}>
			<Suspense fallback={<Loading />}>
				<LayoutProvider.Header className={styles.header}>
					{!isCompact ? <Header /> : <CompactHeader />}
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
