import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';

import NewListCards from "./NewListCards"

function NewArmyList() {

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar/>
      <Typography paragraph>
        These are the rulesets available to make lists for.
      </Typography>
      <Stack spacing = {1}>
        <NewListCards/>
      </Stack>

    </Box>
    );
}

export default NewArmyList;