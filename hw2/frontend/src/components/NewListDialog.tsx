import { useRef } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import useSongs from "@/hooks/useSongs";
import { createList } from "@/utils/client";

type NewListDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function NewListDialog({ open, onClose }: NewListDialogProps) {
  // using a ref to get the dom element is one way to get the value of a input
  // another way is to use a state variable and update it on change, which can be found in SongDialog.tsx
  const nameTextfieldRef = useRef<HTMLInputElement>(null);
  const descriptionTextfieldRef = useRef<HTMLInputElement>(null);
  const { fetchLists } = useSongs();

  const handleAddList = async () => {
    try {
      await createList({ name: nameTextfieldRef.current?.value ?? "" , description: descriptionTextfieldRef.current?.value ?? ""});
      fetchLists();
    } catch (error) {
      alert("Error: Failed to create list");
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a playlist</DialogTitle>
      <DialogContent>
        <TextField
          inputRef={nameTextfieldRef}
          label="Playist Name"
          variant="outlined"
          sx={{ mt: 2 }}
          
          autoFocus
        />
        <TextField
          inputRef={descriptionTextfieldRef}
          label="Playist Description"
          variant="outlined"
          sx={{ mt: 2 }}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddList}>add</Button>
        <Button onClick={onClose}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
