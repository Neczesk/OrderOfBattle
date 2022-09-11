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
	const { onClose, selRoot, open, rootName, armyList } = props;

	const handleClose = () => {
		onClose(selRoot)
	};

	const handleRootChoice = (value) => {
		onClose(parseInt(value));
	};

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>Choose {rootName}</DialogTitle>
			<List sx={{ pt: 0}}>
				{Object.entries(armyList.possible_roots).map(([key, value]) =>
					<ListItem button key={key} onClick={() => handleRootChoice(key)}>
						<ListItemText primary={armyList.items[key].name}/>
					</ListItem>
					)}
			</List>
		</Dialog>
	);
}

export default RootDialog;