import "./style.css";

const apiKey = "j7tOBnFk5xoG5Jzt7Vu11RD5pMrd5AxL";

const displayContent = () => {
  const main = document.createElement("div");
  const img = document.createElement("img");
  const search = document.createElement("input");
  const fetchBtn = document.createElement("div");

  main.className = "main";
  search.placeholder = "image here...";
  fetchBtn.className = "btn";
  fetchBtn.textContent = "Search image";
  fetchBtn.addEventListener("click", fetchImage);

  main.appendChild(img);
  main.appendChild(search);
  main.appendChild(fetchBtn);
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
        return response.json();
      })
      .then((response) => {
        img.src = response.data.images.original.url;
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

displayContent();
