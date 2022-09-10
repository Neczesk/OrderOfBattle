import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function RootDialog(props) {
	const { onClose, selRoot, open, rootName } = props;

	const handleClose = () => {
		onClose(selRoot)
	};

	const handleRootChoice = (value) => {
		onClose(value);
	};

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>Choose {rootName}</DialogTitle>
			<List sx={{ pt: 0}}>
				<ListItem button key="2">
					<ListItemText primary="Root 1"/>
				</ListItem>
				<ListItem button key="1">
					<ListItemText primary="Root 2"/>
				</ListItem>
			</List>
		</Dialog>
	);
}

function EditArmyList(){
	const [armyList, setArmyList] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [rootOpen, setRootOpen] = useState(false)
	const [selRoot, setSelRoot] = useState(null)

	const handleAddRoot = () => {
		setRootOpen(true)
	};

	const handleClose = (value) => {
		setRootOpen(false);
		setSelRoot(value);
	};

	useEffect(() => {
		var requestData = {
			"ruleset": location.state.ruleset,
			"name": location.state.name
		}
		fetch('/getemptyarmylist', {
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
		}).then((data) => {
			setArmyList(data)
			setIsLoading(false)
		})
	}, []);
	const location = useLocation();

	function addRootScreen(){
		return(
			<Card>
				<CardContent>
					<Typography>
						Select {armyList.rules.root_name}: 
					</Typography>
				</CardContent>
				<CardActions>
					<Fab color="primary" onClick={handleAddRoot}>
						<AddIcon/>
					</Fab>
				</CardActions>
			</Card>
			)
		}

	const dialog = 
		isLoading
			? <Typography>Loading</Typography>
			:		<RootDialog 
						onClose={handleClose}
						selRoot={selRoot}
						open={rootOpen}
						rootName={armyList.rules.root_name}
					/>;

	return (
		<Box sx={{
					width: 1
				}}>
			<Paper>
				<Toolbar/>
				<Stack spacing={0.5}>
					<Card sx={{width:1}} elevation={2}>
						<CardContent>
							<Typography variant="h6">
								{isLoading
									? ""
									: armyList.rules.name}
							</Typography>
							<Typography variant="h6">
								{isLoading
									? ""
									: armyList.name}
							</Typography>
						</CardContent>
						<CardActions>
							<Stack direction="row" spacing={1}>
								<ButtonGroup variant="outlined">
									<Button>Save List</Button>
									<Button>Rename List</Button>
									<Button>Share List</Button>
									<Button>Export List</Button>
								</ButtonGroup>
							</Stack>
						</CardActions>
					{dialog}
					</Card>
					{isLoading
						? <Typography>Loading</Typography>
						: addRootScreen()}
				</Stack>

				
			</Paper>
		</Box>


		)
}

export default EditArmyList