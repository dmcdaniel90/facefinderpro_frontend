import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecogniton from './components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg'; 
import './App.css';

const particlesOptions = {
  num: 10,
  type: 'circle',
  bg: true
}
class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      boundingBox: {}
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    this.getClarifaiRequestOptions(this.state.input);
  };

  getClarifaiRequestOptions = (imageURL) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = '4dae22df4ddb443eb15f8a90a63cc4bf';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'dmcdaniel9';       
  const APP_ID = 'smartbrain';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';   
  const IMAGE_URL = imageURL;

  ///////////////////////////////////////////////////////////////////////////////////
  // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
  ///////////////////////////////////////////////////////////////////////////////////

  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };

  fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
    .then(response => response.json())
    .then(result => this.renderFaceBox(this.calculateFaceLocation(result)))
    .catch(error => console.log('error', error));
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height, 
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  renderFaceBox = (boundingBox) => {
    this.setState({boundingBox: boundingBox});
  }

  render() {
    return (
      <div className='App'>
        <ParticlesBg {...particlesOptions}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecogniton imageURL={this.state.imageURL} boundingBox={this.state.boundingBox} />
      </div>
    )
  }
}

export default App;
