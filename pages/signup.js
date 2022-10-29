import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Alert,
  FormLabel,
  RadioGroup,
  IconButton,
  Radio,
  FormControlLabel,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Backdrop,
  CircularProgress,
} from "@mui/material";

export default function Signup() {
  const [roles, setRoles] = useState([]);
  const [radios, setRadio] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    password: "",
    email: "",
    weightRange: "",
    showPassword: false,
  });
  useEffect(() => {
    fetchall();
  }, []);

  async function fetchall() {
    setOpen(true);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}` + "getroles"
    );
    setOpen(false);
    var data = response.data;
    console.log(data);
    data = data.map((val) => {
      return val["roleName"];
    });
    setRoles([...data]);
    console.log(data);
  }

  const click = async () => {
    setOpen(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}` + "newuser",
        {
          email: values["email"],
          password: values["password"],
          role: radios,
        }
      );
      setOpen(false);
      setSuccess("success");
      router.push("/login");
    } catch (error) {
      setOpen(false);
      setSuccess("error");
    }
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const radioChange = (event) => {
    setRadio(event.target.value);
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className={styles.container}>
      <Container maxWidth="sm">
        <Card variant="outlined">
          <CardContent>
            <Typography marginTop={2} variant="h5" align="center">
              Getting started with Linguaphile
            </Typography>
            <Stack
              direction={"column"}
              justifyContent="center"
              spacing={3}
              marginTop={3}
              marginLeft={10}
              marginRight={10}
              paddingBottom={3}
            >
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">
                  Email
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email"
                  type="text"
                  value={values.weight}
                  onChange={handleChange("email")}
                  label="Email"
                />
              </FormControl>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Roles
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  {roles.map((val, i) => {
                    return (
                      <FormControlLabel
                        key={i}
                        value={`${val}`}
                        control={<Radio />}
                        label={`${val}`}
                        onChange={radioChange}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <Button
                variant="outlined"
                sx={{
                  color: "#D9BB9B",
                  borderColor: "#D9BB9B",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
                onClick={click}
              >
                Sign Up
              </Button>
              {success != "" ? (
                <Alert severity={`${success}`}>
                  {success.charAt(0).toUpperCase() + success.slice(1)}
                </Alert>
              ) : (
                <br></br>
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
