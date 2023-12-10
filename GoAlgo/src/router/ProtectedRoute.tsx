import { rootStore } from "../stores/RootStore";
import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import Profile from "../pages/Profile";
import { UserApiServiceInstance } from "../app/UserApiService";
import { useEffect, useState } from "react";

const ProtectedRoute = observer(() => {
  const [component, setComponent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    UserApiServiceInstance.getUserData().then((userData) => {
      if (userData !== undefined) {
        rootStore.setUser(userData);
        console.log(userData);
        setComponent(<Profile />);
      } else {
        setComponent(<Navigate to="/login" replace />);
      }
    });
  }, []);

  return component;
});

export default ProtectedRoute;
