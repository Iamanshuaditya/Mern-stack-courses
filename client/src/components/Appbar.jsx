import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});

export default function Appbar() {
  const [coursetitle, setCourseTitle] = useState("");
  const [coursedescription, setCourseDescription] = useState("");

  function handleTitleChange(e) {
    setCourseTitle(e.target.value);
  }

  function handleClick() {
    fetch("");
  }
  function handleDescription(e) {
    setCourseDescription(e.target.value);
  }
  return (
    <Box
      component="form"
      className="m-auto"
      noValidate
      sx={{
        display: "grid",
        justifyContent: "center",
        gap: 1,
        height: "10rem",
        alignContent: "space-around",
      }}
    >
      <FormControl
        variant="standard"
        className="border-2 border-red-400  h-[10r] "
      >
        <CssTextField
          label="Course Title"
          id="custom-css-outlined-input "
          className="w-96 mb-10"
          onChange={handleTitleChange}
          value={coursetitle}
        />
        <CssTextField
          label="Course Description"
          id="custom-css-outlined-input"
          onChange={handleDescription}
          value={coursedescription}
        />
        <Button variant="contained" onClick={handleClick}>
          Add Course
        </Button>
      </FormControl>
    </Box>
  );
}
