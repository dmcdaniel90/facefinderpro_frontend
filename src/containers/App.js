import { useStore } from "../store";
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import Rank from "../components/Rank/Rank";
import FaceRecogniton from "../components/FaceRecognition/FaceRecognition";
import Signin from "../components/Signin/Signin";
import Register from "../components/Register/Register";
import ParticlesBg from "particles-bg";
import { particlesOptions } from "../utils/particleOptions";
import "./App.css";

export default function App() {
  const route = useStore((state) => state.route);

  return (
    <div className="App">
      <ParticlesBg {...particlesOptions} />
      <Navigation />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm />
          <FaceRecogniton />
        </div>
      ) : route === "signin" || route === "signout" ? (
        <Signin />
      ) : (
        <Register />
      )}
    </div>
  );
}
