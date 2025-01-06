import React, { useState, useEffect } from "react";
import Profile from "./profile";
import Header from "./header";
import EducationDetails from "./education";
import Skills from "./skills";
import Projects from "./projects";
import SocialMedia from "./socialMedia";

import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
  Container,
} from "@mui/material";
import Resume from "./resume";

const steps = [
  "profile section",
  "education section",
  "skills section",
  "mini project",
  "social",
  "show resume",
];

export default function SimpleStepper() {
  const [activeStep, setActiveStep] = useState(0);
  // console.log(activeStep);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    const clear = localStorage.clear();
    setActiveStep(0);
  };

  const profileData = JSON.parse(localStorage.getItem("profileDetails"));
  const educationData = JSON.parse(localStorage.getItem("educationDetails"));
  const skillsData = JSON.parse(localStorage.getItem("skills"));
  const projectData = JSON.parse(localStorage.getItem("projectDetails"));
  const socialUrlData = JSON.parse(localStorage.getItem("socialLink"));

  var check = false;
  if (
    profileData &&
    educationData &&
    skillsData &&
    projectData &&
    socialUrlData
  ) {
    check = true;
  }

  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.clear();
    };

    window.addEventListener("beforeunload", clearLocalStorage);

    return () => {
      window.removeEventListener("beforeunload", clearLocalStorage);
    };
  }, []);
  
  return (
    <>
      <Header />

      <Box sx={{ padding: 5 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Container>
        {activeStep === 0 ? (
          <Profile />
        ) : activeStep === 1 ? (
          <EducationDetails />
        ) : activeStep === 2 ? (
          <Skills />
        ) : activeStep === 3 ? (
          <Projects />
        ) : activeStep === 4 ? (
          <SocialMedia />
        ) : activeStep === 5 && check ? (
          <Resume />
        ) : (
          // ):(<></>)}
          <>{setActiveStep(0)}</>
        )}

        <Box sx={{ marginTop: 2 }}>
          {activeStep === steps.length - 1 ? (
            <Box>
              <Typography>
                {check ? "Your resume is ready." : "No data available"}
              </Typography>

              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{ my: 2 }}
                variant="contained"
              >
                Edit
              </Button>

              <Button
                onClick={handleReset}
                sx={{ my: 2, mx: 1 }}
                variant="outlined"
              >
                Done
              </Button>
            </Box>
          ) : (
            <Box>
              <Button color="primary" variant="contained" onClick={handleReset}>
                reset
              </Button>
              <Button onClick={handleBack} disabled={activeStep === 0} sx={{mx:1}}>
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ mr: 1 }}
                disabled={activeStep === steps.length - 1}
              >
                {activeStep === steps.length - 2 ? "Generate Resume" : "Next"}
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}
