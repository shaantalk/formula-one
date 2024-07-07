import {
	Backdrop,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Grid,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAPIUrl, transformRaceData } from "../api/Ergast";
import useCachedAxios from "../hooks/useCachedAxios";
import RaceMap from "../components/Schedule/RaceMap";
import type { Responses, RaceState } from "../common/types";
import Podium from "../components/Podium/Podium";
import RaceResults from "../components/RaceResults/RaceResults";
import Qualifying from "../components/Qualifying/Qualifying";
import Laps from "../components/Laps/Laps";

export default function Race() {
	const { season, round } = useParams();
	const [state, setState] = useState<RaceState>({
		race: undefined,
	});

	useEffect(() => {
		if (season && round) {
			useCachedAxios
				.get<Responses["ResultsByYearResponse"]>(
					getAPIUrl(`/${season}/${round}/results.json?limit=2000`)
				)
				.then(transformRaceData)
				.then((data) => {
					setState({ race: data });
				});
		}
	}, [season, round]);

	if (!season || !round) {
		throw new Error("Page Not found");
	}

	if (!state.race) {
		return <Backdrop open />;
	}

	return (
		<Card elevation={0}>
			<CardHeader
				title={state.race.raceName}
				subheader={
					<Typography>
						Round {state.race.round},{" "}
						{new Date(state.race.date || "").toLocaleDateString()}
					</Typography>
				}
				action={<Podium results={state.race.Results} />}
			/>

			<CardContent>
				<Grid container spacing={2}>
					<Grid item xs={12} md={12} lg={12}>
						<Card variant="outlined">
							<CardMedia>
								<RaceMap
									season={season}
									races={[state.race]}
									height={500}
									centerOn={state.race.Circuit?.Location}
									zoom
								/>
							</CardMedia>
							<CardHeader
								title={state.race.Circuit?.circuitName}
								subheader={
									<Typography>
										{state.race.Circuit?.Location?.locality},{" "}
										{state.race.Circuit?.Location?.country}
									</Typography>
								}
							/>
						</Card>
					</Grid>

					<Grid item xs={12} md={12} lg={12}>
						<Card variant="outlined" style={{ marginBottom: "20px" }}>
							<CardHeader title="Race" />
							<CardContent>
								<RaceResults results={state.race.Results} />
							</CardContent>
						</Card>
						<Card variant="outlined" style={{ marginBottom: "20px" }}>
							<CardHeader title="Qualifying" />
							<CardContent>
								<Qualifying season={season} round={round} />
							</CardContent>
						</Card>
						<Card variant="outlined">
							<CardHeader title="Laps" />
							<CardContent>
								<Laps
									season={season}
									round={round}
									results={state.race.Results}
								/>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}
