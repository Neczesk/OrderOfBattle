import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function ChildCard(props){
	const {entry_name, entry_desc, onRemoveChild} = props;
	// const handleRemoveClick = (event, entryID) => {
	// 	onRemoveChild(entryID);
	// }
	return(	
		<Grid container xs={12}>
			<Grid xs={1}>
				
			</Grid>
			<Grid xs={11}>
				<Card>
					<CardContent>
						<Typography variant="h6">{entry_name}</Typography>
						<Typography variant="p">{entry_desc}</Typography>
					</CardContent>
					<CardActions>
						<Button
							>Edit Entry</Button>
						<Button 
							onClick={onRemoveChild}
							>Remove Entry</Button>
					</CardActions>
				</Card>
			</Grid>
		</Grid>)
}

export default ChildCard