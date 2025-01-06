import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState ,useEffect } from "react";

const Skills = () => {
  const [skills, setInputs] = useState([{ skill: "" }]);
  const [errors, setErrors] = useState([{ skill: "" }]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("skills"));
    if (savedData) {
      setInputs(savedData);
    }
  }, []);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedSkills = [...skills];
    updatedSkills[index][name] = value;
    setInputs(updatedSkills);

    if (errors[index]) {
      const updatedErrors = [...errors];
      updatedErrors[index] = "";
      setErrors(updatedErrors);
    }
  };

  const handleAddInput = () => {
    setInputs([...skills, { skill: "" }]);
    setErrors([...errors, { skill: "" }]);
  };

  const handleRemoveInput = () => {
    if (skills.length > 1) {
      const updatedSkills = [...skills];
      updatedSkills.pop();
      setInputs(updatedSkills);
    }
  };

  const validateInputs = () => {
    const updatedErrors = skills.map((entry) => {
      const newError = {};
      if (!entry.skill) newError.skill = "Course name is required.";
      return newError;
    });

    setErrors(updatedErrors);
    return updatedErrors.every((err) => Object.keys(err).length === 0);
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      console.log("skills Details Submitted: ", skills);
      localStorage.setItem("skills", JSON.stringify(skills));
      setMsg("your Data is saved.");
    }
  };

  return (
    <Box
      sx={{
        boxShadow: 1,
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Typography
        sx={{ marginTop: "40px", textAlign: "center", color: "GrayText" }}
      >
        Add your Skills
      </Typography>

      <Grid
        container
        spacing={3}
        sx={{ width: "100%", paddingBlock: "20px" }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {skills.map((input, index) => (
          <Grid key={index} size={3}>
            <TextField
              sx={{
                width: "100%",
                marginBlock: "20px",
              }}
              name="skill"
              label={`Skill`}
              type="text"
              variant="standard"
              value={input.skill}
              onChange={(event) => handleChange(event, index)}
              error={!!errors[index]?.skill}
              helperText={errors[index]?.skill}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ width: "100%", paddingBlock: "20px" }}>
        <Button
          variant="outlined"
          sx={{ marginInline: "10px" }}
          onClick={handleRemoveInput}
        >
          Delete
        </Button>
        <Button variant="contained" onClick={handleAddInput}>
          Add Skill
        </Button>
      </Box>

      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {msg != "" ? (
          <Alert severity="success" sx={{ width: "50%" }}>
            Your data is saved.
          </Alert>
        ) : (
          <Box sx={{ width: "50%" }}></Box>
        )}
        <Box sx={{ width: "50%", textAlign: "right" }}>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Skills;
