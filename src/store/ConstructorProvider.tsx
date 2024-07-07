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
import type { Constructors } from "../common/types";

const LOCAL_STORAGE_KEY = "constructors";

const initializeState = (): Constructors => {
	return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");
};

export const ConstructorContext = createContext<
	[Constructors, Dispatch<SetStateAction<Constructors>>]
>([initializeState(), () => null]);

const ConstructorProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, setState] = useState<Constructors>(initializeState());

	useEffect(() => {
		if (state) {
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
		}
	}, [state]);

	if (!state) {
		return <Backdrop open />;
	}

	return (
		<ConstructorContext.Provider value={[state, setState]}>
			{children}
		</ConstructorContext.Provider>
	);
};

export default ConstructorProvider;
