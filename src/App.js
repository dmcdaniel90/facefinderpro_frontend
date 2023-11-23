import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecogniton from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ParticlesBg from 'particles-bg'; 
import './App.css';

const userSession = sessionStorage.getItem('user');

const particlesOptions = {
  num: 10,
  type: 'circle',
  bg: true
}

const initialState = {
  input: '',
  imageURL: '',
  boundingBox: {},
  route: userSession ? 'home' : 'signin',
  isSignedIn: userSession ? true : false,
  user: userSession
    ? JSON.parse(userSession)
    : {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
    sessionStorage.setItem('user', JSON.stringify(data));
  };


  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    this.getClarifaiRequestOptions(this.state.input);
  };

  //on page refresh, update the user session with the latest user data from the database
  componentDidMount() {
    if (this.state.isSignedIn) {
      fetch(`http://localhost:3000/profile/${this.state.user.id}`)
        .then(response => response.json())
        .then(user => {
          if (user && user.id) {
            this.loadUser(user);
          }
        })
        .catch(console.log);
    }
  }

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
    .then(result => {
      this.renderFaceBox(this.calculateFaceLocation(result))

      return fetch('http://localhost:3000/image', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.state.user.id
        })
      })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, { entries: count }))
      })
      .catch(err => console.log(err))
    })
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

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
      sessionStorage.removeItem('user');
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    
    this.setState({ route: route });
  }


  render() {
    const { isSignedIn, imageURL, boundingBox, route } = this.state
    
    return (
      <div className='App'>
        <ParticlesBg {...particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {route === 'home'
        ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecogniton imageURL={imageURL} boundingBox={boundingBox} />
          </div>
          : (
            route === 'signin' || route === 'signout'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    )
  }
}

export default App;
