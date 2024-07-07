import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	AppBar,
	Grid,
	Toolbar,
	Tooltip,
	Typography,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import Link from "../Link";
import SeasonSelect from "./SeasonSelect";

export default function Header() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<header>
			<nav>
				<AppBar color="primary" sx={{ background: theme.palette.primary.dark }}>
					<Toolbar>
						<Grid container spacing={2} alignItems="center">
							<Grid item>
								<Link to="/" color="inherit" sx={{ textDecoration: "none" }}>
									<Tooltip title="effOne Hub" placement="right">
										<FontAwesomeIcon icon={faFlagCheckered} size="1x" />
									</Tooltip>
								</Link>
							</Grid>
							{!isMobile && (
								<Grid item>
									<Link to="/" color="inherit" sx={{ textDecoration: "none" }}>
										<Typography
											variant="h5"
											component="span"
											sx={{ fontFamily: "Racing Sans One" }}
										>
											Santanu F1
										</Typography>
									</Link>
								</Grid>
							)}
							<Grid item xs />
							<Grid item>
								<Grid container alignItems="center" spacing={1}>
									{!isMobile && (
										<Grid item>
											<Typography
												variant="h6"
												component="span"
												sx={{ fontFamily: "Racing Sans One" }}
											>
												Choose Season
											</Typography>
										</Grid>
									)}
									<Grid item>
										<SeasonSelect />
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
			</nav>
			<Toolbar />
		</header>
	);
}
