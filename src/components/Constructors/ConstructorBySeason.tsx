import { Alert, Grid, Skeleton, Typography } from "@mui/material";
import type { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import DriversByLine from "../Drivers/DriversByLine";
import type { ConstructorBySeasonProps, Race } from "../../common/types";
import Link from "../Link";
import useCachedAxios from "../../hooks/useCachedAxios";
import { getAPIUrl, mapSchedule } from "../../api/Ergast";
import { useAppState } from "../../hooks/useAppState";

export default function ConstructorBySeason({
  constructorId,
}: ConstructorBySeasonProps) {
  const [{ season }] = useAppState();
  const [races, setRaces] = useState<Array<Race> | undefined>();

  useEffect(() => {
    const dataUrl = getAPIUrl(
      `/${season}/constructors/${constructorId}/results.json`
    );

    useCachedAxios
      .get(dataUrl)
      .then(mapSchedule)
      .then((races) => {
        setRaces(races);
      });
  }, [season, constructorId]);

  if (!races) {
    return <Skeleton variant="rectangular" height={400} />;
  }

  if (races.length === 0) {
    return (
      <Alert variant="outlined" severity="info">
        Season Data Not Available
      </Alert>
    );
  }

  return (
    <DataGrid
      rows={races}
      rowHeight={72}
      autoHeight
      density="compact"
      getRowId={(row) => row.round || ""}
      columns={
        [
          {
            field: "date",
            headerName: "Date",
            headerAlign: "center",
            type: "date",
            align: "center",
            renderCell: ({ value }) => new Date(value).toLocaleDateString(),
            valueGetter: (date) => new Date(date),
          },
          {
            field: "raceName",
            headerName: "Race",
            flex: 1,
            renderCell: ({ row, value }) => (
              <Link to={`/race/${season}/${row.round}#${row.raceName}`}>
                {value}
              </Link>
            ),
          },
          {
            field: "driver",
            headerName: "Drivers",
            flex: 1,
            renderCell: ({ row }: GridCellParams<any, Race>) => {
              return (
                <Grid container spacing={0}>
                  {row.Results?.map((result: any) => (
                    <Grid item xs={12} key={result.Driver?.driverId}>
                      <DriversByLine
                        id={result.Driver?.driverId}
                        variant="name"
                      />
                    </Grid>
                  ))}
                </Grid>
              );
            },
          },
          {
            field: "finish",
            headerName: "Finish",
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: GridCellParams<any, Race>) => {
              return (
                <Grid container spacing={0} justifyContent="center">
                  {row.Results?.map((result: any) => (
                    <Grid item xs={12} key={result.Driver?.driverId}>
                      <Typography align="center">{result.position}</Typography>
                    </Grid>
                  ))}
                </Grid>
              );
            },
          },
          {
            field: "points",
            headerName: "Points",
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: GridCellParams<any, Race>) => {
              return (
                <Grid container spacing={0} justifyContent="center">
                  {row.Results?.map((result: any) => (
                    <Grid item xs={12} key={result.Driver?.driverId}>
                      <Typography align="center">{result.points}</Typography>
                    </Grid>
                  ))}
                </Grid>
              );
            },
          },
        ] as Array<GridColDef<Race>>
      }
    />
  );
}
