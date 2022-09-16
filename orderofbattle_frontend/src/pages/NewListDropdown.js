import React, {useState, useEffect} from 'react';

import {Link, useNavigate} from 'react-router-dom';
import Card from "@mui/material/Card";
import CardActions from '@mui/material/CardContent';
import CardContent from '@mui/material/CardContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';

function NewListDropdown(){
  const [rulesets, setRulesets] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorA, setErrorA] = useState(null)
  const [selectedGame, setSelectedGame] = useState(-1)
  const [newListName, setNewListName] = useState("")
  const [armyList, setArmyList] = useState(null)

  const navigate = useNavigate();

  const toEditList = () => {
  	navigate('/editor/chooseroot', {state: {ruleset: selectedGame, name: newListName}});
  }


  async function getRulesets() {
      try {
          setIsLoading(true);
          const result = await fetch('/getrulesets')
          const parsed = await result.json()
          setRulesets(parsed)
      } catch (e) {
          setErrorA(e)
      } finally {
          setIsLoading(false)
      }
  }

  useEffect(() => {
    getRulesets();
  }, []);

  const handleGameChange = (event) => {
  	setSelectedGame(event.target.value);
  };

  const handleNameChange = (event) => {
  	setNewListName(event.target.value);
  };

  const handleDebugClick = (event) => {
  	alert(newListName)
  }

  function handleCreateListClicked() {
  	toEditList()
  }

  function optionslist(ruleset) {
  		var ruleset_list = []
  		rulesets.forEach(element =>
  			ruleset_list.push(JSON.parse(element)))
  		return (
  			ruleset_list.map((ruleset) =>
  				<option key={ruleset.id} value={ruleset.id}>{ruleset.name}</option>)
  			)
  	}

  if (isLoading) {
  	optionslist = <CircularProgress/>
  } else {
  	optionslist = optionslist(rulesets)
  }

	return (
		<Box sx={{
					width: 1
				}}>
			<Toolbar/>
				<Card>
					<CardContent>
						<Stack spacing={2}>
						<Typography variant="h6">
								Choose the game you're making a list for:
							</Typography>
							<Stack direction="row" spacing={1}>
								<TextField id="rulesetsearch"
										   label="Search Rulesets"
										   type="search"
										   variant="filled"
>
									
								</TextField>
								<FormControl fullWidth>
									<InputLabel variant="standard" htmlFor="uncontrolled-native">
										Ruleset
									</InputLabel>
									<NativeSelect defaultValue={"None"}
												  inputProps={{
												  	name: 'ruleset',
												  	id: 'uncontrolled-native',
												  }}
												  onChange={handleGameChange}
									>
									{optionslist}
									</NativeSelect>
								</FormControl>
							</Stack>
							<TextField id="newlistname"
									   label="List Name"
									   required
									   defaultValue=""
									   variant="filled"
									   onChange={handleNameChange}>
							</TextField>
						</Stack>
					</CardContent>
					<CardActions>
						<Button onClick={handleCreateListClicked}>
							Create List
						</Button>
						<Button onClick={handleDebugClick}>
							Debug Button
						</Button>
					</CardActions>
				</Card>
		</Box>

		)
}

export default NewListDropdown