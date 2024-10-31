import React, { useMemo, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LuggageIcon from "@mui/icons-material/Luggage";

const getBackgroundColor = (gender) => {
  if (gender === "Nam") {
    return ["#4a90e2", "#5dade2", "#48c9b0", "#2980b9", "#2e86de"][
      Math.floor(Math.random() * 5)
    ];
  } else {
    return ["#e74c3c", "#f39c12", "#e67e22", "#d35400", "#e84393"][
      Math.floor(Math.random() * 5)
    ];
  }
};

const UserAvatarWithDropdown = ({
  fullname,
  gender,
  imageUrl,
  showDropdown,
  handleLogout,
  onClick,
  handleMoveYourTrip,
}) => {
  const initials = fullname
    ? fullname
        .split(" ")
        .map((name) => name[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "";

  const backgroundColor = useMemo(() => getBackgroundColor(gender), [gender]);

  return (
    <div>
      <Avatar
        sx={{
          bgcolor: imageUrl ? "transparent" : backgroundColor,
          width: 40,
          height: 40,
          fontSize: 20,
          fontWeight: "bold",
          cursor: "pointer",
        }}
        src={imageUrl || undefined}
        onClick={onClick}
      >
        {!imageUrl && initials}
      </Avatar>

      {showDropdown && (
        <div
          className="user-dropdown"
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "8px",
            color: "black",
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            <li>
              <Link
                to="/profile"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "black",
                  textDecoration: "none",
                  //   justifyContent: "space-between",
                  boxShadow: " 1px 1px 5px 5px #c9c9c9",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: imageUrl ? "transparent" : backgroundColor,
                    width: 40,
                    height: 40,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                  src={imageUrl || undefined}
                >
                  {!imageUrl && initials}
                </Avatar>
                <p style={{ margin: 0 }}>{fullname}</p>
              </Link>
            </li>
            <hr className="mt-1 mb-0" />
            <li
              onClick={handleMoveYourTrip}
              style={{
                cursor: "pointer",
                // marginTop: "10px",
                color: "black",
                // textAlign: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "#c9c9c9",
                  padding: "5px",
                  alignItems: "center",
                  borderRadius: "40%",
                  opacity: "70%",
                }}
              >
                <LuggageIcon />
              </div>

              <span className="ms-3">Chuyến đi của bạn</span>
            </li>
            <hr className="m-0" />
            <li
              onClick={handleLogout}
              style={{
                cursor: "pointer",
                // marginTop: "10px",
                color: "black",
                // textAlign: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "#c9c9c9",
                  padding: "5px",
                  alignItems: "center",
                  borderRadius: "40%",
                  opacity: "70%",
                }}
              >
                <LogoutRoundedIcon />
              </div>
              <span className="ms-3">Đăng xuất</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserAvatarWithDropdown;
