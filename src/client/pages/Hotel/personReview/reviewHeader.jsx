import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Textarea from "@mui/joy/Textarea";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  ListItemDecorator,
  Menu,
} from "@mui/joy";
import { FormLabel, MenuItem } from "@mui/material";
import {
  Check,
  FormatBold,
  FormatItalic,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { parseJwt } from "../../../../utils/Jwt";
import { useAuth } from "../../../../context/AuthContext/AuthProvider";
import { UserService } from "../../../../services/apis/UserService";
import { FeedbackService } from "../../../../services/apis/FeedbackService";

const ReviewHeader = ({ onAddReview, enterpriseId }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const { token } = useAuth();
  const userName = parseJwt(token).sub;
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const data = await UserService.findUserByUsername(userName);
      if (data) {
        setUserId(data.id);
      }
    };
    fetch();
  }, userName);
  const onRatingChange = (rating) => {
    setRating(rating);
  };
  const handleSendFeedBack = async () => {
    const formData = {
      content: reviewText,
      rating: rating,
      userId: userId,
      accountEnterpriseId: enterpriseId,
    };
    try {
      const response = await FeedbackService.createFeedback(formData);
      if (response) {
        onAddReview(response);
        setReviewText("");
        setRating(0);
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
  };
  return (
    <div>
      <FormControl>
        <FormLabel>Phản hồi của bạn</FormLabel>
        <Textarea
          minRows={4}
          maxRows={8}
          placeholder="Nhập phản hồi của bạn tại đây..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          sx={{
            minWidth: 300,
            width: "100%",
          }}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <StarRating onRatingChange={onRatingChange} />

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            size="sm"
            placement="bottom-start"
            sx={{ "--ListItemDecorator-size": "24px" }}
          ></Menu>

          <Button sx={{ ml: "auto" }} onClick={() => handleSendFeedBack()}>
            Gửi phản hồi
          </Button>
        </Box>
      </FormControl>
    </div>
  );
};

export default ReviewHeader;
