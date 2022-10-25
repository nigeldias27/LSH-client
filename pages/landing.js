import styles from "../styles/Home.module.css";
import Card from "@mui/material/Card";
import Link from "next/link";
import { CardContent, Typography, Button } from "@mui/material";
import { Container, Stack } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArticleIcon from "@mui/icons-material/Article";
import DoneIcon from "@mui/icons-material/Done";
import { Input } from "@mui/material";
import { Height } from "@mui/icons-material";
import "@fontsource/questrial"; // Defaults to weight 400.
import { orange } from "@mui/material/colors";
import { useRouter } from "next/router";

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import axios from "axios";

function FormText(props) {

  const router = useRouter();
  if (props.status === "pending") {
    return (
      <div style={{ marginLeft: "3%", marginBottom: "1%"}}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            background: "#ffedd0",
            borderRadius: "10px",
            padding: "2%",
            border: "5px solid #D9BB9B",
            width: '100%',
            paddingRight: '5%',
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", marginRight: "3%" }}
          >
            <ArticleIcon sx={{ fontSize: "84px" }} />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", width: '100%'}}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  fontSize: "32px",
                  fontWeight: "900",
                  overflowX: "auto",
                  width: '100%',
                }}
              >
                {props.label}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: '5%',
                width: '150%',
              }}
            >
              <Box
                sx={{ fontSize: "18px", marginRight: "2%", fontWeight: "700"}}
              >
                created:{" "}
              </Box>
              <Box sx={{ fontSize: "18px"}}>{props.date.substr(0,10)}</Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ErrorOutlineIcon sx={{ color: "red", marginRight: "1%" }} />
              <Box sx={{ fontSize: "16px", color: "red", fontWeight: "700" }}>
                pending
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginTop: "7%",
                marginBottom: "2%",
              }}
            >
              <Box>
                <Button
                  variant="raised"
                  sx={{
                    background: "#D9BB9B",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  Complete Now!
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    );
  }

  if (props.status === "complete") {
    return (
      <div style={{ marginLeft: "3%", marginBottom: "1%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            background: "#ffedd0",
            borderRadius: "10px",
            padding: "2%",
            border: "5px solid #D9BB9B",
            width: '100%',
            paddingRight: '5%',
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", marginRight: "3%" }}
          >
            <ArticleIcon sx={{ fontSize: "84px" }} />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", width: '100%'}}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  fontSize: "32px",
                  fontWeight: "900",
                  overflowX: "auto",
                  width: '100%',
                }}
              >
                {props.label}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: '5%',
                width: '150%',
              }}
            >
              <Box
                sx={{ fontSize: "18px", marginRight: "2%", fontWeight: "700"}}
              >
                created:{" "}
              </Box>
              <Box sx={{ fontSize: "18px"}}>{props.date.substr(0,10)}</Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <DoneIcon sx={{ color: "green", marginRight: "1%" }} />
              <Box sx={{ fontSize: "16px", color: "green", fontWeight: "700" }}>
                complete
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginTop: "7%",
                marginBottom: "2%",
              }}
            >
              <Box>
                <Button
                  variant="raised"
                  sx={{
                    background: "#D9BB9B",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  Download PDF
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    );
  }
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
          <Box>{children}</Box>
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const router = useRouter();
  const navbarStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    background: "#ffedd0 ",
    borderRadius: "10px",
  };
  const pageStyle = {
    // backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/005/145/984/original/office-and-school-stationery-seamless-background-pattern-free-free-vector.jpg")',
    fontFamily: "Questrial"    
  };

  const [value, setValue] = React.useState(0);
  const [pendingForms, setPendingForms] = React.useState([]);
  const [completedForms, setCompletedForms] = React.useState([]);
  const [addButton, setAdd] = React.useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const add = () => {
    router.push("/form/parent");
  };
  React.useEffect(() => {
    fetchForms();
  }, []);
  async function fetchForms() {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}` + "pendingForms",
      { headers: { Authorization: `Bearer ${localStorage.getItem("userID")}` } }
    );
    const data = response.data;
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (data[i] != null) {
        const getUserInfo = await axios.get(
          `${process.env.NEXT_PUBLIC_API}` + "/getUserInfo/" + data[i].user[0],
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userID")}`,
            },
          }
        );
        element.username = getUserInfo.data.email;
      }
    }
    setPendingForms([...data]);
    const respons = await axios.get(
      `${process.env.NEXT_PUBLIC_API}` + "completedForms",
      { headers: { Authorization: `Bearer ${localStorage.getItem("userID")}` } }
    );
    const dat = respons.data;
    for (let i = 0; i < dat.length; i++) {
      const element = dat[i];
      if (dat[i] != null) {
        const getUserInfo = await axios.get(
          `${process.env.NEXT_PUBLIC_API}` + "/getUserInfo/" + dat[i].user[0],
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userID")}`,
            },
          }
        );
        element.username = getUserInfo.data.email;
      }
    }
    setCompletedForms([...dat]);
    console.log(dat);
    const axiosResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API}` + "createForm",
      { headers: { Authorization: `Bearer ${localStorage.getItem("userID")}` } }
    );
    if (axiosResponse.data == "Parent") {
      setAdd(true);
    }
  }
  return (
    <div style={pageStyle}>
      <div className="navbar" style={navbarStyle}>
        <Box
          sx={{
            height: "5%",
            width: "10%",
            marginRight: "25%",
            marginLeft: "1%",
          }}
          component="img"
          src="https://static.wixstatic.com/media/509b3c_1a2e37a045e749ab90cb338b3451a951~mv2.png/v1/crop/x_345,y_259,w_2720,h_1747/fill/w_558,h_360,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Linguaphile%20Logo%20%26%20font.png"
        ></Box>
        <Box sx={{ marginRight: "35%" }}>
          <TextField
            sx={{ width: "150%" }}
            label="Search Linguaphile!"
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
        </Box>
        <Box sx={{ marginRight: "2%" }}>
          <NotificationsIcon style={{ fontSize: "38px" }} />
        </Box>
        <Box
          component="img"
          sx={{ height: "5%", width: "5%", borderRadius: "50%" }}
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw3NjA4Mjc3NHx8ZW58MHx8fHw%3D&w=1000&q=80"
        ></Box>
      </div>

      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "5%",
            marginLeft: "5%",
          }}
        >
          <Box style={{ fontSize: "128px", marginRight: "35%" }}>
            Hello, there!
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {addButton == true ? (
              <IconButton onClick={add}>
                {" "}
                {/* REFERENCE ON ICON BUTTONS: https://muhimasri.com/blogs/how-to-create-mui-icon-button-with-text/ */}
                <AddIcon
                  style={{
                    fontSize: "72px",
                    padding: "20px",
                    background: "#ffe5b4",
                    borderRadius: "50%",
                  }}
                />
              </IconButton>
            ) : (
              <div></div>
            )}
          </Box>
          {/* plus button */}
        </Box>

        <Box sx={{ display: "flex", marginLeft: "3%", marginTop: "3%" }}>
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              sx={{
                "& .MuiTabs-indicator": { backgroundColor: orange[500] },
                "& .MuiTab-root": { color: orange[500] },
                "& .Mui-selected": { color: orange[500] },
              }}
              aria-label="basic tabs example"
            >
              <Tab label="Pending" {...a11yProps(0)} />
              <Tab label="Finished" {...a11yProps(1)} />
            </Tabs>

            <TabPanel
              value={value}
              index={0}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
              >
                {pendingForms.map((v) => {
                  if (v != null) {
                    return (
                      <FormText
                        label={v.username}
                        status="pending"
                        date={v.createdAt}
                        submissionId={v._id}
                      />
                    );
                  }
                })}
              </Box>
            </TabPanel>

            <TabPanel
              value={value}
              index={1}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
              >
                {completedForms.map((v) => {
                  if (v != null) {
                    return (
                      <FormText
                        label={v.username}
                        status="complete"
                        date={v.createdAt}
                      />
                    );
                  }
                })}
              </Box>
            </TabPanel>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
