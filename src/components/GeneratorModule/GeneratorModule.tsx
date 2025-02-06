import { Divider, Flex, Splitter } from "antd";
import { ColorsPicker } from "../common/ColorsPicker/ColorsPicker";
import { ProfileForm } from "./ProfileForm/ProfileForm";
import { Preview } from "./Preview/Preview";

import { useAppStore } from "../../store/app/useAppStore";

import styles from "./GeneratorModule.module.scss";

export const GeneratorModule = (): React.ReactNode => {
  const isCompact: boolean = useAppStore(({ isCompact }) => isCompact);

  return (
    <Flex style={{ height: "100%" }} gap={16}>
      <ColorsPicker />
      <Divider type={"vertical"} style={{ height: "100%" }} />
      <Splitter layout={!isCompact ? "horizontal" : "vertical"}>
        <Splitter.Panel className={styles.profileFormSplitter} min={350}>
          <ProfileForm />
        </Splitter.Panel>

        <Splitter.Panel className={styles.previewSplitter}>
          <Preview />
        </Splitter.Panel>
      </Splitter>
    </Flex>
  );
};
