import { useState, useEffect } from "react";
import { useRouter } from "next/router";

//<a href="localhost:3000/mypdf.pdf" download></a>

import {
  Container,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Backdrop,
  CircularProgress,
  FormGroup,
  Checkbox,
  Alert,
  AppBar,
  Select,
  Box,
  MenuItem,
  InputLabel,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Navb } from "../../component/navbar";
export default function Form() {
  const [formlist, setFormlist] = useState([]);
  const [open, setOpen] = useState(false);
  const [ind, setInd] = useState(0);
  const router = useRouter();
  const [gotorole, setGotorole] = useState([]);
  const [previousSubmisson, setPreviousSubmission] = useState([]);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    fetchinputs();
  }, [toggle]);

  async function fetchinputs() {
    setOpen(true);
    const { submissionId } = router.query;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}` + "getinputs/" + submissionId,
      { headers: { Authorization: `Bearer ${localStorage.getItem("userID")}` } }
    );
    setOpen(false);
    const data = response.data;

    if (data == "No form") {
      setFormlist([]);
      return;
    }
    if (data == "Verification error") {
      localStorage.removeItem("userID");
      router.push("/login");
      return;
    }

    for (let i = 0; i < data.questions.length; i++) {
      const element = data.questions[i];
      for (let j = 0; j < element.length; j++) {
        const e = element[j];

        if (
          e.input.includes(
            "(Raw score total,typical performance,Probable difference, Definite difference seperated by spaces)"
          ) == true
        ) {
          e.val = "0 0 0 0";
        }
        if (
          e.subheadings[0] ==
          [
            "Frequency",
            "With support",
            "Without support",
            "Priority to be targeted",
          ][0]
        ) {
          if (e.val == "") {
            e.val = "A 0 0 0";
          }
        }
      }
    }
    setFormlist([...data.questions]);
    console.log(formlist);
    setGotorole([...data.goTorole]);
    if (data.previousSubmisson != undefined) {
      setPreviousSubmission(data.previousSubmisson);
    }
  }

  const checkboxChange = (i, myi) => (event) => {
    const optioncheck = JSON.parse(formlist[ind][i].val);
    optioncheck[myi] = event.target.checked;
    formlist[ind][i].val = JSON.stringify(optioncheck);
    setFormlist([...formlist]);
  };

  const handleChange = (prop) => (event) => {
    formlist[ind][prop].val = event.target.value;
    setFormlist([...formlist]);
  };

  const submit = async () => {
    const { submissionId } = router.query;

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}` + "submission/" + submissionId,
      {
        questions: formlist,
        goTorole: gotorole,
        previousSubmisson: previousSubmisson,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("userID")}` } }
    );
    setToggle(toggle == true ? false : true);
  };

  const selectChange = (i, myi) => (event) => {
    var l = formlist[ind][i].val.split(" ");
    l[myi] = event.target.value.toString();
    formlist[ind][i].val = l.join(" ");
    setFormlist([...formlist]);
  };

  const slidingChange = (i, myi) => (event) => {
    var l = formlist[ind][i].val.split(" ");
    l[myi] = event.target.value.toString();
    formlist[ind][i].val = l.join(" ");
    setFormlist([...formlist]);
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://static.vecteezy.com/system/resources/previews/002/735/447/non_2x/school-supplies-and-office-stationary-on-white-background-back-to-school-education-and-business-concept-seamless-pattern-for-banner-poster-office-supply-store-and-wallpaper-free-vector.jpg")',
      }}
    >
      <Navb />
      <Container
        maxWidth="md"
        style={{ paddingTop: "24px", paddingBottom: "24px" }}
      >
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" align="center">
              Getting started with Linguaphile
            </Typography>
            <Stack
              direction={"column"}
              justifyContent="center"
              spacing={7}
              marginTop={3}
            >
              {formlist.length != 0 ? (
                formlist[ind].map((val, i) => {
                  if (val.type == "text") {
                    if (
                      val.input.includes(
                        "(Raw score total,typical performance,Probable difference, Definite difference seperated by spaces)"
                      ) == true
                    ) {
                      if (
                        val.input ==
                        "Sensory seeking(Raw score total,typical performance,Probable difference, Definite difference seperated by spaces)"
                      ) {
                        return (
                          <div>
                            <Grid container spacing={4}>
                              <Grid item xs={3}></Grid>

                              <Grid item xs={2}>
                                <Typography>Raw Score Total</Typography>
                              </Grid>
                              <Grid item xs={2}>
                                <Typography>Typical Performance</Typography>
                              </Grid>
                              <Grid item xs={2}>
                                <Typography>Probable Difference</Typography>
                              </Grid>
                              <Grid item xs={2}>
                                <Typography>Definite Difference</Typography>
                              </Grid>
                            </Grid>

                            <Grid container spacing={4}>
                              <Grid item xs={3}>
                                <Typography>
                                  {val.input.split("(")[0]}
                                </Typography>
                              </Grid>

                              <Grid item xs={2}>
                                <TextField
                                  id="outlined-name"
                                  value={val.val.split(" ")[0]}
                                  onChange={slidingChange(i, 0)}
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <TextField
                                  id="outlined-name"
                                  value={val.val.split(" ")[1]}
                                  onChange={slidingChange(i, 1)}
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <TextField
                                  id="outlined-name"
                                  value={val.val.split(" ")[2]}
                                  onChange={slidingChange(i, 2)}
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <TextField
                                  id="outlined-name"
                                  value={val.val.split(" ")[3]}
                                  onChange={slidingChange(i, 3)}
                                />
                              </Grid>
                            </Grid>
                          </div>
                        );
                      } else {
                        return (
                          <div>
                            <Grid container spacing={4}>
                              <Grid item xs={3}>
                                <Typography>
                                  {val.input.split("(")[0]}
                                </Typography>
                              </Grid>

                              <Grid item xs={2}>
                                <TextField
                                  id="outlined-name"
                                  value={val.val.split(" ")[0]}
                                  onChange={slidingChange(i, 0)}
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <TextField
                                  id="outlined-name"
                                  value={val.val.split(" ")[1]}
                                  onChange={slidingChange(i, 1)}
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <TextField
                                  id="outlined-name"
                                  value={val.val.split(" ")[2]}
                                  onChange={slidingChange(i, 2)}
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <TextField
                                  id="outlined-name"
                                  value={val.val.split(" ")[3]}
                                  onChange={slidingChange(i, 3)}
                                />
                              </Grid>
                            </Grid>
                          </div>
                        );
                      }
                    } else {
                      return (
                        <TextField
                          id="outlined-name"
                          value={val.val}
                          label={`${val.input}`}
                          onChange={handleChange(i)}
                        />
                      );
                    }
                  } else if (val.type == "radio") {
                    if (
                      val.subheadings[0] ==
                      [
                        "Frequency",
                        "With support",
                        "Without support",
                        "Priority to be targeted",
                      ][0]
                    ) {
                      return (
                        <div>
                          <Typography style={{ paddingBottom: "24px" }}>
                            {val.input}
                          </Typography>
                          <Grid container spacing={3}>
                            <Grid item xs={3}>
                              <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">
                                    Frequency
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={val.val.split(" ")[0]}
                                    label="Frequency"
                                    onChange={selectChange(i, 0)}
                                  >
                                    <MenuItem value={"A"}>A</MenuItem>
                                    <MenuItem value={"F"}>F</MenuItem>
                                    <MenuItem value={"O"}>O</MenuItem>
                                    <MenuItem value={"N"}>N</MenuItem>
                                  </Select>
                                </FormControl>
                              </Box>
                            </Grid>
                            <Grid item xs={3}>
                              <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">
                                    With support
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={val.val.split(" ")[1]}
                                    label="With support"
                                    onChange={selectChange(i, 1)}
                                  >
                                    <MenuItem value={"0"}>0</MenuItem>
                                    <MenuItem value={"1"}>1</MenuItem>
                                    <MenuItem value={"2"}>2</MenuItem>
                                    <MenuItem value={"3"}>3</MenuItem>
                                  </Select>
                                </FormControl>
                              </Box>
                            </Grid>
                            <Grid item xs={3}>
                              <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">
                                    Without support
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={val.val.split(" ")[2]}
                                    label="Without support"
                                    onChange={selectChange(i, 2)}
                                  >
                                    <MenuItem value={"0"}>0</MenuItem>
                                    <MenuItem value={"1"}>1</MenuItem>
                                    <MenuItem value={"2"}>2</MenuItem>
                                    <MenuItem value={"3"}>3</MenuItem>
                                  </Select>
                                </FormControl>
                              </Box>
                            </Grid>
                            <Grid item xs={3}>
                              <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">
                                    Priority to be targeted
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={val.val.split(" ")[3]}
                                    label="Priority to be targeted"
                                    onChange={selectChange(i, 3)}
                                  >
                                    <MenuItem value={"0"}>0</MenuItem>
                                    <MenuItem value={"1"}>1</MenuItem>
                                    <MenuItem value={"2"}>2</MenuItem>
                                    <MenuItem value={"3"}>3</MenuItem>
                                  </Select>
                                </FormControl>
                              </Box>
                            </Grid>
                          </Grid>
                        </div>
                      );
                    } else {
                      return (
                        <FormControl>
                          <FormLabel id="demo-radio-buttons-group-label">
                            {val.input}
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                          >
                            {val.subheadings.map((myele) => {
                              return (
                                <FormControlLabel
                                  value={myele}
                                  control={<Radio />}
                                  label={myele}
                                  onChange={handleChange(i)}
                                />
                              );
                            })}
                          </RadioGroup>
                        </FormControl>
                      );
                    }
                  } else if (val.type == "checkbox") {
                    return (
                      <FormControl>
                        <FormLabel>{val.input}</FormLabel>
                        <FormGroup>
                          {val.subheadings.map((myele, myi) => {
                            return (
                              <FormControlLabel
                                control={<Checkbox />}
                                label={myele}
                                onChange={checkboxChange(i, myi)}
                              />
                            );
                          })}
                        </FormGroup>
                      </FormControl>
                    );
                  }
                })
              ) : (
                <Alert severity="info">
                  No form available right now. Check back in later!
                </Alert>
              )}
              {ind + 1 != formlist.length ? (
                formlist.length == 0 ? (
                  <Button
                    disabled
                    variant="contained"
                    onClick={() => {
                      setInd(ind + 1);
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => {
                      setInd(ind + 1);
                    }}
                  >
                    Next
                  </Button>
                )
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    variant="raised"
                    sx={{
                      background: "#D9BB9B",
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                    onClick={async () => {
                      setOpen(true);
                      await submit();
                      setOpen(false);
                      router.push("/landing");
                    }}
                  >
                    Submit
                  </Button>
                </div>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
