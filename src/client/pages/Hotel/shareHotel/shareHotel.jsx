import React, { useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";
import { Share2, Copy, CheckCircle, Globe } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import { IconButton, Tooltip } from "@mui/material";

const HotelShareComponent = ({ hotel }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `http://localhost:5050/hotel-page/${hotel.hotel_id}`;
  const shareTitle = `Kiểm tra khách sạn này: ${hotel.name}`;

  const copyLink = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        enqueueSnackbar("Link đã được sao chép", {
          variant: "success",
          autoHideDuration: 2000,
        });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Không thể sao chép link:", err);
        enqueueSnackbar("Có lỗi xảy ra khi sao chép link", {
          variant: "error",
          autoHideDuration: 2000,
        });
      });
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: shareTitle,
          text: `Kiểm tra khách sạn: ${hotel.name}`,
          url: shareUrl,
        })
    } else {
      enqueueSnackbar("Trình duyệt của bạn không hỗ trợ chức năng chia sẻ", {
        variant: "info",
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <div className="card shadow-lg mx-auto" style={{ maxWidth: "50rem" }}>
      <div className="card-body" style={{ height: "15rem" }}>
        <div className="d-flex align-items-center mb-3">
          <div className="me-3" style={{ width: "15rem", height: "3rem" }}>
            <img
              src={hotel.images[0].url || "/placeholder-hotel.png"}
              alt={hotel.name}
              className="img-fluid rounded"
              style={{ width: "400px", height: "200px", objectFit: "cover" }}
            />
          </div>
          <div className="flex-grow-1 overflow-hidden">
            <h5 className="card-title text-truncate mb-1">{hotel.name}</h5>
            <p className="card-text text-muted text-truncate small">
              {hotel.address || "Địa chỉ không xác định"}
            </p>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center gap-2 ms-3">
          <div className="position-relative">
            <Tooltip title="Facebook">
              <IconButton>
                <FacebookShareButton url={shareUrl} quote={shareTitle}>
                  <FacebookIcon size={36} round />
                </FacebookShareButton>
              </IconButton>
            </Tooltip>
          </div>

          <div className="position-relative">
            <Tooltip title="Mail">
              <IconButton>
                <EmailShareButton
                  url={shareUrl}
                  subject={shareTitle}
                  body={`Tôi tìm thấy khách sạn này bạn có thể thích nó: ${shareUrl}`}
                >
                  <EmailIcon size={36} round />
                </EmailShareButton>
              </IconButton>
            </Tooltip>
          </div>

          <div className="position-relative">
            <Tooltip title="Chia sẻ">
              <IconButton>
                <button
                  onClick={handleNativeShare}
                  className="btn btn-link p-0 d-flex align-items-center justify-content-center"
                >
                  <Share2 size={36} className="text-primary" />
                </button>
              </IconButton>
            </Tooltip>
          </div>

          <div className="position-relative">
            <Tooltip title="Sao chép">
              <IconButton>
                <button
                  onClick={copyLink}
                  className="btn btn-light rounded-circle p-2"
                >
                  {copied ? (
                    <CheckCircle color="green" size={20} />
                  ) : (
                    <Copy size={20} className="text-secondary" />
                  )}
                </button>
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelShareComponent;
