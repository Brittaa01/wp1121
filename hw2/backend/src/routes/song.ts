// import {} from "../controllers/lists";
import {
  createSong,
  deleteSong,
  getSong,
  getSongs,
  updateSong,
} from "../controllers/song";
import express from "express";

const router = express.Router();

// GET /api/songs
router.get("/", getSongs);
// GET /api/Song s/:id
router.get("/:id", getSong );
// POST /api/Songs
router.post("/", createSong);
// PUT /api/Song s/:id
router.put("/:id", updateSong);
// DELETE /api/Songs/:id
router.delete("/:id", deleteSong );

// export the router
export default router;
