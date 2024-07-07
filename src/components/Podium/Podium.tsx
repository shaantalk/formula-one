import { Grid } from "@mui/material";
import type { Race as RaceT } from "../../common/types";
import Place from "./Place";

export default function Podium({ results }: { results: RaceT["Results"] }) {
	if (!results?.length) {
		return null;
	}

	return (
		<Grid container spacing={2} direction={{ xs: "column", sm: "row" }}>
			{[1, 2, 3].map((place) => {
				const result = results[place - 1];
				return (
					result?.Driver && (
						<Grid item key={result.Driver.driverId}>
							<Place driverId={result.Driver.driverId} place={place} />
						</Grid>
					)
				);
			})}
		</Grid>
	);
}
