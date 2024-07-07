/*@formatter:off*/
import type {} from "@mui/x-data-grid/themeAugmentation";
/*@formatter:off*/
import { createTheme, useMediaQuery, useTheme } from "@mui/material";
import { blueGrey, deepOrange } from "@mui/material/colors";
import { useMemo } from "react";
import {
	primaryColor,
	secondaryColor,
	darkBackground,
	lightBackground,
	darkBackgroundDefault,
	lightBackgroundDefault,
} from "../common/contants";

export const useCustomTheme = (overrideMode?: "light" | "dark") => {
	const prefersDarkMode =
		(useMediaQuery("(prefers-color-scheme: dark)") &&
			overrideMode !== "light") ||
		overrideMode === "dark";

	return useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? "dark" : "light",
					primary: {
						main: primaryColor,
					},
					secondary: {
						main: secondaryColor,
					},
					background: {
						paper: prefersDarkMode ? darkBackground : lightBackground,
						default: prefersDarkMode
							? darkBackgroundDefault
							: lightBackgroundDefault,
					},
				},
				components: {
					MuiDataGrid: {
						styleOverrides: {
							root: {
								border: 0,
								overflow: "auto",
								"& > .MuiDataGrid-main": {
									overflow: "unset",
								},
								"& > div > .MuiDataGrid-footerContainer": {
									display: "none",
								},
							},
						},
					},
				},
			}),
		[prefersDarkMode]
	);
};

export const useInvertedTheme = () => {
	const theme = useTheme();
	return useCustomTheme(theme.palette.mode === "light" ? "dark" : "light");
};
