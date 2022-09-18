import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';

import RootDialog from './RootDialog';
import FileBar from './FileBar';

function ChooseRoot(){
	const [armyList, setArmyList] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [rootOpen, setRootOpen] = useState(false)
	const [selRoot, setSelRoot] = useState(null)

	const navigate = useNavigate();

	const toEditList = (selRoot) => {
		var requestData = {
			"listdata": armyList,
			"root_id": selRoot
		};
		fetch('/addroot_experimental', {
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
			setArmyList(data);
			navigate('/editor/editlist', {state: {armyList: data}});		
		})
	};

	const handleAddRoot = () => {
		setRootOpen(true)
	};

	const handleClose = (value) => {
		setRootOpen(false);
		setSelRoot(value);
		toEditList(value);
	};

	useEffect(() => {
		var requestData = {
			"ruleset": location.state.ruleset,
			"name": location.state.name
		};
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

	const mainEditor = isLoading ? <CircularProgress/> : addRootScreen()

	const dialog = 
		isLoading
			? <Typography>Loading</Typography>
			:		<RootDialog 
						onClose={handleClose}
						selRoot={selRoot}
						open={rootOpen}
						rootName={armyList.rules.root_name}
						armyList={armyList}
					/>;

	const army_name = isLoading ? "" : armyList.name
	const ruleset_name = isLoading ? "" : armyList.rules.name

	return (
		<Box sx={{
					width: 1
				}}>
			<Paper>
				<Toolbar/>
				<Stack spacing={0.5}>
					{isLoading
						? <CircularProgress/>
						: <FileBar isLoading={isLoading} list_name={army_name} ruleset_name={ruleset_name}/>}
					{dialog}
					{isLoading
						? <Typography>Loading</Typography>
						: mainEditor}
				</Stack>
			</Paper>
		</Box>


		)
}

export default ChooseRoot