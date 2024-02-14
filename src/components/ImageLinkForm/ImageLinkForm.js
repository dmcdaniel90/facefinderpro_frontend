import React from "react";
import { useStore } from "../../store";
import { calculateFaceLocation } from "../../utils/calculateFaceLocation";
import getData from "../../utils/getData";
import "./ImageLinkForm.css";

const ImageLinkForm = () => {
  const input = useStore((state) => state.input);
  const setInput = useStore((state) => state.setInput);
  const setImageUrl = useStore((state) => state.setImageUrl);
  const setBoundingBox = useStore((state) => state.setBoundingBox);
  const user = useStore((state) => state.user);
  const setUserEntries = useStore((state) => state.setUserEntries);

  const displayFaceBox = (boundingBox) => {
    setBoundingBox(boundingBox);
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const getDataArgs = {
    input,
    setImageUrl,
    displayFaceBox,
    calculateFaceLocation,
    user,
    setUserEntries,
  };

  const onButtonSubmit = () => {
    getData(getDataArgs);
  };

  return (
    <div>
      <p className="f3">
        {"This Magic Brain will detect faces in your pictures. Give it a try."}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white"
            style={{ backgroundColor: "rgb(217 57 89)" }}
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
