import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import {logoutUser} from '../redux/auth/Reducer'
import { useDispatch, useSelector } from 'react-redux';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({

	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
}));


export default function AppHeader(props) {
    console.log(props)

	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	let dispatch = useDispatch()
	let auth = useSelector(state => state.Auth)

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	let open = props.open
	let handleDrawerOpen = props.handleDrawerOpen
	let handleAuthDialog = props.handleAuthDialog

	const handleProfileMenuOpen = (event) => {
	setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
	setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
	setAnchorEl(null);
	handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
	setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleLogOut = () => {
		handleMenuClose()
		dispatch(logoutUser())
	}

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
	<Menu
		anchorEl={anchorEl}
		anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		id={menuId}
		keepMounted
		transformOrigin={{ vertical: 'top', horizontal: 'right' }}
		open={isMenuOpen}
		onClose={handleMenuClose}
	>
		{/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
		<MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
		<Divider />
		<MenuItem onClick={handleLogOut}>Log out</MenuItem>

	</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
	<Menu
		anchorEl={mobileMoreAnchorEl}
		anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		id={mobileMenuId}
		keepMounted
		transformOrigin={{ vertical: 'top', horizontal: 'right' }}
		open={isMobileMenuOpen}
		onClose={handleMobileMenuClose}
	>
		<MenuItem onClick={handleAuthDialog}>
		<IconButton
			aria-label="account of current user"
			aria-controls="primary-search-account-menu"
			aria-haspopup="true"
			color="inherit"
		>
			<AccountCircle />
		</IconButton>
		<p>Profile</p>
		</MenuItem>
	</Menu>
	);

	
	return (
	<div className={classes.grow}>

		<AppBar
		position="fixed"
        className={classes.appBar}
		>

		<Toolbar>
			<IconButton
			edge="start"
			className={classes.menuButton}
			color="inherit"
			aria-label="open drawer"
			onClick={handleDrawerOpen}
			>
			<MenuIcon />
			</IconButton>
			<Typography className={classes.title} variant="h6" noWrap>
				<Link to='/' style={{textDecoration: 'none', color: 'white'}}>
					Video Streaming Service
				</Link>
			</Typography>
			{/* <div className={classes.search}>
			<div className={classes.searchIcon}>
				<SearchIcon />
			</div>
			<InputBase
				placeholder="Search…"
				classes={{
				root: classes.inputRoot,
				input: classes.inputInput,
				}}
				inputProps={{ 'aria-label': 'search' }}
			/>
			</div> */}
			<div className={classes.grow} />
			<div className={classes.sectionDesktop}>
			{auth.profile.id ? 
			<IconButton
			edge="end"
			aria-label="account of current user"
			aria-controls={menuId}
			aria-haspopup="true"
			onClick={handleProfileMenuOpen}
			color="inherit"
			>
				<AccountCircle /> <Typography variant="h6" style={{paddingLeft: '5px'}}>{auth.profile.id}</Typography>
			</IconButton>
			:
			<IconButton
				edge="end"
				aria-label="account of current user"
				aria-controls={menuId}
				aria-haspopup="true"
				onClick={handleAuthDialog}
				color="inherit"
			>
				<AccountCircle />
			</IconButton>
			}
			</div>
			<div className={classes.sectionMobile}>
			<IconButton
				aria-label="show more"
				aria-controls={mobileMenuId}
				aria-haspopup="true"
				onClick={handleMobileMenuOpen}
				color="inherit"
			>
				<MoreIcon />
			</IconButton>
			</div>
		</Toolbar>
		</AppBar>
		{renderMobileMenu}
		{renderMenu}
	</div>
	);
}
