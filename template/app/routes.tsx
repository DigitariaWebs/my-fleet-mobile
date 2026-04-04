import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./screens/Home";
import Splash from "./screens/Splash";
import Onboarding from "./screens/Onboarding";
import Auth from "./screens/Auth";
import OTP from "./screens/OTP";
import KYC from "./screens/KYC";
import AgencyList from "./screens/AgencyList";
import AgencyDetail from "./screens/AgencyDetail";
import VehicleDetail from "./screens/VehicleDetail";
import Booking from "./screens/Booking";
import Payment from "./screens/Payment";
import Confirmation from "./screens/Confirmation";
import Tracking from "./screens/Tracking";
import TrackingMap from "./screens/TrackingMap";
import Messagerie from "./screens/Messagerie";
import Call from "./screens/Call";
import DamageReport from "./screens/DamageReport";
import Review from "./screens/Review";
import Profile from "./screens/Profile";
import Bookings from "./screens/Bookings";
import Notifications from "./screens/Notifications";
import Search from "./screens/Search";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Splash },
      { path: "onboarding", Component: Onboarding },
      { path: "auth", Component: Auth },
      { path: "otp", Component: OTP },
      { path: "kyc", Component: KYC },
      { path: "home", Component: Home },
      { path: "search", Component: Search },
      { path: "agencies", Component: AgencyList },
      { path: "agency/:id", Component: AgencyDetail },
      { path: "vehicle/:id", Component: VehicleDetail },
      { path: "booking/:id", Component: Booking },
      { path: "payment", Component: Payment },
      { path: "confirmation/:id", Component: Confirmation },
      { path: "tracking/:id", Component: Tracking },
      { path: "tracking-map/:id", Component: TrackingMap },
      { path: "messagerie/:id", Component: Messagerie },
      { path: "call/:id", Component: Call },
      { path: "damage/:id", Component: DamageReport },
      { path: "review/:id", Component: Review },
      { path: "profile", Component: Profile },
      { path: "bookings", Component: Bookings },
      { path: "notifications", Component: Notifications },
    ],
  },
]);