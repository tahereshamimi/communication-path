import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default function ToggleColorMode({
  children,
}: {
  children: React.ReactElement;
}) {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        direction: "rtl",
        palette: {
          mode,
          secondary: {
            light: "rgb(244, 246, 248)",
            main: "rgb(244, 246, 248)",
            dark: "rgb(52, 61, 72)",
            contrastText: "#ffcc00",
          },
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              elevation1: {
                padding: 24,
                borderRadius: 16,
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
