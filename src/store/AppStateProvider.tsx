import { Backdrop } from "@mui/material";
import type {
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction} from "react";
import {
	createContext,
	useEffect,
	useState,
} from "react";
import type { AppStateType } from "../common/types";

const initializeState = (): AppStateType => {
	const storedAppState = localStorage.getItem("app-state");
	if (storedAppState !== null) {
		return JSON.parse(storedAppState);
	}

	return {
		season: new Date().getFullYear() - 1,
	};
};

export const AppStateContext = createContext<
	[AppStateType, Dispatch<SetStateAction<AppStateType>>]
>([initializeState(), () => null]);

const AppStateProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, setState] = useState<AppStateType>(initializeState());

	useEffect(() => {
		if (state) {
			localStorage.setItem("app-state", JSON.stringify(state));
		}
	}, [state]);

	if (!state) {
		return <Backdrop open />;
	}

	return (
		<AppStateContext.Provider value={[state, setState]}>
			{children}
		</AppStateContext.Provider>
	);
};

export default AppStateProvider;
