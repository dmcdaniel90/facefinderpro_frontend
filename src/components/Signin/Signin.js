import { useState } from "react";
import { useStore } from "../../store";

export default function Signin() {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const setRoute = useStore((state) => state.setRoute);
  const setUser = useStore((state) => state.setUser);

  const onEmailChange = (event) => {
    setSignInEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setSignInPassword(event.target.value);
  };

  const onSubmitSignIn = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/signin", {
      //! Change this to your server's URL: 'https://pure-chamber-68409-b6d4e0cc53bb.herokuapp.com/signin'
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          setUser(user);
          setRoute("home");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <article className="br3 ba dark-gray b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 white-80">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0 center">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick={onSubmitSignIn}
            />
          </div>
          <div className="lh-copy mt3">
            <p
              className="f6 link dim white db pointer"
              onClick={() => setRoute("register")}
            >
              Register
            </p>
          </div>
        </form>
      </main>
    </article>
  );
}
