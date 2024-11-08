import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Card,
  TextField,
  Paper,
  Typography,
} from "@mui/material";
import { Star } from "../../Components/Star";
import { UserService } from "../../../../services/apis/UserService";
export default function FeedbackDetail({ open, setOpen, selectedTicket }) {
  const handleClose = () => {
    setOpen(false);
  };
  const [user, setUser] = useState({});
  useEffect(() => {}, []);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Đánh giá</DialogTitle>
      <DialogContent>
        <Paper style={{ padding: "16px", marginBottom: "16px" }}>
          <Typography variant="h6" gutterBottom>
            Feedback Details
          </Typography>

          <Typography variant="subtitle2" color="textSecondary">
            User:
          </Typography>
          <Typography variant="body1">
            {selectedTicket && selectedTicket.userName
              ? selectedTicket.userName
              : "N/A"}
          </Typography>

          <Typography
            variant="subtitle2"
            color="textSecondary"
            style={{ marginTop: "8px" }}
          >
            Date:
          </Typography>
          <Typography variant="body1">
            {selectedTicket && selectedTicket.createdAt
              ? new Date(selectedTicket.createdAt).toLocaleDateString()
              : "N/A"}
          </Typography>

          <Typography
            variant="subtitle2"
            color="textSecondary"
            style={{ marginTop: "8px" }}
          >
            Rating:
          </Typography>
          <Star
            rating={
              selectedTicket && selectedTicket.rating
                ? selectedTicket.rating
                : 0
            }
          />

          <Typography
            variant="subtitle2"
            color="textSecondary"
            style={{ marginTop: "8px" }}
          >
            Feedback:
          </Typography>
          <Typography variant="body1">
            {selectedTicket && selectedTicket.content
              ? selectedTicket.content
              : "No feedback provided"}
          </Typography>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Thoát
        </Button>
      </DialogActions>
    </Dialog>
  );
}
