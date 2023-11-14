import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg'; 
import './App.css';

const particlesOptions = {
  num: 10,
  type: 'circle',
  bg: true
}

class App extends Component {

  render() {
    return (
      <div className='App'>
        <ParticlesBg {...particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* {
        <FaceRecogniton />} */}
      </div>
    )
  }
}

export default App;
