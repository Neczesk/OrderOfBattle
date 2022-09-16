import React from 'react';

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