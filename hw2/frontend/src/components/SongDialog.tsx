import { useState } from "react";

import { Delete as DeleteIcon } from "@mui/icons-material";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import useSongs from "@/hooks/useSongs";
import { createSong, deleteSong, updateSong } from "@/utils/client";

// this pattern is called discriminated type unions
// you can read more about it here: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions
// or see it in action: https://www.typescriptlang.org/play#example/discriminate-types
type NewSongDialogProps = {
  variant: "new";
  open: boolean;
  onClose: () => void;
  listId: string;
};

type EditSongDialogProps = {
  variant: "edit";
  open: boolean;
  onClose: () => void;
  listId: string;
  songId: string;
  title: string;
  singer: string;
  url: string;
};

type SongDialogProps = NewSongDialogProps | EditSongDialogProps;

export default function SongDialog(props: SongDialogProps) {
  const { variant, open, onClose, listId } = props;
  const title = variant === "edit" ? props.title : "";
  const singer = variant === "edit" ? props.singer : "";
  const url = variant === "edit" ? props.url : "";

  const [edittingTitle, setEdittingTitle] = useState(variant === "new");
  const [edittingSinger, setEdittingSinger] = useState(variant === "new",
  );
  const [edittingUrl, setEdittingUrl] = useState(variant === "new");

  // using a state variable to store the value of the input, and update it on change is another way to get the value of a input
  // however, this method is not recommended for large forms, as it will cause a re-render on every change
  // you can read more about it here: https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
  const [newTitle, setNewTitle] = useState(title);
  const [newSinger, setNewSinger] = useState(singer);
  const [newUrl, setNewUrl] = useState(url);
  const [newListId, setNewListId] = useState(listId);

  const { lists, fetchSongs } = useSongs();

  const handleClose = () => {
    onClose();
    if (variant === "edit") {
      setNewTitle(title);
      setNewSinger(singer);
      setNewUrl(url);
      setNewListId(listId);
    }
  };

  const handleSave = async () => {
    try {
      if (variant === "new") {
        await createSong({
          title: newTitle,
          singer: newSinger,
          url: newUrl,
          list_id: newListId,
        });
      } else {
        if (
          newTitle === title &&
          newSinger === singer &&
          newUrl === url &&
          newListId === listId
        ) {
          return;
        }
        // typescript is smart enough to know that if variant is not "new", then it must be "edit"
        // therefore props.songId is a valid value
        await updateSong(props.songId, {
          title: newTitle,
          singer: newSinger,
          url: newUrl,
          list_id: newListId,
        });
      }
      fetchSongs();
    } catch (error) {
      alert("Error: Failed to save song");
    } finally {
      handleClose();
    }
  };

  const handleDelete = async () => {
    if (variant !== "edit") {
      return;
    }
    try {
      await deleteSong(props.songId);
      fetchSongs();
    } catch (error) {
      alert("Error: Failed to delete song");
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="flex gap-4">
        {edittingTitle ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEdittingTitle(false);
              }
            }}
          >
            <Input
              autoFocus
              defaultValue={title}
              onChange={(e) => setNewTitle(e.target.value)}
              className="grow"
              placeholder="Enter a title for this song..."
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEdittingTitle(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="text-start">{newTitle}</Typography>
          </button>
        )}
           <Select
          value = {newListId}
          onChange={(e) => setNewListId(e.target.value)}
        >
          {lists.map((list) => (
            <MenuItem value={list.id} key={list.id}>
              {list.name}
            </MenuItem>
          ))}
 
        </Select>
        {variant === "edit" && (
          <IconButton color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent className="w-[600px]">
        {edittingSinger ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEdittingSinger(false);
              }
            }}
          >
            <textarea
              className="bg-white/0 p-2"
              autoFocus
              defaultValue={singer}
              placeholder="Add a singer..."
              onChange={(e) => setNewSinger(e.target.value)}
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEdittingSinger(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="text-start">{newSinger}</Typography>
          </button>
        )}
                {edittingUrl ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEdittingUrl(false);
              }
            }}
          >
            <textarea
              className="bg-white/0 p-2"
              autoFocus
              defaultValue={url}
              placeholder="Add another url"
              onChange={(e) => setNewUrl(e.target.value)}
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEdittingUrl(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="text-start">{newUrl}</Typography>
          </button>
        )}
        <DialogActions>
          <Button onClick={handleSave}>save</Button>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
