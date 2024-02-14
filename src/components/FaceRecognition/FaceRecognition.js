import React from "react";
import { useStore } from "../../store";
import "./FaceRecognition.css";

const FaceRecognition = () => {
  const imageURL = useStore((state) => state.imageUrl);
  const boundingBox = useStore((state) => state.boundingBox);

  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          src={imageURL}
          alt=""
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: boundingBox.topRow,
            bottom: boundingBox.bottomRow,
            left: boundingBox.leftCol,
            right: boundingBox.rightCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
