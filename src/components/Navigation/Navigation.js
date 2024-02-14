import { useEffect } from "react";
import { useStore } from "../../store";

const Navigation = () => {
  const isSignedIn = useStore((state) => state.isSignedIn);
  const onRouteChange = useStore((state) => state.setRoute);

  useEffect(() => {
    console.log("isSignedIn: ", isSignedIn);
  }, [isSignedIn]);

  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          className="f3 b link dim white underline pa3 pointer"
          onClick={() => onRouteChange("signout")}
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <div>
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            className="f3 b link dim white underline pa3 pointer"
            onClick={() => onRouteChange("signin")}
          >
            Sign In
          </p>
          <p
            className="f3 b link dim white underline pa3 pointer"
            onClick={() => onRouteChange("register")}
          >
            Register
          </p>
        </nav>
      </div>
    );
  }
};

export default Navigation;
