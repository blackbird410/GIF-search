import "./style.css";

const apiKey = "j7tOBnFk5xoG5Jzt7Vu11RD5pMrd5AxL";

const displayContent = () => {
  const main = document.createElement("div");
  const img = document.createElement("img");
  const search = document.createElement("input");
  const fetchBtn = document.createElement("div");
  const error = document.createElement("span");

  main.className = "main";
  search.placeholder = "image here...";
  fetchBtn.className = "btn";
  fetchBtn.textContent = "Search image";
  fetchBtn.addEventListener("click", fetchImage);

  main.appendChild(img);
  main.appendChild(search);
  main.appendChild(fetchBtn);
  main.appendChild(error);
  document.body.appendChild(main);
};

const fetchImage = () => {
  const img = document.querySelector("img");
  const search = document.querySelector("input");
  if (img && search.value) {
    fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${search.value}`,
      { mode: "cors" },
    )
      .then((response) => {
        if (!response.ok) {
          let actualError = "";
          switch (response.status) {
            case 401:
              actualError = "API key incorrect";
              break;
            case 404:
              actualError = "Network error";
              break;
            default:
              actualError = "Network response was not OK";
              break;
          }
          throw new Error(actualError);
        }

        return response.json();
      })
      .then((response) => {
        if (!response.data) throw new Error("Image not found");
        img.src = response.data.images.original.url;
        document.querySelector("span").textContent = "";
      })
      .catch((error) => {
        console.error(error);
        document.querySelector("span").textContent = error.message;
      });
  }
};

displayContent();
