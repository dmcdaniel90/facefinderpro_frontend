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

// const initialState = {
//   input: "",
//   imageUrl: "",
//   boundingBox: {},
//   route: "signin",
//   isSignedIn: false,
//   user: {
//     id: "",
//     name: "",
//     email: "",
//     entries: 0,
//     joined: "",
//   },
// };

export default function App() {
  const input = useStore((state) => state.input);
  const setInput = useStore((state) => state.setInput);
  const imageUrl = useStore((state) => state.imageUrl);
  const setImageUrl = useStore((state) => state.setImageUrl);
  const boundingBox = useStore((state) => state.boundingBox);
  const setBoundingBox = useStore((state) => state.setBoundingBox);
  const route = useStore((state) => state.route);
  const setRoute = useStore((state) => state.setRoute);
  const isSignedIn = useStore((state) => state.isSignedIn);
  const setIsSignedIn = useStore((state) => state.setIsSignedIn);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const setUserEntries = useStore((state) => state.setUserEntries);
  const logout = useStore((state) => state.logout);

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
              console.log(response);
              setUserEntries(response);
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
      <Navigation />
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
        <Signin />
      ) : (
        <Register loadUser={setUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
}
