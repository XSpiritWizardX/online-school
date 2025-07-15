import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import FooterCard from "../components/Footer/Footer";
import CookieBanner from "../components/CookieBanner/CookieBanner";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <CookieBanner />
      <ModalProvider>
        <Navigation />
        {isLoaded && <Outlet />}
         <FooterCard/>
        <Modal />
      </ModalProvider>
    </>
  );
}
