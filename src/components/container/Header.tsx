import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../../utils/Theme";

const Header = () => {
  const theme = useTheme();

  const colorMode = useContext(ColorModeContext);

  return (
    <div>
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </div>
  );
};

export default Header;
