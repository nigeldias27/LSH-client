import styles from "../styles/Home.module.css";
import Card from "@mui/material/Card";
import Link from "next/link";
import { CardContent, Typography, Button } from "@mui/material";
import { Container, Stack } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ArrowCircleRightSharpIcon from '@mui/icons-material/ArrowCircleRightSharp';
import ReplayCircleFilledSharpIcon from '@mui/icons-material/ReplayCircleFilledSharp';
import { Input } from "@mui/material"
import { Height } from "@mui/icons-material"

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function FormText(props){
  return(<div style={{marginLeft: "2%", marginBottom: "1%"}}>
    <Box sx={{display: 'flex', flexDirection: 'column', background: '#ffedd0', width: "500px", borderRadius: "10px", padding: "2%"}}>
      <Box sx={{fontSize: "32px", marginBottom: "10px"}}>{props.label}:</Box>
      <TextField label={props.label}></TextField>
      <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
          <IconButton>
          <ArrowCircleRightSharpIcon sx={{fontSize: "48px"}}/>
        </IconButton>
        <IconButton>
          <ReplayCircleFilledSharpIcon sx={{fontSize: "48px"}}/>
        </IconButton>
      </Box>
    </Box>
  </div>)
}

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

export default function Home() {
  const navbarStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    background: '#ffe5b4',
    borderRadius: '10px'
  };
  const pageStyle = {
    background: '#fffdd0',
    margin: "0px",
    // backgroundImage: 'url("https://thumbs.dreamstime.com/b/stationery-background-school-tools-seamless-pattern-art-education-wallpaper-line-icons-pencil-pen-paintbrush-stationery-169250929.jpg")',
    // width: '100%',
    // height: '100%'
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={pageStyle}>
      <div className="navbar" style={navbarStyle}>
        <Box sx={{height: "5%", width: "10%", marginRight: "25%", marginLeft: "1%"}} component="img" src="https://static.wixstatic.com/media/509b3c_1a2e37a045e749ab90cb338b3451a951~mv2.png/v1/crop/x_345,y_259,w_2720,h_1747/fill/w_558,h_360,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Linguaphile%20Logo%20%26%20font.png"></Box>
        <Box sx={{marginRight: "35%"}}>
        <TextField sx={{width: "150%"}}
          label="Search Linguaphile!"
          InputProps={{
            endAdornment: (<SearchIcon/>)
          }}
        />
        </Box>
        <Box sx={{marginRight: "2%"}}><NotificationsIcon style={{fontSize: "38px"}}/></Box>
        <Box component="img" sx={{height: "5%", width: "5%", borderRadius: "50%"}} src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw3NjA4Mjc3NHx8ZW58MHx8fHw%3D&w=1000&q=80"></Box>
      </div>

      <Box>
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: "center", marginTop: "5%", marginLeft: "5%"}}>
          <Box style={{fontSize: "128px", marginRight: "35%", color: "#604C3D"}}>Hello, there!</Box>
          <Box>
              <IconButton> {/* REFERENCE ON ICON BUTTONS: https://muhimasri.com/blogs/how-to-create-mui-icon-button-with-text/ */}
                <SaveAsIcon style={{fontSize: "72px", padding: "20px", background: '#ffe5b4', borderRadius: "50%"}} />
              </IconButton>
            </Box>{/* plus button */}
        </Box>

        <Box sx={{display: "flex", marginLeft: "3%", marginTop: "3%"}}>
          <Box sx={{width: "100%"}}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Pending" {...a11yProps(0)} />
              <Tab label="Finished" {...a11yProps(1)} />
            </Tabs>

            <TabPanel value={value} index={0} sx={{display: 'flex', justifyContent: 'center'}}>
              <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                <FormText label="How do doin?"/>
                <FormText label="How do doin?"/>
                <FormText label="How do doin?"/>
                <FormText label="How do doin?"/>
                <FormText label="How do doin?"/>
              </Box>
            </TabPanel>

            <TabPanel value={value} index={1} sx={{display: 'flex', justifyContent: 'center'}}>
              <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                <FormText label="How do doin?"/>
                <FormText label="How do doin?"/>
                <FormText label="How do doin?"/>
                <FormText label="How do doin?"/>
              </Box>
            </TabPanel>
          </Box>
        </Box>
      </Box>


    </div>
  );
}
