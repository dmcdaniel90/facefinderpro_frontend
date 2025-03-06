export default async function getData(args) {
  const {
    input,
    setImageUrl,
    displayFaceBoxes,
    calculateFaceLocations,
    user,
    setUserEntries,
  } = args;

  setImageUrl(input);
  
  fetch("facefinderpro-production.up.railway.app/imageurl", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      input: input,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response) {
        
        fetch("facefinderpro-production.up.railway.app/image", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            setUserEntries(response);
          })
          .catch((err) => console.log(err));
      }
      displayFaceBoxes(calculateFaceLocations(response));
    })
    .catch((err) => console.log(err));
}
