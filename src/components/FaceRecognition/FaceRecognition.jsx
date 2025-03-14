import { useStore } from "../../store";
import "./FaceRecognition.css";

const FaceRecognition = () => {
  const imageURL = useStore((state) => state.imageUrl);
  const boundingBoxes = useStore((state) => state.boundingBoxes);

  const faces = boundingBoxes.map((face, i) => {
    return (
      <div
        key={i}
        className="bounding-box"
        style={{
          top: face.topRow,
          bottom: face.bottomRow,
          left: face.leftCol,
          right: face.rightCol,
        }}
      ></div>
    );
  });

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
        {/* Render the bounding boxes for each face */}
        {faces}
      </div>
    </div>
  );
};

export default FaceRecognition;
