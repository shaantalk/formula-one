import { useMemo } from "react";
import type { Lap, LapByLapProps, LapChartSeries } from "../common/types";
import { useColorByConstructorId } from "./useColorByConstructorId";

const useLapByLapChartData = (
  laps: Array<Lap>,
  results: LapByLapProps["results"]
) =>
  useMemo<Array<LapChartSeries>>(() => {
    const drivers: Array<LapChartSeries> = [];

    if (results) {
      laps.forEach((lap) => {
        lap.Timings.forEach((timing) => {
          let index = drivers.findIndex(
            (driver) => driver.id === timing.driverId
          );
          if (index === -1) {
            const driverResult = results.find(
              (result) => result?.Driver?.driverId === timing.driverId
            );
            drivers.push({
              id: timing.driverId,
              // eslint-disable-next-line react-hooks/rules-of-hooks
              color: useColorByConstructorId(
                driverResult?.Constructor?.constructorId
              ),
              data: [],
            });
            index = drivers.length - 1;
          }

          drivers[index].data.push({
            x: Number(lap.number),
            y: Number(timing.position),
          });
        });

        drivers.forEach((driver, index) => {
          if (!lap.Timings.find((t) => t.driverId === driver.id)) {
            const driverResult = results.find(
              (result) => result?.Driver?.driverId === driver.id
            );
            drivers[index].data.push({
              x: Number(lap.number),
              y: Number(driverResult?.position) || null,
            });
          }
        });
      });
    }

    return drivers;
  }, [laps, results]);

export default useLapByLapChartData;
