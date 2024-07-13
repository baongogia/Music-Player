import React from "react";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { Box, Stack, Slider, ThemeProvider, createTheme } from "@mui/material";

function Volume() {
  const theme = createTheme({
    components: {
      MuiSlider: {
        styleOverrides: {
          root: {
            color: "#ff5722",
          },
          thumb: {
            color: "#247a4d",
          },
          track: {
            color: "#247a4d",
          },
          rail: {
            color: "#6eee87",
          },
        },
      },
    },
  });
  // Volume state
  const [value, setValue] = React.useState<number>(50);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <div className="w-[15%] mr-[3em] mt-2">
      <ThemeProvider theme={theme}>
        <Box sx={{ width: 200 }}>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <VolumeDown />
            <Slider aria-label="Volume" value={value} onChange={handleChange} />
            <VolumeUp />
          </Stack>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default Volume;
