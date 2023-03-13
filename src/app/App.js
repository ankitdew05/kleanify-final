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
import { Route, Routes, redirect  } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import withAppProviders from "./withAppProviders";
import { AuthProvider } from "./auth/AuthContext";
import PrivateComponent from "./Components/PrivateComponent";
import HomePage from "./Components/HomePage";
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
import Detail from "./Components/Detail";
import Orders from "./Components/Inbox/orders/Orders";
import Feature from "./Components/feature";
import Basic from "./Components/Inbox/products/Basic";
import Navbar from "./Components/navbar";
import Layout2 from "./theme-layouts/layout2/Layout2";
import Contact from "./Components/Contact";
import Feature2 from "./Components/feature2";
import Feature1 from "./Components/feature1";
import Sidebar1 from "./Components/EmailValidation";
import Sidebar2 from "./Components/BuyCredits";
import EmailValidation from "./Components/EmailValidation";
import Dashboard from "./Components/Dashboard";
import BuyCredits from "./Components/BuyCredits";
import CampaignTest from "./Components/CampaignTest";
import CampaignTestResult from "./Components/CampaignTestResult";
import ListCleaningPage from './Components/ListCleaningPage'
import EmptyListClean from "./Components/EmptyListClean";
import SupportPage from "./Components/SupportPage";
import Setting from "./Components/Setting";
import Planchecker from "./Components/PlanChecker";
import BulkValidation from "./Components/BulkValidation";
import SelectBulkSide from "./Components/SelectBulkSide";

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
                <Route path="/campaign-test" element={<CampaignTest />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/dashboard/:id" element={<ProjectDashboardApp />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/failure" element={<FailurePage />} />
                <Route path="/buy-credits" element={<BuyCredits />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/email-validation" element={<EmailValidation />} />
                <Route path="/campaign-test-result/:id" element={<CampaignTestResult />} />
                <Route path="/list-cleaning" element={<ListCleaningPage />} />
                <Route path="/empty-list-cleaning" element={<EmptyListClean />} />
                <Route path="/onboarding" element={<Detail />} />
                <Route path="/onboarding2" element={<Feature />} />
                <Route path="/onboarding3" element={<Feature2 />} />
                <Route path="/onboarding1" element={<Feature1 />} />
             
                <Route path="/signout" element={<SignOutPage />} />
                <Route path="/support" element={<SupportPage />} />
              </Route>
              <Route path="/signin/:id/:period" element={<SignInPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/pricing" element={<ModernPricingPage />} />
              <Route path="/selectbulk" element={<SelectBulkSide />} />
              <Route path="/planchecker" element={<Planchecker />} />
              <Route path="/bulk-email-validation" element={<BulkValidation />} />
              <Route path="/new" element={<New />} />
              <Route path="/forgot-password" element={<Forget />} />
              <Route path="/reset-password/:id/:token" element={<Reset />} />
              <Route path="/basic" element={<Basic />} />
              <Route path="/signup/:id" element={<SignUpPage />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </FuseTheme>
    </CacheProvider>
  );
};

export default withAppProviders(App)();
