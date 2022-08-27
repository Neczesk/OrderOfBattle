import React from "react";



import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar'

function ViewRulesets() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar/>
      <Typography paragraph>
        These are the rulesets available to make lists for.
      </Typography>
    </Box>
    );
}

export default ViewRulesets;