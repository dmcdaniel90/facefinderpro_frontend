import { useStore } from "../../store";

const Navigation = () => {
  const isSignedIn = useStore((state) => state.isSignedIn);
  const setRoute = useStore((state) => state.setRoute);
  const logout = useStore((state) => state.logout);

  const handleSignout = () => {
    logout();
    setRoute("signout");
  };

  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          className="f3 b link dim white underline pa3 pointer"
          onClick={handleSignout}
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
            onClick={() => setRoute("signin")}
          >
            Sign In
          </p>
          <p
            className="f3 b link dim white underline pa3 pointer"
            onClick={() => setRoute("register")}
          >
            Register
          </p>
        </nav>
      </div>
    );
  }
};

export default Navigation;
