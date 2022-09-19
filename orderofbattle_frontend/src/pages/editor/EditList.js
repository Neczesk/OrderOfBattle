import React, {useState, useEffect} from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';



// import ButtonGroup from '@mui/material/ButtonGroup';

import FileBar from './FileBar';
import AddChildButton from './AddChildButton';
import ChildCard from './ChildCard';
import ListTreeView from './ListTreeView';





function EditList(){
	const [armyList, setArmyList] = useState({})
	const [isLoading, setIsLoading] = useState(true)

  async function getArmyList() {
      try {
          setIsLoading(true);
          const result = await fetch('/getarmylist')
          const parsed = await result.json()
          setArmyList(parsed)
      } catch (e) {
          alert(e);
      } finally {
          setIsLoading(false)
      }
  }

	useEffect(() => {
		getArmyList()
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

	const removeEntry = (entry_id) => {
		setIsLoading(true)
		var requestData = {
			armyList: armyList,
			removedEntryID: entry_id
		};
		fetch('/removeentry', {
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
								 : <Typography variant="h6">{armyList.cursor_info.item.name}</Typography>

	const entry_desc = isLoading ? <Typography>Loading</Typography>
								 : <Typography>{armyList.cursor_info.item.desc}</Typography>

	const add_child_button = isLoading ? <Typography>Loading</Typography>
									   : <AddChildButton p_children={armyList.cursor_info.possible_children} onAddItem={addItem}/>

	const entry_children = isLoading ? <Typography>Loading</Typography>
									 : Object.entries(armyList.cursor_info.children).map(([key, value]) =>
													<ChildCard 
														entry_name={value.item.name}
														entry_desc={value.item.desc}
														onRemoveChild={() =>
															removeEntry(key)}
														key={key}/>
										)

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
							{entry_children}
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