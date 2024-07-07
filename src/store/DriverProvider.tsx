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
import type { Drivers } from "../common/types";

const initializeState = (): Drivers => {
	return JSON.parse(localStorage.getItem("drivers") || "{}");
};

export const DriverContext = createContext<
	[Drivers, Dispatch<SetStateAction<Drivers>>]
>([initializeState(), () => null]);

const DriverProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, setState] = useState<Drivers>(initializeState());

	useEffect(() => {
		if (state) {
			localStorage.setItem("drivers", JSON.stringify(state));
		}
	}, [state]);

	if (!state) {
		return <Backdrop open />;
	}

	return (
		<DriverContext.Provider value={[state, setState]}>
			{children}
		</DriverContext.Provider>
	);
};

export default DriverProvider;
