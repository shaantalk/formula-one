import { Alert, Skeleton } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useAppState } from "../../hooks/useAppState";
import type { Responses, Standing } from "../../common/types";
import useCachedAxios from "../../hooks/useCachedAxios";
import {
  getAPIUrl,
  transformConstructorsStandingsData,
} from "../../api/Ergast";
import ConstructorsByLine from "./ConstructorsByLine";

export default function ConstructorsStandingsTable() {
  const [{ season }] = useAppState();
  const [data, setData] = useState<Array<Standing> | undefined>();

  useEffect(() => {
    const dataUrl = getAPIUrl(`/${season}/constructorStandings.json`);
    useCachedAxios
      .get<Responses["ConstructorStandingsByYearResponse"]>(dataUrl)
      .then(transformConstructorsStandingsData)
      .then((results) => {
        setData(results);
      });
  }, [season]);

  if (!data) {
    return <Skeleton variant="rectangular" height={400} />;
  }

  if (data.length === 0) {
    return (
      <Alert variant="outlined" severity="info">
        Constructor Standings Data Not Available
      </Alert>
    );
  }

  return (
    <DataGrid
      rows={data}
      autoHeight
      density="compact"
      // pageSize={10}
      columns={
        [
          {
            field: "code",
            headerName: "Constructor",
            flex: 1,
            renderCell: ({ row }) => (
              <ConstructorsByLine
                id={row.Constructor?.constructorId}
                variant="full"
              />
            ),
          },
          {
            field: "points",
            headerName: "Points",
            type: "number",
          },
        ] as Array<GridColDef<Standing>>
      }
    />
  );
}
