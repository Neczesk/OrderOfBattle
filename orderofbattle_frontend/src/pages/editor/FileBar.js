import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';



function FileBar(props){
	const {isLoading, ruleset_name, list_name} = props
	return (
		<Card sx={{width:1}} elevation={2}>
			<CardContent>
				<Typography variant="h6">
					{isLoading
						? ""
						: ruleset_name}
				</Typography>
				<Typography variant="h6">
					{isLoading
						? ""
						: list_name}
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
		</Card>
	)
}

export default FileBar