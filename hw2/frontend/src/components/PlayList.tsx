import { useRef, useState } from "react";


import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid';

import useSongs from "@/hooks/useSongs";
import { deleteSong, updateList } from "@/utils/client";



import SongDialog from "./SongDialog";
import {Box, Link, Stack } from "@mui/material";

/* comment*/
export type PlayListProps = {
  id: string;
};

export default function PlayList({ id }: PlayListProps) {
  const [openNewSongDialog, setOpenNewSongDialog] = useState(false);
  const [edittingName, setEdittingName] = useState(false);
  const [edittingDescription, setEdittingDescription] = useState(false);
  const { fetchLists, fetchSongs, lists } = useSongs();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);

  const list = lists.find((list) => list.id === id);


  const handleUpdateName = async () => {
    if (!nameInputRef.current) return;

    const newName = nameInputRef.current.value;
    if (newName !== list!.name) {
      try {
        await updateList(id, { name: newName, description: list!.description });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update list name");
      }
    }
    setEdittingName(false);
  };

  const handleUpdateDescription = async () => {
    if (!descriptionInputRef.current) return;

    const newDescription = descriptionInputRef.current.value;
    if (newDescription !== list!.description) {
      try {
        await updateList(id, { name: list!.name, description: newDescription });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update list description");
      }
    }
    setEdittingDescription(false);
  };

  const handleDelete = async () => {
    const selectedRows = apiRef.current.getSelectedRows();
    if (selectedRows.size === 0) {
      alert("Please select a song");
      return;
    }
    const selectedTitles = Array.from(selectedRows.values()).reduce((accumulator, currentValue) => accumulator + currentValue.title + "\n", "");
    if (confirm("Are you sure you want th delete the songs :" + selectedTitles)) {
      try {
        console.log(apiRef.current.getSelectedRows())
        for (let songId of selectedRows.keys()) {
          console.log(songId);
          await deleteSong(songId.toString());

        }
        fetchSongs();
      } catch (error) {
        alert("Error: Failed to delete song");
      } finally {
      }
    }

  };

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Song', width: 200 },
    { field: 'singer', headerName: 'Singer', width: 400 },
    { field: 'url', headerName: 'Link', width: 500,  renderCell: (params) => (
    <Link href ={`${params.value}`} target="_blank">{params.value} </Link>
  ) },
  ];
  const apiRef = useGridApiRef();

  if (list) {

    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <Stack direction="row" spacing={2}>
            <img
              src="/vite.svg"
              width="200px"
            />
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={2}
            >
              {edittingName ? (
                <ClickAwayListener onClickAway={handleUpdateName}>
                  <Input
                    autoFocus
                    defaultValue={list!.name}
                    className="grow"
                    placeholder="Enter a new name for this list..."
                    sx={{ fontSize: "1rem" }}
                    inputRef={nameInputRef}
                  />
                </ClickAwayListener>
              ) : (
                <button
                  onClick={() => setEdittingName(true)}
                  className="w-full rounded-md p-2 hover:bg-white/10"
                >
                  <Typography className="text-start" variant="h5">
                    {list!.name}
                  </Typography>
                </button>
              )}
              {edittingDescription ? (
                <ClickAwayListener onClickAway={handleUpdateDescription}>
                  <Input
                    autoFocus
                    defaultValue={list.description}
                    className="grow"
                    placeholder="Enter a description for this list..."
                    sx={{ fontSize: "1rem" }}
                    inputRef={descriptionInputRef}
                  />
                </ClickAwayListener>
              ) : (
                <button
                  onClick={() => setEdittingDescription(true)}
                  className="w-full rounded-md p-2 hover:bg-white/10"
                >
                  <Typography className="text-start" variant="h6">
                    {list.description}
                  </Typography>
                </button>
              )}
            </Stack>

          </Stack>

          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}>
              
            <Button
              variant="contained"
              className="w-30"
              onClick={() => setOpenNewSongDialog(true)}
              color="inherit">Add</Button>
            <Button
              variant="contained"
              className="w-30"
              onClick={() => handleDelete()}
              color="inherit">Delete</Button>
          </Stack>

          <DataGrid
            columns={columns}
            rows={list.songs.map((song) => { return { id: song.id, title: song.title, singer: song.singer, url: song.url }; })}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            apiRef={apiRef}
          >

          </DataGrid>

        </Box>
        <SongDialog
          variant="new"
          open={openNewSongDialog}
          onClose={() => setOpenNewSongDialog(false)}
          listId={id}
        />


      </>
    );
  } else {
    return "Error!"
  }
} 
