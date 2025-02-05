import { App as AppProvider, theme } from "antd";
import { ConfigProvider } from "antd";

import { useCompact } from "./hooks/useCompact";

import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { Layout } from "./components/Layout/Layout";
import dayjs from "dayjs";

dayjs.extend(LocalizedFormat);

const App = (): React.ReactNode => {
  const { token } = theme.useToken();
  useCompact();

  return (
    <ConfigProvider theme={{ token }}>
      <AppProvider>
        <Layout />
      </AppProvider>
    </ConfigProvider>
  );
};

export default App;
