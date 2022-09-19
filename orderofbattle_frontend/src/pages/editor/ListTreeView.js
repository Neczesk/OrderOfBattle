import React, {useState, useEffect} from 'react';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

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

export default ListTreeView;