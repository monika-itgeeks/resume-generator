import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";

const Projects = () => {
  const [ProjectEntries, setProjectEntries] = useState([
    { projectName: "", techStack: "", description: "" },
  ]);

  const [errors, setErrors] = useState([
    { projectName: "", techStack: "", description: "" },
  ]);

  const [msg, setMsg] = useState("");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("projectDetails"));
    if (savedData) {
      setProjectEntries(savedData);
    }
  }, []);

  const handleChange = (index, field, value) => {
    const updatedEntries = [...ProjectEntries];
    updatedEntries[index][field] = value;
    setProjectEntries(updatedEntries);

    if (errors[index] && errors[index][field]) {
      const updatedErrors = [...errors];
      updatedErrors[index][field] = "";
      setErrors(updatedErrors);
    }
  };

  const handleAddInput = () => {
    setProjectEntries([
      ...ProjectEntries,
      { projectName: "", techStack: "", description: "" },
    ]);

    setErrors([...errors, { projectName: "", techStack: "", description: "" }]);
  };

  const handleRemoveInput = () => {
    if (ProjectEntries.length > 1) {
      setProjectEntries(ProjectEntries.slice(0, -1));
      setErrors(errors.slice(0, -1));
    }
  };

  const validateInputs = () => {
    const updatedErrors = ProjectEntries.map((entry) => {
      const newError = {};
      if (!entry.projectName)
        newError.projectName = "Project name is required.";
      if (!entry.techStack) newError.techStack = "Field is required.";
      if (!entry.description) newError.description = "Description is required.";

      return newError;
    });

    setErrors(updatedErrors);
    return updatedErrors.every((err) => Object.keys(err).length === 0);
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      console.log("project Details Submitted: ", ProjectEntries);
      localStorage.setItem("projectDetails", JSON.stringify(ProjectEntries));
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
        Add your Projects details
      </Typography>

      {ProjectEntries.map((entry, index) => (
        <Grid
          key={index}
          container
          spacing={3}
          sx={{ width: "100%", paddingBlock: "20px" }}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid size={4}>
            <TextField
              sx={{
                width: "100%",
                marginBlock: "20px",
              }}
              name="projectName"
              label="Project Name"
              type="text"
              variant="standard"
              value={entry.projectName}
              onChange={(e) =>
                handleChange(index, "projectName", e.target.value)
              }
              error={!!errors[index]?.projectName}
              helperText={errors[index]?.projectName}
            />
          </Grid>
          <Grid size={4}>
            <TextField
              sx={{
                width: "100%",
                marginBlock: "20px",
              }}
              name="techStack"
              label="Tech Stack"
              type="text"
              variant="standard"
              value={entry.techStack}
              onChange={(e) => handleChange(index, "techStack", e.target.value)}
              error={!!errors[index]?.techStack}
              helperText={errors[index]?.techStack}
            />
          </Grid>
          <Grid size={4}>
            <TextField
              sx={{
                width: "100%",
                marginBlock: "20px",
              }}
              name="description"
              label="Description"
              type="text"
              variant="standard"
              value={entry.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              error={!!errors[index]?.description}
              helperText={errors[index]?.description}
            />
          </Grid>
        </Grid>
      ))}

      <Box sx={{ width: "100%", paddingBlock: "20px" }}>
        <Button
          variant="outlined"
          sx={{ marginInline: "10px" }}
          onClick={handleRemoveInput}
        >
          Delete
        </Button>
        <Button variant="contained" onClick={handleAddInput}>
          Add Projects
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

export default Projects;
