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
      personaltag: "Social",
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
    let card = {
      date: existingCard.date,
      moodtag: moodtag.value,
      personaltag: personaltag.value,
      description: description.value,
    };
    if (id) {
      try {
        await updateCard(existingCard.id, card);
        window.location.assign("indexmydiary.html");
      } catch (error) {
        console.log(error);
        alert("Failed to update card! Remeber that the tags you can enter is only Happy, Sad and Angry for mood, and Schoolwork, Clubactivity and Social for the social tag.")
      }
    } else {

      try {
        await saveCard(card);
        window.location.assign("indexmydiary.html");
      } catch (error) {
        if (error.response.status === 409) {
          alert("Diary entry alredy exists for this day! Please edit preexisting card");
        } else {
          console.log(error);
          alert("Failed to save card! Remeber that the tags you can enter is only Happy, Sad and Angry for mood, and Schoolwork, Clubactivity and Social for the social tag.")
        }
      }
    }

  });

  cancelButton.addEventListener("click", async () => {
    if (!id) {
      window.location.assign("indexmydiary.html");
    }
    moodtag.disabled = true;
    personaltag.disabled = true;
    description.disabled = true;
    editDiaryCardButton.disabled = false;
    buttons.hidden = true;
    try {
      const card = await getCard(id);
      createCardElement(card);
    } catch (error) {
      console.log(error);
      alert("Failed to load todos!");
    }
  });

}

function createCardElement(card) {
  const parts = card.date.split("/");
  const d = new Date(
    parseInt(parts[2], 10),
    parseInt(parts[0], 10) - 1,
    parseInt(parts[1], 10));

  const day = d.getDay();
  dateElement.innerText = `${parts[2]}.${addZero(parts[0])}.${addZero(parts[1])}(${days[day]})`;

  moodtag.value = card.moodtag;
  personaltag.value = card.personaltag;
  description.value = card.description;
  return item;
}
//add a zero to the day or month id it is single digit
function addZero(s) {
  if (s.length === 1) {
    return "0" + s;
  } else {
    return s;
  }
}

async function getCard(id) {
  const response = await instance.get("/mydiary/card/" + id);
  return response.data;
}

async function updateCard(id, card) {
  const response = await instance.put("/mydiary/" + id, card);
  return response.data;
}

async function saveCard(card) {
  const response = await instance.post("/mydiary/", card);
  return response.data;
}


main();
