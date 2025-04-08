import { useState } from "react";
import { useStore } from "../../store";
import { calculateFaceLocations } from "../../utils/calculateFaceLocation";
import getData from "../../utils/getData";
import "./ImageLinkForm.css";

const ImageLinkForm = () => {

  const setImageUrl = useStore((state) => state.setImageUrl);
  const setBoundingBoxes = useStore((state) => state.setBoundingBoxes);
  const user = useStore((state) => state.user);
  const setUserEntries = useStore((state) => state.setUserEntries);

  const [dataArgs, setDataArgs] = useState({
    input: '',
    setImageUrl,
    displayFaceBoxes: (boundingBoxes) => setBoundingBoxes(boundingBoxes),
    calculateFaceLocations,
    user,
    setUserEntries
  });

  const handleChange = (e) => {
    setDataArgs({...dataArgs, input: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    getData(dataArgs);
  };

  return (
    <div>
      <p className="f3 white">
        {"This Magic Brain will detect faces in your pictures. Give it a try."}
      </p>
      <div className="center">
        <form
          className="form center pa4 br3 shadow-5"
          onSubmit={handleSubmit}
        >
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={handleChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white"
            style={{ backgroundColor: "rgb(217 57 89)" }}
            type="submit"
          >
            Detect
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImageLinkForm;
