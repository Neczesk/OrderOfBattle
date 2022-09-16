import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// import ButtonGroup from '@mui/material/ButtonGroup';

import FileBar from './FileBar';

function AddChildButton(props){
	const {p_children, onAddItem} = props
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleMenuClick = (event, rel_id) => {
		onAddItem(rel_id)
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				id="add-menu-button"
				onClick={handleClick}
			>
				<AddIcon/> Add
			</Button>
			<Menu
				id="add-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				{Object.entries(p_children).map(([key, value]) => 
					<MenuItem key={key} 
							  onClick={(event) => 
							  	handleMenuClick(event, key)}
						>
						{value.name}
					</MenuItem>
				)}
			</Menu>
		</div>
	);
}

function ChildCard(){
	return(	
		<Grid container xs={12}>
			<Grid xs={1}>
				
			</Grid>
			<Grid xs={11}>
				<Card>
					<CardContent>
						Child Item
					</CardContent>
					<CardActions>
						
					</CardActions>
				</Card>
			</Grid>
		</Grid>)
}

function ListTreeView(){
	const [open, setOpen] = useState(true);

	const handleClick = () => {
		setOpen(!open)
	}
	return (
			<List
				sx={{ width: '1', maxWidth:240, bgcolor: 'background.paper'}}
				component = "nav"
				subheader={
					<ListSubheader component="div" id="treeview-header">
						List Outliner
					</ListSubheader>
				}
			>
				<ListItemButton onClick={handleClick}>
					<ListItemText primary="CorpSec"/>
					{open ? <ExpandLess/> : <ExpandMore/>}
				</ListItemButton>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItemButton sx={{ pl: 4 }}>
							<ListItemText primary="Child 1"/>
						</ListItemButton>
						<ListItemButton sx={{ pl: 4 }}>
							<ListItemText primary="Child 2"/>
						</ListItemButton>
					</List>
				</Collapse>
			</List>
		);
}

function EditList(){
	const [armyList, setArmyList] = useState({})
	const [isLoading, setIsLoading] = useState(true)

	const location = useLocation();

	useEffect(() => {
		setArmyList(location.state.armyList)
		setIsLoading(false)
	}, []);

	const addItem = (rel_id) => {
		setIsLoading(true)
		var requestData = {
			armyList: armyList,
			addedRelID: rel_id
		};
		fetch('/additem', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestData),
		}).then((response) => {
			if (!response.ok) {
				throw new Error('Http Error. Status: ${response.status}');
			}
			return response.json()
		}).catch(console.error)
		.then((data) => {
			setArmyList(data)
			setIsLoading(false)
		});
	}

	const entry_name = isLoading ? <Typography>Loading</Typography>
								 : <Typography variant="h6">{armyList.cursor.item.name}</Typography>

	const entry_desc = isLoading ? <Typography>Loading</Typography>
								 : <Typography>{armyList.cursor.item.desc}</Typography>

	const add_child_button = isLoading ? <Typography>Loading</Typography>
									   : <AddChildButton p_children={armyList.cursor.possible_children} onAddItem={addItem}/>



	return (
		<Box sx={{width: 1}}>
			<Toolbar/>
			<Stack spacing={1}>
				<FileBar/>
				<Grid container spacing={2}>
					<Grid container xs={9}>
						<Grid xs={12}>
							<Card>
								<CardContent>
									{entry_name}
									{entry_desc}
								</CardContent>
								<CardActions>
									{add_child_button}
								</CardActions>
							</Card>
							<ChildCard/>
							<ChildCard/>
						</Grid>
					</Grid>
					<Grid xs={3}>
						<ListTreeView/>
					</Grid>
				</Grid>
			</Stack>
		</Box>

		)
}

export default EditList;