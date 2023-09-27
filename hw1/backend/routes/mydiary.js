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

// Every path we define here will get /api/mydiary prefix
// To make code even more cleaner we can wrap functions in `./controllers` folder

// GET /api/mydiary
router.get("/", getDiaryCards);
// POST /api/mydiary
router.post("/", createDiaryCard);
// PUT /api/mydiary/:id
router.put("/:id", updateDiaryCard);
// DELETE /api/mydiary/:id
router.delete("/:id", deleteDiaryCard);
// GET /api/mydiary/:id
router.get("/card/:id", getCardByID);

// export the router
export default router;
