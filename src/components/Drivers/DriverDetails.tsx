import { Grid, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/system";
import { useCustomTheme } from "../../hooks/useCustomTheme";
import Flag from "../Flag/Flag";
import type { Driver } from "../../common/types";

export const DriverDetails = ({ driver }: { driver: Driver }) => {
	const theme = useCustomTheme();
	const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

	return (
		<Grid
			container
			spacing={2}
			sx={{ fontSize: "1.5em", fontWeight: "bold" }}
			alignItems="center"
		>
			<Grid item>
				<Typography variant="h2">
					{driver.givenName} {driver.familyName}
				</Typography>
			</Grid>
			{isMdUp && (
				<>
					<Grid item>
						<Flag nationality={driver.nationality} size={48} />
					</Grid>
					<Grid item xs />
					<Grid item>{driver.code}</Grid>
					<Grid item sx={{ fontFamily: "Racing Sans One", fontSize: "1.1em" }}>
						{driver.permanentNumber}
					</Grid>
				</>
			)}
		</Grid>
	);
};
