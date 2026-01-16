import type { ReactNode } from "react";
import { useEffect } from "react";
import AuthReduxHook from "../Hook/AuthReduxHook";
import { useNavigate } from "react-router";

export default function AuthRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { authUser } = AuthReduxHook();

  useEffect(() => {
    if (authUser) {
      navigate("/deshboard"); // navigate safely after render
    }
  }, [authUser, navigate]);

  // Optionally, you can show nothing or a loader while redirecting
  if (authUser) {
    return null; // don't render children if redirecting
  }

  return <div>{children}</div>;
}
