/* global axios */
const itemTemplate = document.querySelector("#card-template");
const cardList = document.querySelector("#cards");
const days = ["天", "一", "二", "三", "四", "五", "六"]

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

async function main() {
  setupEventListeners();
  try {
    const cards = await getCards();
    cards.forEach((card) => renderCard(card));
  } catch (error) {
    console.log(error);
    alert("Failed to load todos!");
  }
}

function setupEventListeners() {
  const addDiaryCardButton = document.querySelector("#new-diary-card");

  addDiaryCardButton.addEventListener("click", async () => { 
    
    window.location.assign("mydiarycard.html");
  });

}

function renderCard(card) {
  const item = createCardElement(card);
  cardList.appendChild(item);
}

function createCardElement(card) {
  const item = itemTemplate.content.cloneNode(true);
  const container = item.querySelector(".card");
  container.id = card.id;
  console.log(card);
  container.addEventListener("click", () => {
    window.location.assign("mydiarycard.html?id="+card.id)
  })
  const dateElement = item.querySelector(".date");
  const parts = card.date.split("/");
  console.log(parts);
  const d = new Date(
    parseInt(parts[2], 10),
    parseInt(parts[0], 10) - 1,
    parseInt(parts[1], 10));

  console.log(d);
  const day = d.getDay();


  dateElement.innerText = `${parts[2]}.${parts[0]}.${parts[1]}(${days[day]})`;

  const moodtag = item.querySelector(".moodtag");
  moodtag.innerText = card.moodtag;
  const personaltag = item.querySelector(".personaltag");
  personaltag.innerText = card.personaltag;
  const description = item.querySelector(".description");
  description.innerText = card.description;

  return item;
}

async function getCards() {
  const response = await instance.get("/mydiary");
  return response.data;
}


main();
