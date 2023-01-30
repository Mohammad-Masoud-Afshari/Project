// const axios = require("axios");
let game = "war";
let page=1;
function gamesSearcher(game,page) {
  const options = {
    method: "GET",
    url: `https://steam2.p.rapidapi.com/search/${game}/page/${page}`,
    headers: {
      'X-RapidAPI-Key': '44e82f361bmsh2358e4c5e41723ap1dffa0jsn5c348a11ce27',
    'X-RapidAPI-Host': 'steam2.p.rapidapi.com'
    },
  };
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      cardMaker(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}
gamesSearcher(game);
const span = document.querySelector(".span");
const serach = document.querySelector(".search");
const board = document.querySelector(".board");
const searchbtn = document.querySelector(".searchbtn");
const previousPage = document.querySelector(".PreviousPage");
const nextPage = document.querySelector(".NextPage");
const home = document.querySelector(".home");

const cardMaker = (data) => {
  data.forEach((ep) => {
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const p2 = document.createElement("p");
    const h5 = document.createElement("h5");
    const a = document.createElement("a");
    h5.append(ep.title);
    p.innerHTML = ep.reviewSummary;
    p2.innerHTML = ep.price;
    div2.append(ep.released);
    img.src = ep.imgUrl;
    img.alt = h5.innerText;
    img.style.borderRadius = "8px";
    a.href = ep.url;
    a.innerText = "Store Page";
    div.append(img, h5, div2, p, p2, a);
    div.setAttribute("class", "cardm");
    board.append(div);
  });
};

serach.addEventListener("input", (elem) => {
  game = elem.target.value.toLowerCase();
  if (game==""){game="war"}
  game=game.trim();
  game=game.replaceAll(" ","+");
});
searchbtn.addEventListener("click", () => {
  page=1;
  board.innerHTML = "";
  gamesSearcher(game,page);
});
nextPage.addEventListener("click", () => {
  page++;
  board.innerHTML = "";
  gamesSearcher(game,page);
});
previousPage.addEventListener("click", () => {
  page--;
  if(page==0){page=1}
  board.innerHTML = "";
  gamesSearcher(game,page);
});