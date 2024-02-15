export const calculateFaceLocation = (data) => {
  const clarifaiFace = data;
  const image = document.getElementById("inputImage");
  const width = Number(image.width);
  const height = Number(image.height);
  const mappedData = [];

  clarifaiFace.map((face) => {
    mappedData.push({
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - face.right_col * width,
      bottomRow: height - face.bottom_row * height,
    });
  });

  return mappedData;
};
