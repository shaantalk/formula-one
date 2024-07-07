import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box, ThemeProvider } from "@mui/material";
import type { FunctionComponent } from "./common/types";
import { useCustomTheme } from "./hooks/useCustomTheme";
import Header from "./components/Header/Header";
import ErrorBoundary from "./components/ErrorBoundary";
import AppStateProvider from "./store/AppStateProvider";
import DriverProvider from "./store/DriverProvider";
import ConstructorProvider from "./store/ConstructorProvider";
import Home from "./pages/Home";
import Race from "./pages/Race";
import DriverProfile from "./pages/DriverProfile";
import ConstructorProfile from "./pages/ConstructorsProfile";

const App = (): FunctionComponent => {
  const theme = useCustomTheme();

  return (
    <AppStateProvider>
      <ConstructorProvider>
        <DriverProvider>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Box
                sx={{
                  position: "fixed",
                  overflow: "auto",
                  scrollbarColor: theme.palette.mode,
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: theme.palette.background.default,
                }}
              >
                <Header />

                <Box component="main" p={2}>
                  <ErrorBoundary>
                    <Routes>
                      <Route element={<Home />} path="/" />
                      <Route
                        element={<ConstructorProfile />}
                        path="/constructor/:id"
                      />
                      <Route element={<DriverProfile />} path="/driver/:id" />
                      <Route element={<Race />} path="/race/:season?/:round?" />
                    </Routes>
                  </ErrorBoundary>
                </Box>
                <footer></footer>
              </Box>
            </BrowserRouter>
          </ThemeProvider>
        </DriverProvider>
      </ConstructorProvider>
    </AppStateProvider>
  );
};

export default App;
