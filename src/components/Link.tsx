import type { LinkProps as MuiLinkProps } from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import type { FC } from "react";
import type { LinkProps } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

const Link: FC<Omit<MuiLinkProps, "component"> & LinkProps> = (props) => {
	return <MuiLink component={RouterLink} color="secondary" {...props} />;
};

export default Link;
