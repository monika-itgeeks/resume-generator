import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";

const Profile = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    phoneError: "",
  });

  const [file, setFile] = useState(null);

  const [msg, setMsg] = useState("");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("profileDetails"));
    if (savedData) {
      setInputs(savedData);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (error[`${name}Error`]) {
      setError((prevError) => ({
        ...prevError,
        [`${name}Error`]: "",
      }));
    }
  };

  const validateInputs = () => {
    const newError = {};
    const { firstName, lastName, email, phone } = inputs;

    if (!firstName) newError.firstNameError = "First name is required.";

    if (!lastName) newError.lastNameError = "Last name is required.";

    if (!email) {
      newError.emailError = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newError.emailError = "Enter a valid email address.";
    }

    if (!phone) {
      newError.phoneError = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phone)) {
      newError.phoneError = "Enter a valid 10-digit phone number.";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  // console.log(file, "file");

  const handleSubmit = () => {
    if (validateInputs()) {
      localStorage.setItem("profileDetails", JSON.stringify(inputs));
      setMsg("Your data is saved.");
      console.log("Profile Details Submitted:", inputs);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem("profilePhoto", reader.result); // Save base64 string
      };
      reader.readAsDataURL(selectedFile);
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
        Add your Profile details
      </Typography>

      <Grid
      
        spacing={3}
        sx={{ width: "100%", paddingBlock: "20px" }}
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{
              width: "100%",
              marginBlock: "20px",
            }}
            name="firstName"
            label="Enter your First Name"
            type="text"
            variant="standard"
            value={inputs.firstName}
            onChange={handleChange}
            error={!!error.firstNameError}
            helperText={error.firstNameError}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            sx={{
              width: "100%",
              marginBlock: "20px",
            }}
            name="lastName"
            label="Enter your Last Name"
            type="text"
            variant="standard"
            value={inputs.lastName}
            onChange={handleChange}
            error={!!error.lastNameError}
            helperText={error.lastNameError}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            sx={{
              width: "100%",
              marginBlock: "20px",
            }}
            name="email"
            label="Enter your Email"
            type="email"
            variant="standard"
            value={inputs.email}
            onChange={handleChange}
            error={!!error.emailError}
            helperText={error.emailError}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            sx={{
              width: "100%",
              marginBlock: "20px",
            }}
            name="phone"
            label="Enter your Phone Number"
            type="tel"
            variant="standard"
            value={inputs.phone}
            onChange={handleChange}
            error={!!error.phoneError}
            helperText={error.phoneError}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            name="input"
            id="input"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="input">
            <Button variant="outlined" component="span">
              Upload file
            </Button>
          </label>
        </Grid>
      </Grid>

      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {msg !== "" ? (
          <Alert severity="success" sx={{ width: "50%" }}>
            {msg}
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

export default Profile;
