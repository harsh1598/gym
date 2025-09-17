import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthProtected = (props: any) => {
  // const isAuth = localStorage.getItem("token");
  const isAuth = "true";

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/dashboard", { state: { from: props.location } });
    }
  }, [isAuth, navigate, props.location]);
  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }: any) => {
  return <></>;
};

export { AuthProtected, AccessRoute };
