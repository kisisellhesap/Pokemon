const cardContainer = document.querySelector(".card-container");

const bg_color = {
  grass: "#8BD369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#AABB22",
  normal: "#AAAA99",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF6EA4",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
  dark: "#0F0F0F",
  ghost: "#5F5F5F",
};
let myAllData = [];
const inputSearch = document.querySelector(".input-search");

const getApi = async () => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0`
  );
  const data = await response.json();

  // console.log(data.results);
  for (const elementUrl of data.results) {
    const urlRes = await fetch(elementUrl.url);
    const dataCard = await urlRes.json();

    myAllData.push(dataCard);
  }
  return myAllData;
};

myAllData = await getApi();
// console.log(myAllData);
const displayCard = (filterText) => {
  cardContainer.innerHTML = "";

  const filteredData = myAllData.filter((data) => {
    if (filterText !== "") {
      return data.name.toLowerCase().includes(filterText);
    }

    return true;
  });

  for (const data of filteredData) {
    const pokiImg = data.sprites.front_default;
    const pokiId = data.id;
    const pokiName = data.name;
    const pokiExp = data.base_experience;
    const pokiWeight = data.weight;
    const pokiType = data.types[0].type.name;

    const card = createCard(
      pokiImg,
      pokiId,
      pokiName,
      pokiExp,
      pokiWeight,
      pokiType
    );

    cardContainer.insertAdjacentHTML("beforeend", card);
  }

  cardBgSettings();
};

const createCard = (img, id, name, exp, weight, type) => {
  const card = `    <div class="poki-card">
          <img src="${img}" alt="" />
          <span class="card-id">${id}</span>
          <span class="card-name">${name}</span>
          <div class="card-expWeight">
            <span class="card-exp">${exp} exp</span>
            <span class="card-weight">${weight} kg</span>
          </div>
          <div class="card-type-div">
            <i class="bx bx-leaf"></i>
            <span class="card-type">${type}</span>
          </div>
        </div>`;

  return card;
};

const cardBgSettings = () => {
  for (const element of document.querySelectorAll(".poki-card")) {
    const cardType = element.children[4].children[1].textContent;
    const cardId = element.children[1];
    const cardName = element.children[2];
    const cardExp = element.children[3].children[0];
    const cardWeight = element.children[3].children[1];

    const cardTypeDiv = element.children[4];

    Object.keys(bg_color).filter((key) => {
      if (key == cardType) {
        cardId.style.backgroundColor = bg_color[key];
        cardName.style.backgroundColor = bg_color[key];
        cardExp.style.backgroundColor = bg_color[key];
        cardWeight.style.backgroundColor = bg_color[key];
        cardTypeDiv.style.backgroundColor = bg_color[key];
      }
    });
  }
};

inputSearch.addEventListener("input", function (e) {
  displayCard(e.target.value.trim());
});

displayCard("");
