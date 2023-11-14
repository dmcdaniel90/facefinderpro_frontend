import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({imageURL, boundingBox}) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputImage" src={imageURL} alt="" width='500px' height='auto' />
        <div
          className="bounding-box"
          style={{
            top: boundingBox.topRow,
            bottom: boundingBox.bottomRow,
            left: boundingBox.leftCol,
            right: boundingBox.rightCol
          }}
        >
        </div>
      </div>
    </div>
  )
}

export default FaceRecognition;