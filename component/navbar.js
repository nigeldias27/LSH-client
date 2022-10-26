import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import "@fontsource/questrial"; // Defaults to weight 400.
import { useRouter } from "next/router";
import * as React from "react";

export function Navb() {
  const router = useRouter();
  const navbarStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    background: "#ffedd0 ",
    borderRadius: "10px",
  };
  return (
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
      <Box sx={{ marginLeft: "55%" }}>
        <Button
          onClick={() => {
            localStorage.removeItem("userID");
            router.push("/login");
          }}
          sx={{ color: "black", fontWeight: "bold" }}
        >
          Logout
        </Button>
      </Box>
    </div>
  );
}
