import { RenderModeSelector } from "../../common/RenderModeSelector/RenderModeSelector";
import { LanguageSelector } from "../../common/LanguageSelector/LanguageSelector";
import { ProfileManager } from "../../common/ProfileManager/ProfileManager";
import { Flex, Space } from "antd";
import { Logo } from "../../common/Logo/Logo";

export const Header = (): React.ReactNode => {
	return (
		<Flex justify={"space-between"} align={"center"}>
			<Logo />

			<Space>
				<RenderModeSelector />
				<ProfileManager />
				<LanguageSelector />
			</Space>
		</Flex>
	);
};
