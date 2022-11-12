import MenuIcon from "@mui/icons-material/Menu";
import { Button, Popover, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../utils/user-info-manage";
const MenuButton = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={(e) => {
          handleClick(e);
          setOpen(!open);
        }}
        style={{ width: 100, height: 70, color: "black" }}
      >
        <MenuIcon style={{ width: 35, height: 35 }} />
      </Button>
      <Popover
        id={open ? "simple-popover" : undefined}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Link to="/login">
          <Button
            style={{ width: "150px", height: "50px" }}
            onClick={() => {
              logout();
            }}
          >
            로그아웃
          </Button>
        </Link>
      </Popover>
    </>
  );
};
export default MenuButton;
