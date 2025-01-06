import {
  Box,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Link } from "@mui/material";

const Resume = () => {
  const profileData = JSON.parse(localStorage.getItem("profileDetails")) || {};
  const educationData = JSON.parse(localStorage.getItem("educationDetails")) || [];
  const skillsData = JSON.parse(localStorage.getItem("skills")) || [];
  const projectData = JSON.parse(localStorage.getItem("projectDetails")) || [];
  const socialUrlData = JSON.parse(localStorage.getItem("socialLink")) || [];
  const file = localStorage.getItem("profilePhoto") || "/assets/avtar.jpg";

  // console.log(ReactToPrint);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  return (
    <Box sx={{ width: "100%", paddingBlock: "20px" }}>
      <Box sx={{ width: "100%", paddingBlock: "20px", textAlign: "center" }}>
        {/* <Button variant="outlined" sx={{ marginInline: "10px" }}>
            Reset
          </Button> */}
        <Button variant="contained" onClick={handlePrint}>
          Print
        </Button>
      </Box>

      <Box
        ref={componentRef}
        elevation={1}
        sx={{
          boxShadow: 1,
          padding: "20px",
          borderRadius: "10px",
          width: "60%",
          marginInline: "auto",
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{ width: "100%", paddingBlock: "20px" }}
        >
          <Grid size={4} sx={{ backgroundColor: "#37474f", height: "auto" }}>
            <Box
              sx={{
                width: "100%",
                paddingBlock: "50px",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Avatar
                alt="User Avatar"
                src={file}
                // src="/assets/avtar.jpg"
                sx={{ width: 100, height: 100 }}
              />
            </Box>

            <Box sx={{ padding: "50px", color: "#eceff1" }}>
              <Typography variant="h5">Skills</Typography>
              <Divider />
              <List sx={{ width: "80%", listStyleType: "disc", padding: 1 }}>
                {skillsData.map((value, index) => (
                  <ListItem
                    key={index}
                    sx={{ display: "list-item", padding: 0 }}
                  >
                    <ListItemText primary={`${value.skill}`} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>

          <Grid  size={8}>
            <Box sx={{ padding: "50px" }}>
              <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                {`${profileData.firstName || ""} ${profileData.lastName || ""}`}
              </Typography>

              <Box sx={{ paddingBlock: "20px" }}>
                <Typography>Email: {profileData.email || "N/A"}</Typography>
                <Typography>Phone: {profileData.phone || "N/A"}</Typography>
                <Typography>Address: {profileData.address || "N/A"}</Typography>
              </Box>
            </Box>

            {educationData.length > 0 && (
              <Box sx={{ paddingBottom: "15px" }}>
                <Typography variant="h6">Education</Typography>
                <Divider />
                {educationData.map((data, index) => (
                  <Box sx={{ padding: "15px" }} key={index}>
                    <Typography>{data.graduationYear}</Typography>
                    <Typography fontWeight="bold">{data.college}</Typography>
                    <Typography>{data.courseName}</Typography>
                    <Typography>Percentage: {data.percentage}%</Typography>
                  </Box>
                ))}
              </Box>
            )}

            {projectData.length > 0 && (
              <Box sx={{ paddingBottom: "15px" }}>
                <Typography variant="h6">Project Details</Typography>
                <Divider />
                {projectData.map((data, index) => (
                  <Box sx={{ padding: "15px" }} key={index}>
                    <Typography fontWeight="bold">
                      {data.projectName}
                    </Typography>
                    <Typography>Tech Stack: {data.techStack}</Typography>
                    <Typography>{data.description}</Typography>
                  </Box>
                ))}
              </Box>
            )}

            {socialUrlData.length > 0 && (
              <Box sx={{ paddingBottom: "15px" }}>
                <Typography variant="h6">Social URLs</Typography>
                <Divider />
                {socialUrlData.map((data, index) => (
                  <Box sx={{ padding: "5px 15px" }} key={index}>
                    <Link href={data.url} target="_blank" rel="noopener">
                      {data.url}
                    </Link>
                  </Box>
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Resume;
