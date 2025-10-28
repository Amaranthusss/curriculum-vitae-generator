import { App as AppProvider, theme } from "antd";
import { ConfigProvider } from "antd";

import { useCompact } from "./hooks/useCompact";

import LocalizedFormat from "dayjs/plugin/localizedFormat";
import LocaleData from "dayjs/plugin/localeData";

import { Layout } from "./components/Layout/Layout";
import dayjs from "dayjs";
import "./utils/i18n";

import "dayjs/locale/pl";
import "dayjs/locale/en";
import "dayjs/locale/de";

dayjs.extend(LocalizedFormat);
dayjs.extend(LocaleData);

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
