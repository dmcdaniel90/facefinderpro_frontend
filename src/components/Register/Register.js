import { useState } from "react";
import { useStore } from "../../store";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const setUser = useStore((state) => state.setUser);
  const setRoute = useStore((state) => state.setRoute);
  const isSignedIn = useStore((state) => state.isSignedIn);

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onSubmitSignIn = (e) => {
    e.preventDefault();

    
    fetch("facefinderpro-production.up.railway.app/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            console.log(error);
          });
        }
        return response.json();
      })
      .then((user) => {
        if (user.id) {
          setUser(user);
          isSignedIn(true);
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
            <legend className="f2 fw6 ph0 mh0 center">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={onNameChange}
              />
            </div>
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
              value="Register"
              onClick={onSubmitSignIn}
            />
          </div>
        </form>
      </main>
    </article>
  );
}
