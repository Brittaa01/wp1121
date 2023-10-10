import { useEffect, useState } from "react";

import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import SongList from "@/components/SongList";
import HeaderBar from "@/components/HeaderBar";
import NewListDialog from "@/components/NewListDialog";
import useSongs from "@/hooks/useSongs";
import PlayList from "./components/PlayList";

function App() {
  const { lists, fetchLists, fetchSongs } = useSongs();
  const [newListDialogOpen, setNewListDialogOpen] = useState(false);
  const [deleteModeActive, setDeleteModeActive] = useState(false);
  const [playlistId, setPlaylistId] = useState("");

  useEffect(() => {
    fetchLists();
    fetchSongs();
  }, [fetchSongs, fetchLists]);


  return (
    <>
      <HeaderBar />
      {playlistId === "" ? (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar sx={{ gap: 2 }}
              >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  My Playlists
                </Typography>
                <Button
                  variant="contained"
                  className="w-30"
                  onClick={() => setNewListDialogOpen(true)}
                  color="inherit">Add</Button>

                {deleteModeActive ? (<Button
                  variant="contained"
                  className="w-30"
                  onClick={() => setDeleteModeActive(false)}
                  color="inherit">Done</Button>
                ) : (<Button
                  variant="contained"
                  className="w-30"
                  onClick={() => setDeleteModeActive(true)}
                  color="inherit">Delete</Button>)}
              </Toolbar>
            </AppBar>
          </Box>
          <main className="mx-auto flex max-h-full flex-row gap-6 px-24 py-12">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {lists.map((list) => (
                <Stack key={list.id} direction="column">
                  <SongList {...list} deleteMode={deleteModeActive} />
                  <Button
                    onClick={() => setPlaylistId(list.id)}
                  > Show
                  </Button>
                </Stack>
              ))}
            </Box>
            <NewListDialog
              open={newListDialogOpen}
              onClose={() => setNewListDialogOpen(false)}
            />
          </main>
        </>) : (

        < PlayList id={playlistId} />

      )}
    </>
  );
}

export default App;
