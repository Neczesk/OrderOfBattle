import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar'
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

function NewRuleset() {
    const defaultValue = {
        r_name : "Enter ruleset name",
        r_id : -1,
        r_version : "Enter version here",
        r_desc : "Enter description here",
        r_rootname : "Enter root category here"
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
          ...formValue,
          [name]: value,
        });
      };
    const [formValue, setFormValue] = useState(defaultValue);
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar/>
            <Grid container spacing={1}>
                <Grid item={true} xs={6}>
                    <TextField
                        id="name-input"
                        name="r_name"
                        label="Name"
                        type="text"
                        value={formValue.r_name}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item={true} xs={6}>
                    <TextField
                        disabled
                        id="id-input"
                        name="r_id"
                        label="ID"
                        type="number"
                        value={formValue.r_id}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item={true} xs={6}>
                    <TextField
                        id="version-input"
                        name="r_version"
                        label="Version"
                        type="text"
                        value={formValue.r_version}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="desc-input"
                        name="r_desc"
                        label="Description"
                        type="text"
                        value={formValue.r_desc}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="root-input"
                        name="r_rootname"
                        label="Root Name"
                        type="text"
                        value={formValue.r_rootname}
                        onChange={handleInputChange}
                    />
                </Grid>
            </Grid>

        </Box>

    );
}

export default NewRuleset;