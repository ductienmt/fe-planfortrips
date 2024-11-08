import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";

export default function EditToolbar({ setOpen, setEditMode }) {
  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        style={{ fontSize: '13px', padding: '4px 5px' }}
        startIcon={<AddIcon />}
        onClick={() => {
          setEditMode(false);
          setOpen(true);
        }}
      >
        Thêm mã giảm
      </Button>
      <GridToolbar />
    </GridToolbarContainer>
  );
}
