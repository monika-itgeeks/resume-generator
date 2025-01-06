import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";

const SocialMedia = () => {
  const [socialLink, setsocialLinks] = useState([{ url: "" }]);
  const [errors, setErrors] = useState([{ url: "" }]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("socialLink"));
    if (savedData) {
      setsocialLinks(savedData);
    }
  }, []);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedUlrs = [...socialLink];
    updatedUlrs[index][name] = value;
    setsocialLinks(updatedUlrs);

    if (errors[index]) {
      const updatedErrors = [...errors];
      updatedErrors[index] = "";
      setErrors(updatedErrors);
    }
  };

  const handleAddInput = () => {
    setsocialLinks([...socialLink, { url: "" }]);
    setErrors([...errors, { url: "" }]);
  };

  const handleRemoveInput = () => {
    if (socialLink.length > 1) {
      const updatedUlrs = [...socialLink];
      updatedUlrs.pop();
      setsocialLinks(updatedUlrs);
    }
  };

  const validateInputs = () => {
    const updatedErrors = socialLink.map((entry) => {
      const newError = {};
      if (!entry.url) newError.url = "Url is required.";
      return newError;
    });

    setErrors(updatedErrors);
    return updatedErrors.every((err) => Object.keys(err).length === 0);
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      console.log("socialLink Details Submitted: ", socialLink);
      localStorage.setItem("socialLink", JSON.stringify(socialLink));
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
        Add social links like linkedin , github etc
      </Typography>
      {socialLink.map((input, index) => (
        <Grid
          key={index}
          container
          spacing={3}
          sx={{ width: "100%", paddingBlock: "20px" }}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid size={12}>
            <TextField
              sx={{
                width: "100%",
                marginBlock: "20px",
              }}
              name="url"
              label="Social Link"
              type="text"
              variant="standard"
              value={input.url}
              onChange={(event) => handleChange(event, index)}
              error={!!errors[index]?.url}
              helperText={errors[index]?.url}
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
          Add Url
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
export default SocialMedia;
