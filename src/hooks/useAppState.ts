import { useContext } from "react";
import type { AppStateType, SetAppStateType } from "../common/types";
import { AppStateContext } from "../store/AppStateProvider";

export const useAppState = (): [AppStateType, SetAppStateType] => {
	return useContext(AppStateContext);
};
