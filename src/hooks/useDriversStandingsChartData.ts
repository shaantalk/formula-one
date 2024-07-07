import { useMemo } from "react";
import type { Race, ChartSerie } from "../common/types";
import { useColorByConstructorId } from "./useColorByConstructorId";
import { sortRacesByTotal } from "../common/helpers";

export const useDriversStandingsChartData = (
  races: Array<Race> | undefined
) => {
  return useMemo(() => {
    const data: Array<ChartSerie> = [];
    if (races) {
      races.forEach((race) => {
        race.Results?.forEach((result) => {
          let index = data.findIndex(
            (serie) => serie.id === result.Driver?.driverId
          );
          if (result.Driver?.driverId) {
            if (index === -1) {
              const constructorId = result.Constructor?.constructorId;
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const color = useColorByConstructorId(constructorId);
              data.push({
                id: result.Driver?.driverId,
                color,
                data: [],
              });

              index = data.length - 1;
            }

            data[index].data.push({
              x: Number(race.round),
              y: 0,
              total:
                data[index].data.reduce(
                  (total, { data: r }) => Number(r.points) + total,
                  0
                ) + Number(result.points),
              data: result,
            });
          }
        });
      });

      races.forEach((race) => {
        const raceData = data.map((serie) => ({
          round: Number(race.round),
          driverId: serie.id,
          total: serie.data.find((r) => r.x === Number(race.round))?.total || 0,
        }));
        raceData.sort(sortRacesByTotal);

        raceData.forEach((r, index) => {
          const serieIndex = data.findIndex((s) => s.id === r.driverId);
          if (serieIndex !== -1) {
            const roundIndex = data[serieIndex].data.findIndex(
              (d) => d.x === r.round
            );
            if (roundIndex !== -1) {
              data[serieIndex].data[roundIndex].y = index + 1;
            }
          }
        });
      });
    }

    return data;
  }, [races]);
};
