import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const RouteProtect = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    GetAndSet();
  }, []);

  const GetAndSet = async () => {
    const token = await Cookies.get("LectureToken");
    const user = await Cookies.get("client");
    // console.log(isLoggedIn);

    if (token && user) setIsLoggedIn(true);
  };

  return isLoggedIn ? children : null;
};

export default RouteProtect;
