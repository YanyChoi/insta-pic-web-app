import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const SearchButton = () => {
  return (
    <Link to="/search">
      <Button
        onClick={() => {}}
        style={{ width: 100, height: 70, color: "black" }}
      >
        <SearchIcon style={{ width: 35, height: 35 }} />
      </Button>
    </Link>
  );
};

export default SearchButton;
