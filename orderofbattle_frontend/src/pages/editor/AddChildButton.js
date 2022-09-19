import React from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import AddIcon from '@mui/icons-material/Add';

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

export default AddChildButton