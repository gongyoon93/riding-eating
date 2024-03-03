import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface IProtectRouterProps {
  isAllow: boolean;
  redirectPath: string;
  children?: ReactElement;
}

const ProtectRouter = ({
  isAllow,
  redirectPath,
  children,
}: IProtectRouterProps) => {
  if (!isAllow) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />; //outlet은 상위 컴포넌트를 거쳐서 중첩된 하위 컴포넌트를 단계별로 구성할 때 사용.
};

export default ProtectRouter;
