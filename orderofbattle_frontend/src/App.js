import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Toolbar'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';

import ViewListIcon from '@mui/icons-material/ViewList';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';

import Home from "./pages/Home";
import ViewRulesets from "./pages/ViewRulesets";
import NewArmyList from "./pages/NewArmyList";
import NewListDropdown from "./pages/NewListDropdown";
import ChooseRoot from "./pages/editor/ChooseRoot";
import EditList from "./pages/editor/EditList";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        <AppBar  sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} position="fixed">
          <Toolbar>
            <IconButton href="/" size="large" edge="start" color="inherit" aria-label="home" sx={{mr:2}}>
              <HomeIcon/>
            </IconButton>
            <Typography variant="h6" component = "div" sx={{ flexGrow: 1 }}>
              Order of Battle
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <Typography>
              Lists
            </Typography>
            <List>
              <ListItemButton href="/newlistdropdown">
                <ListItemText primary="Create New List"/>
                <ListItemIcon>
                  <AddIcon/>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="View Saved Lists"/>
                <ListItemIcon>
                  <ViewListIcon/>
                </ListItemIcon>
              </ListItemButton>
            </List>
            <Divider />
            <Typography>
              Rulesets
            </Typography>
            <List>
              <ListItemButton>
                <ListItemText primary="Create New Ruleset"/>
                <ListItemIcon>
                  <AddIcon/>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton href="/viewrulesets">
                <ListItemText primary= "View Available Rulesets"/>
                <ListItemIcon>
                  <ViewListIcon/>
                </ListItemIcon>
              </ListItemButton>
            </List>
          </Box>
        </Drawer>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/viewrulesets" element={<ViewRulesets/>}/>
          <Route path="/newarmylist" element={<NewArmyList/>}/>
          <Route path="/newlistdropdown" element={<NewListDropdown/>}/>
          <Route path="/editor/chooseroot" element={<ChooseRoot/>}/>
          <Route path="/editor/editlist" element={<EditList/>}/>
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
