import {
  createDiaryCard,
  getDiaryCards,
  updateDiaryCard,
  deleteDiaryCard,
  getCardByID,
} from "../controllers/mydiary.js";
import express from "express";

// Create an express router
const router = express.Router();

// Every path we define here will get /api/todos prefix
// To make code even more cleaner we can wrap functions in `./controllers` folder

// GET /api/todos
router.get("/", getDiaryCards);
// POST /api/todos
router.post("/", createDiaryCard);
// PUT /api/todos/:id
router.put("/:id", updateDiaryCard);
// DELETE /api/todos/:id
router.delete("/:id", deleteDiaryCard);
router.get("/card/:id", getCardByID);

// export the router
export default router;
