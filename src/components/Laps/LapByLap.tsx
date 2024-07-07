import { Box, Skeleton, useMediaQuery } from "@mui/material";
import { ResponsiveBump } from "@nivo/bump";
import type { LapByLapProps } from "../../common/types";
import DriversByLine from "../Drivers/DriversByLine";
import useLapByLapChartData from "../../hooks/useLapByLapChartData";
import { useCustomTheme } from "../../hooks/useCustomTheme";
import { getLapTicks } from "../../common/helpers";

function LapByLap({ laps, results }: LapByLapProps) {
	const theme = useCustomTheme();
	const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
	const data = useLapByLapChartData(laps, results);

	let content = (
		<Skeleton variant="rectangular" sx={{ width: "100%" }} height="100%" />
	);
	if (laps.length > 0) {
		content = (
			<ResponsiveBump
				interpolation="smooth"
				xPadding={0.7}
				data={data}
				colors={({ color }) => color || "transparent"}
				lineWidth={2}
				activeLineWidth={6}
				inactiveLineWidth={3}
				inactiveOpacity={0.35}
				pointSize={0}
				activePointSize={16}
				inactivePointSize={0}
				pointBorderWidth={0}
				pointBorderColor={{ from: "serie.color" }}
				activePointBorderWidth={0}
				// @ts-ignore
				startLabel={({ id }) => (
					<DriversByLine variant={isMdUp ? "name" : "code"} id={id} />
				)}
				endLabel={false}
				enableGridX={false}
				enableGridY={false}
				axisTop={null}
				axisLeft={null}
				axisBottom={{
					tickSize: 0,
					tickPadding: 5,
					tickRotation: 0,
					tickValues: getLapTicks(Number(results?.[0]?.laps)),
				}}
				axisRight={{
					tickSize: 0,
					tickPadding: 10,
					tickRotation: 0,
				}}
				margin={{ top: 0, right: 24, bottom: 24, left: isMdUp ? 100 : 40 }}
				tooltip={() => <></>}
			/>
		);
	}

	return (
		<Box sx={{ height: "60vh", width: "100%" }} aria-hidden>
			{content}
		</Box>
	);
}

export default LapByLap;
