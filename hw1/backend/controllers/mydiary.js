import MyDiaryModel from "../models/mydiaryModel.js";

// Get all diary cards
export const getDiaryCards = async (req, res) => {
  try {
    // Find all cards
    const cards = await MyDiaryModel.find({});

    // Return cards
    return res.status(200).json(cards);
  } catch (error) {
    // If there is an error, return 500 and the error message
    // You can read more about HTTP status codes here:
    // https://external-preview.redd.it/VIIvCoTbkXb32niAD-rxG8Yt4UEi1Hx9RXhdHHIagYo.jpg?auto=webp&s=6dde056810f99fc3d8dab920379931cb96034f4b
    return res.status(500).json({ message: error.message });
  }
};
// Create a card
export const createDiaryCard = async (req, res) => {
  const { date, description, moodtag, personaltag } = req.body;

  console.log(req.body);
  // Check title and description
  if (!moodtag || !personaltag || !description) {
    return res
      .status(400)
      .json({ message: "Description, a moodtag and a personal tag are required!" });
  }
  let newDate = date;
  if (!newDate) {
    //date= Date.now().toDateString();
    newDate = new Date().toLocaleDateString();
  }

  // Check if there already exixts a card with this date
  const found_date = await MyDiaryModel.find({ date: newDate });
  console.log(found_date);
  if (found_date.length) {
    return res
      .status(409)
      .json({ message: "Diary entery for this date already exists. Please edit preexisting diary entry" });
  }


  // Create a new card
  try {
    const newCard = await MyDiaryModel.create({
      date: newDate,
      description,
      moodtag,
      personaltag,
    });
    return res.status(201).json(newCard);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a card
export const updateDiaryCard = async (req, res) => {
  const { id } = req.params;
  const { date, description, moodtag, personaltag } = req.body;
  console.log("update");
  try {
    // Check if the id is valid
    const existedDiaryCard = await MyDiaryModel.findById(id);
    if (!existedDiaryCard) {
      return res.status(404).json({ message: "Diary card not found!" });
    }

    // Update the card
    if (date !== undefined) existedDiaryCard.date = date;
    if (description !== undefined) existedDiaryCard.description = description;
    if (moodtag !== undefined) existedDiaryCard.moodtag = moodtag;
    if (personaltag !== undefined) existedDiaryCard.personaltag = personaltag;

    // Save the updated card
    await existedDiaryCard.save();

    // Rename _id to id
    existedDiaryCard.id = existedDiaryCard._id;
    delete existedDiaryCard._id;

    return res.status(200).json(existedDiaryCard);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCardByID = async (req, res) => {
  console.log("hit");
  const { id } = req.params;

  try {
    // Check if the id is valid
    const existedDiaryCard = await MyDiaryModel.findById(id);
    if (!existedDiaryCard) {
      return res.status(404).json({ message: "Diary card not found!" });
    }
    return res.status(200).json(existedDiaryCard);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }

};

// Delete a card
export const deleteDiaryCard = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the id is valid
    const existedDiaryCard = await MyDiaryModel.findById(id);
    if (!existedDiaryCard) {
      return res.status(404).json({ message: "Diary card not found!" });
    }
    // Delete the card
    await MyDiaryModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Diary card deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
