import { Alert, Card, CardContent, CardHeader, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import type { Lap, LapsProps } from "../../common/types";
import { getAPIUrl, transformLapsData } from "../../api/Ergast";
import useCachedAxios from "../../hooks/useCachedAxios";
import LapByLap from "./LapByLap";
import LapByLapTable from "./LapByLapTable";
import LapTimesTable from "./LapTimesTable";

export default function Laps({ season, round, results }: LapsProps) {
	const [laps, setLaps] = useState<Array<Lap> | undefined>();
	useEffect(() => {
		if (!laps) {
			useCachedAxios
				.get(getAPIUrl(`/${season}/${round}/laps.json`), {
					params: { limit: 2000 },
				})
				.then(transformLapsData)
				.then((laps) => { setLaps(laps); })
				.catch(() => { setLaps([]); });
		}
	}, [laps, round, season]);

	if (!laps) {
		return <Skeleton variant="rectangular" height={400} />;
	}

	if (laps.length === 0) {
		return (
			<Alert variant="outlined" severity="info">
				Lap Data Not Available
			</Alert>
		);
	}

	let content = (
		<Skeleton variant="rectangular" sx={{ width: "100%" }} height="100%" />
	);
	if (laps.length > 0) {
		content = (
			<>
				<Card variant="outlined" style={{ marginBottom: "20px" }}>
					<CardHeader title="Lap by Lap" />
					<CardContent>
						<LapByLap laps={laps} results={results} />
						<LapByLapTable laps={laps} results={results} />
					</CardContent>
				</Card>

				<Card variant="outlined">
					<CardHeader title="Lap Times" />
					<CardContent>
						<LapTimesTable laps={laps} results={results} />
					</CardContent>
				</Card>
			</>
		);
	}

	return content;
}
