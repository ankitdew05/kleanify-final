import "@mock-api";
import BrowserRouter from "@fuse/core/BrowserRouter";
import FuseLayout from "@fuse/core/FuseLayout";
import FuseTheme from "@fuse/core/FuseTheme";
import { SnackbarProvider } from "notistack";
import { useSelector } from "react-redux";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { selectCurrentLanguageDirection } from "app/store/i18nSlice";
import { selectUser } from "app/store/userSlice";
import themeLayouts from "app/theme-layouts/themeLayouts";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import FuseAuthorization from "@fuse/core/FuseAuthorization";
import { Route, Routes } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import withAppProviders from "./withAppProviders";
import { AuthProvider } from "./auth/AuthContext";
import  PrivateComponent  from "./Components/PrivateComponent";
import  HomePage  from "./Components/HomePage";
import SignInPage from "./Components/SignInPage";
import SignUpPage from "./Components/SignUpPage";
import Forget from "./Components/Forget";
import Reset from "./Components/Reset";
import SignOutPage from "./Components/SignOutPage";
import New from "./Components/New";
import Checkout from "./Components/Checkout";
import ProjectDashboardApp from "./Components/project/ProjectDashboardApp";
import SimplePricingPage from "./Components/simple/SimplePricingPage";
import SuccessPage from "./Components/SuccessPage";
import FailurePage from "./Components/FailurePage"
import ModernPricingPage from "./Components/modern/ModernPricingPage";
// import axios from 'axios';
/**
 * Axios HTTP Request defaults
 */
// axios.defaults.baseURL = "";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

const emotionCacheOptions = {
  rtl: {
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
  ltr: {
    key: "muiltr",
    stylisPlugins: [],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
};

const App = () => {
  
  const langDirection = useSelector(selectCurrentLanguageDirection);
  const mainTheme = useSelector(selectMainTheme);

  return (
    <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
      <FuseTheme theme={mainTheme} direction={langDirection}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<PrivateComponent />}>
              
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/failure" element={<FailurePage />} />
              <Route path="/dashboard" element={<ProjectDashboardApp />} />
              </Route>
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/price" element={<ModernPricingPage />} />
              <Route path="/signup/:id/:period" element={<SignUpPage />} />
              <Route path="/new" element={<New/>} />
              <Route path="/forgot-password" element={<Forget />} />
              <Route path="/reset-password/:id/:token" element={<Reset/>} />
              <Route path="/signout" element={<SignOutPage />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </FuseTheme>
    </CacheProvider>
  );
};

export default withAppProviders(App)();
