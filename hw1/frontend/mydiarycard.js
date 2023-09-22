/* global axios */
var existingCard;
const days = ["天", "一", "二", "三", "四", "五", "六"]
const item = document.querySelector("#diary-card");
const dateElement = item.querySelector(".date");
const moodtag = item.querySelector(".moodtag");
const personaltag = item.querySelector(".personaltag");
const description = item.querySelector(".description");
const buttons = document.getElementById("buttons");
const editDiaryCardButton = document.querySelector("#editbutton");
const saveButton = document.getElementById("save");
const cancelButton = document.getElementById("cancel");
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

async function main() {
  setupEventListeners();
  if (id) {
  try {
    existingCard = await getCard(id);
    console.log(existingCard);
    createCardElement(existingCard);
  } catch (error) {
    console.log(error);
    alert("Failed to load todos!");
  }
} else {
  moodtag.disabled = false;
  personaltag.disabled = false;
  description.disabled = false;
  editDiaryCardButton.disabled = true;
  buttons.hidden = false;

  existingCard = {
      date: new Date().toLocaleDateString(),
      moodtag: "Happy",
      personaltag : "Social",
      description: "Today was a good day!",
    };
    createCardElement(existingCard);
}
}

function setupEventListeners() {

  editDiaryCardButton.addEventListener("click", async () => {
    moodtag.disabled = false;
    personaltag.disabled = false;
    description.disabled = false;
    editDiaryCardButton.disabled = true;
    buttons.hidden = false;

  });

  saveButton.addEventListener("click", async () => {
    console.log(existingCard);
    let card = {
      date: existingCard.date,
      moodtag: moodtag.value,
      personaltag : personaltag.value,
      description: description.value,
    };
    if(id) {
    try {
      await updateCard(existingCard.id, card);
      window.location.assign("indexmydiary.html");
    } catch (error){
      console.log(error);
      alert("Failed to update card! Remeber that the tags you can enter is only Happy, Sad and Angry for mood, and Schoolwork, Clubactivity and Social for the social tag.")
    }
    } else {
      try {
        await saveCard(card);
        window.location.assign("indexmydiary.html");
      } catch (error){
        console.log(error);
        alert("Failed to save card! Remeber that the tags you can enter is only Happy, Sad and Angry for mood, and Schoolwork, Clubactivity and Social for the social tag.")
      }
    }
    
    

  });

  cancelButton.addEventListener("click", async () => {
    moodtag.disabled = true;
    personaltag.disabled = true;
    description.disabled = true;
    editDiaryCardButton.disabled = false;
    buttons.hidden = true;
    try {
      const card = await getCard();
      console.log(card);
      createCardElement(card);
    } catch (error) {
      console.log(error);
      alert("Failed to load todos!");
    }
  });

}

function createCardElement(card) {
  const parts = card.date.split("/");
  console.log(parts);
  const d = new Date(
    parseInt(parts[2], 10),
    parseInt(parts[0], 10) - 1,
    parseInt(parts[1], 10));

  console.log(d);
  const day = d.getDay();
  dateElement.innerText = `${parts[2]}.${parts[0]}.${parts[1]}(${days[day]})`;

  moodtag.value = card.moodtag;
  personaltag.value = card.personaltag;
  description.value = card.description;
  return item;
}

async function getCard(id) {

  //när jag satte den här syntes den, så det är rad68 som är fel
  const response = await instance.get("/mydiary/card/" + id);
  console.log("hit");
  return response.data;
}

async function updateCard(id, card) {
  console.log(id);
  console.log(card);
  const response = await instance.put("/mydiary/"+id, card);
  return response.data;
}

async function saveCard(card) {
  const response = await instance.post("/mydiary/", card);
  return response.data;
}


main();
