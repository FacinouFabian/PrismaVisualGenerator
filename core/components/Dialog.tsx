import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const FormDialog = ({ onValidate }: { onValidate: Function }) => {
  const [open, setOpen] = React.useState(false);
  const [tableName, setTableName] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleValidate = () => {
    onValidate(tableName);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClickOpen}
        className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Table name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Table name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTableName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleValidate}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
