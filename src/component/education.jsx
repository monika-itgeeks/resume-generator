import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";

const EducationDetails = () => {
  const [educationEntries, setEducationEntries] = useState([
    { courseName: "", graduationYear: "", college: "", percentage: "" },
  ]);

  const [errors, setErrors] = useState([
    { courseName: "", graduationYear: "", college: "", percentage: "" },
  ]);

  const [msg, setMsg] = useState("");

    useEffect(() => {
      const savedData = JSON.parse(localStorage.getItem("educationDetails"));
      if (savedData) {
        setEducationEntries(savedData); 
      }
    }, []);

  const handleChange = (index, field, value) => {
    const updatedEntries = [...educationEntries];
    updatedEntries[index][field] = value;
    setEducationEntries(updatedEntries);

    if (errors[index] && errors[index][field]) {
      const updatedErrors = [...errors];
      updatedErrors[index][field] = "";
      setErrors(updatedErrors);
    }
  };

  const handleAddInput = () => {
    setEducationEntries([
      ...educationEntries,
      { courseName: "", graduationYear: "", college: "", percentage: "" },
    ]);

    setErrors([
      ...errors,
      { courseName: "", graduationYear: "", college: "", percentage: "" },
    ]);
  };

  const handleRemoveInput = () => {
    if (educationEntries.length > 1) {
      setEducationEntries(educationEntries.slice(0, -1));
      setErrors(errors.slice(0, -1));
    }
  };

  const validateInputs = () => {
    const updatedErrors = educationEntries.map((entry) => {
      const newError = {};
      if (!entry.courseName) newError.courseName = "Course name is required.";
      if (!entry.graduationYear)
        newError.graduationYear = "Graduation year is required.";
      if (!entry.college) newError.college = "College/School name is required.";
      if (!entry.percentage) newError.percentage = "Percentage is required.";
      return newError;
    });

    setErrors(updatedErrors);
    return updatedErrors.every((err) => Object.keys(err).length === 0);
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      console.log("Education Details Submitted: ", educationEntries);
      localStorage.setItem(
        "educationDetails",
        JSON.stringify(educationEntries)
      );
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
        Add your Education Details
      </Typography>

      {educationEntries.map((entry, index) => (
        <Box key={index}>
          <Grid
            container
            spacing={3}
            sx={{ width: "100%", paddingBlock: "20px" }}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid size={3}>
              <TextField
                sx={{ width: "100%", marginBlock: "20px" }}
                name="courseName"
                label="Course Name"
                type="text"
                variant="standard"
                value={entry.courseName}
                onChange={(e) =>
                  handleChange(index, "courseName", e.target.value)
                }
                error={!!errors[index]?.courseName}
                helperText={errors[index]?.courseName}
              />
            </Grid>
            <Grid size={3}>
              <TextField
                sx={{ width: "100%", marginBlock: "20px" }}
                name="graduationYear"
                label="Completion Year"
                type="text"
                variant="standard"
                value={entry.graduationYear}
                onChange={(e) =>
                  handleChange(index, "graduationYear", e.target.value)
                }
                error={!!errors[index]?.graduationYear}
                helperText={errors[index]?.graduationYear}
              />
            </Grid>
            <Grid size={3}>
              <TextField
                sx={{ width: "100%", marginBlock: "20px" }}
                name="college"
                label="College/School"
                type="text"
                variant="standard"
                value={entry.college}
                onChange={(e) => handleChange(index, "college", e.target.value)}
                error={!!errors[index]?.college}
                helperText={errors[index]?.college}
              />
            </Grid>
            <Grid size={3}>
              <TextField
                sx={{ width: "100%", marginBlock: "20px" }}
                name="percentage"
                label="Percentage"
                type="text"
                variant="standard"
                value={entry.percentage}
                onChange={(e) =>
                  handleChange(index, "percentage", e.target.value)
                }
                error={!!errors[index]?.percentage}
                helperText={errors[index]?.percentage}
              />
            </Grid>
          </Grid>
        </Box>
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
          Add Education
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

export default EducationDetails;
