import React, { useState } from "react";
import { Button } from "@mui/material";

const FileUplod = () => {
  const [file, setFile] = useState(null);

  console.log(file, "file");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="input"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="input">
        <Button variant="raised" component="span">
          Upload file
        </Button>
      </label>

      {file && file.type.startsWith("image/") && (
        <img src={URL.createObjectURL(file)} alt={file.name} width="350" height="350px"/>
      )}

    </div>
  );
};
export default FileUplod;
