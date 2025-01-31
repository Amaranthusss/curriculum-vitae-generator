import { App as AppProvider, theme } from "antd";
import { ConfigProvider } from "antd";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { Layout } from "./components/Layout/Layout";
import dayjs from "dayjs";

dayjs.extend(LocalizedFormat);

const App = (): React.ReactNode => {
  const { token } = theme.useToken();

  return (
    <ConfigProvider theme={{ token }}>
      <AppProvider>
        <Layout />
      </AppProvider>
    </ConfigProvider>
  );
};

export default App;
