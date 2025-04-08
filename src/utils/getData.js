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
  
  fetch(`${import.meta.env.VITE_BACKEND_URL}/imageurl`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      input: input,
    }),
    mode: "cors",
  })
    .then(async (response) => await response.json())
    .then((response) => {
      if (response) {
        
        fetch(`${import.meta.env.VITE_BACKEND_URL}/image`, {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
          }),
        })
          .then(async (response) => await response.json())
          .then((response) => {
            setUserEntries(response);
          })
          .catch((err) => console.log(err));
      }
      displayFaceBoxes(calculateFaceLocations(response));
    })
    .catch((err) => console.log(err));
}
