import { AppBar, Toolbar, IconButton, Typography } from "@mui/material"
import { borderRadius, Box } from "@mui/system"
import { Input } from "@mui/material"
import { Height } from "@mui/icons-material"

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Landing(){
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return(<div>
    <AppBar position="static" sx={{background: "rgb(255, 255, 204)"}}>
      <Toolbar>
        <Box component="img" sx={{height:100, width: 200, marginRight: "30%"}} src="https://static.wixstatic.com/media/509b3c_1a2e37a045e749ab90cb338b3451a951~mv2.png/v1/crop/x_345,y_259,w_2720,h_1747/fill/w_558,h_360,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Linguaphile%20Logo%20%26%20font.png" />
        <Input type="search" sx={{background: "white", height: 50, width: 300, borderRadius: 5, border: "5px solid rgb(255, 255, 120)", marginRight: "30%", fontSize: 20, fontWeight: 900, color: "grey"}}/>
        <Box component="img" sx={{height:75, width: 75, margin: 1, borderRadius: 50}} src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw3NjA4Mjc3NHx8ZW58MHx8fHw%3D&w=1000&q=80" />
      </Toolbar>
    </AppBar>
    
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Form Part 1" {...a11yProps(0)} />
        <Tab label="Form Part 2" {...a11yProps(1)} />
        <Tab label="Form Part 3" {...a11yProps(2)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
  </div>)
}
