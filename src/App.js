//import React, { Component } from 'react';
import { useState } from "react";
import { useStore } from "./store";
import { produce } from "immer";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecogniton from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import ParticlesBg from "particles-bg";
import "./App.css";

const particlesOptions = {
  num: 10,
  type: "circle",
  bg: true,
};

const initialState = {
  input: "",
  imageUrl: "",
  boundingBox: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

export default function App() {
  const input = useStore((state) => state.input);
  const setInput = useStore((state) => state.setInput);

  const [imageUrl, setImageUrl] = useState("");
  const [boundingBox, setBoundingBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({ ...initialState.user });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const logout = () => {
    setUser({ ...initialState.user });
    setBoundingBox(initialState.boundingBox);
    setImageUrl(initialState.imageUrl);
    setInput(initialState.input);
    setIsSignedIn(initialState.isSignedIn);
    setRoute(initialState.route);
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (boundingBox) => {
    setBoundingBox(boundingBox);
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  /**============================================
   **               Promises Fetch
   *=============================================**/
  const onButtonSubmit = async () => {
    setImageUrl(input);
    fetch("http://localhost:3000/imageurl", {
      //! Change this to your server's URL: 'https://pure-chamber-68409-b6d4e0cc53bb.herokuapp.com/imageurl'
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("http://localhost:3000/image", {
            //! Change this to your server's URL: 'https://pure-chamber-68409-b6d4e0cc53bb.herokuapp.com/image'

            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((response) => {
              setUser(
                produce((state) => {
                  state.entries = response.entries;
                }),
              );
            })
            .catch((err) => console.log(err));
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      logout();
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className="App">
      <ParticlesBg {...particlesOptions} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecogniton imageURL={imageUrl} boundingBox={boundingBox} />
        </div>
      ) : route === "signin" || route === "signout" ? (
        <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
}
