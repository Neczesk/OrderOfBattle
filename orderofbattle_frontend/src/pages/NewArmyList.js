import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2


import NewListCards from "./NewListCards"

function NewArmyList() {

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar/>
      <Typography paragraph>
        These are the rulesets available to make lists for.
      </Typography>
      <Grid2 container spacing = {1} sx={{ overflowY: "scroll", maxHeight: "100vh"}}>
        <NewListCards/>
      </Grid2>

    </Box>
    );
}

export default NewArmyList;