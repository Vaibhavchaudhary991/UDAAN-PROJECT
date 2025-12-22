import UserNavbar from "../components/user/UserNavbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <>
      <UserNavbar />
      <Outlet />
      <Footer />
    </>
  );
}
