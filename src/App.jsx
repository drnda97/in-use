import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ConfigProvider } from 'antd';
import { IntlProvider } from "react-intl";

import AppLocale from './languages';

import Router from "./router/Router";
import {getRefreshToken, getTokenData, removeCookies, setTimer} from "./plugins/token-data";

export default function App() {
  // Redux
  const customise = useSelector(state => state.customise)
  const auth = useSelector(state => state.auth)

  // Lang
  const currentAppLocale = AppLocale[customise.language];

  useEffect(() => {
    document.querySelector("html").setAttribute("lang", customise.language);
  }, [customise]);

  useEffect(() => {
    if (getTokenData()) {
      setTimer();
      console.log('odje sam')
    }
    if (!getTokenData() && getRefreshToken()) {
      removeCookies();
      location.reload();
    }
  }, [auth]);

  return (
    <ConfigProvider locale={currentAppLocale.antd} direction={customise.direction}>
      <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
        <Router />
      </IntlProvider>
    </ConfigProvider>
  );
}