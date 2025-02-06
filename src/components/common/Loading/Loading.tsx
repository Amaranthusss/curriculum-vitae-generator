import { Spin } from "antd";

import styles from "./Loading.module.scss";

export const Loading = (): React.ReactNode => {
  return (
    <div className={styles.container}>
      <Spin size={"large"} />
    </div>
  );
};
