import { Divider, Flex, Splitter } from "antd";
import { ColorsPicker } from "../common/ColorsPicker/ColorsPicker";
import { ProfileForm } from "./ProfileForm/ProfileForm";
import { Preview } from "./Preview/Preview";

import styles from "./GeneratorModule.module.scss";

export const GeneratorModule = (): React.ReactNode => {
  return (
    <Flex style={{ height: "100%" }} gap={16}>
      <ColorsPicker />
      <Divider type={"vertical"} style={{height: '100%'}}/>
      <Splitter>
        <Splitter.Panel className={styles.profileFormSplitter}>
          <ProfileForm />
        </Splitter.Panel>

        <Splitter.Panel className={styles.previewSplitter}>
          <Preview />
        </Splitter.Panel>
      </Splitter>
    </Flex>
  );
};
