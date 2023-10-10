import { useRef, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import useSongs from "@/hooks/useSongs";
import { deleteList, updateList } from "@/utils/client";


import type { SongProps } from "./Song";
import SongDialog from "./SongDialog";
import { Chip, Stack } from "@mui/material";

export type SongListProps = {
  length: number;
  id: string;
  name: string;
  songs: SongProps[];
  deleteMode?: boolean;
  description?: string;
};

export default function SongList({ length, id, name, deleteMode }: SongListProps) {
  const [openNewSongDialog, setOpenNewSongDialog] = useState(false);
  const [edittingName, setEdittingName] = useState(false);
  const { fetchLists } = useSongs();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpdateName = async () => {
    if (!inputRef.current) return;

    const newName = inputRef.current.value;
    if (newName !== name) {
      try {
        await updateList(id, { name: newName });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update list name");
      }
    }
    setEdittingName(false);
  };

  const handleDelete = async () => {
    try {
      await deleteList(id);
      fetchLists();
    } catch (error) {
      alert("Error: Failed to delete list");
    }
  };

  return (
    <>
      <Paper className="w-80 p-6">
        <div>
          {deleteMode ? (<IconButton
            color="error"
            sx={{ position: "relative", top: -10, right: -240, zIndex: 2000 }}
            onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>) : null}
        </div>
        <img
          src="/vite.svg"
          width="200px"
        />

        <div className="flex gap-4">
              <Typography className="text-start" variant="h6">
                {name}
              </Typography>
        </div>
        <div className="flex flex-col gap-4">
          {/*{songs.map((song) => (
            <Song key={song.id} {...song} />
          ))}*/}
          <Stack direction="row" spacing={1}>
            <Chip label={length + " Songs"} variant="outlined" />
          </Stack>
          {/*<Button
            variant="contained"
            onClick={() => setOpenNewSongDialog(true)}
          >
            <AddIcon className="mr-2" />
            Add a song
        </Button>*/}
        </div>
      </Paper>
      <SongDialog
        variant="new"
        open={openNewSongDialog}
        onClose={() => setOpenNewSongDialog(false)}
        listId={id}
      />
    </>
  );
}
