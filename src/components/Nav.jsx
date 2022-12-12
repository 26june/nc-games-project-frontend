import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LoggedInAs } from "../context/LoggedInAs";

import "../style/Nav.css";

import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
} from "@mui/material";

//Icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SwitchAccountOutlinedIcon from "@mui/icons-material/SwitchAccountOutlined";

export default function Nav() {
  const { loggedInAs, setLoggedInAs } = useContext(LoggedInAs);

  const { username, name, avatar_url } = loggedInAs;

  const [drawerState, setDrawerState] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="test-container">
      <Box
        sx={{
          width: "100%",
          height: "10vh",
          //   backgroundColor: "white",
          color: "primary.main",
        }}
        display="flex"
        justifyContent={"space-between"}
        padding={"10px"}
        alignItems={"center"}
      >
        <IconButton
          onClick={() => {
            navigate("/");
          }}
          color="primary"
        >
          <HomeOutlinedIcon></HomeOutlinedIcon>
        </IconButton>
        NC GAMES REVIEW
        <IconButton
          color="primary"
          onClick={() => {
            setDrawerState(true);
          }}
        >
          <PersonOutlineOutlinedIcon></PersonOutlineOutlinedIcon>
        </IconButton>
        <Drawer
          open={drawerState}
          anchor="right"
          onClose={() => {
            setDrawerState(false);
          }}
        >
          <div className="user-drawer-container">
            <Avatar
              src={avatar_url}
              alt={name}
              sx={{ border: "1px solid black" }}
            ></Avatar>
            <h3>{name}</h3>
            <h4>{username}</h4>
            <Divider sx={{ color: "primary.main" }}></Divider>
            <Button
              startIcon={
                <SwitchAccountOutlinedIcon></SwitchAccountOutlinedIcon>
              }
              variant="contained"
              onClick={() => {
                setLoggedInAs(null);
              }}
            >
              Switch User
            </Button>
          </div>
        </Drawer>
      </Box>
    </div>
  );
}
