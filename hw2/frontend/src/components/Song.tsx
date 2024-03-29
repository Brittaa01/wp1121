import { useState } from "react";

import { Paper } from "@mui/material";

import SongDialog from "./SongDialog";

export type SongProps = {
  id: string;
  title: string;
  singer: string;
  url: string;
  listId: string;
};

export default function Song({ id, title, singer, url, listId }: SongProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <button onClick={handleClickOpen} className="text-start">
        <Paper className="flex w-full flex-col p-2" elevation={6}>
          {title}
        </Paper>
      </button>
      <SongDialog
        variant="edit"
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        singer={singer}
        url={url}
        listId={listId}
        songId={id}
      />
    </>
  );
}
