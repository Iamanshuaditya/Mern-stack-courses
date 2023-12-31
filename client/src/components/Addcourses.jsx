import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function AddCourses() {
  const [coursetitle, setCourseTitle] = useState("");
  const [coursedescription, setCourseDescription] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [coursePrice, setCoursePrice] = useState("");

  useEffect(() => {
    const localAuthToken = localStorage.getItem("token");

    if (localAuthToken) {
      console.log("Authentication token from localStorage:", localAuthToken);
    }
  }, []);

  function handleClick() {
    const localAuthToken = localStorage.getItem("token");

    if (!localAuthToken) {
      console.error("Authentication token is missing.");
      return;
    }

    fetch("http://localhost:3000/admin/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localAuthToken}`,
      },
      body: JSON.stringify({
        title: coursetitle,
        description: coursedescription,
        price: coursePrice,
        imageLink: courseImage,
        published: false,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setCourseDescription("");
    setCourseTitle("");
    setCourseImage("");
    setCoursePrice("");
  }

  return (
    <div className="m-auto w-1/3">
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
          marginTop: "5em",
          marginBottom: "2em",
        }}
      >
        <TextField
          fullWidth
          label="Title"
          id="fullWidth"
          value={coursetitle}
          onChange={(e) => setCourseTitle(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
          marginBottom: "2em",
        }}
      >
        <TextField
          fullWidth
          label="Description"
          id="fullWidth"
          value={coursedescription}
          onChange={(e) => setCourseDescription(e.target.value)}
        ></TextField>
      </Box>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
          marginBottom: "2em",
        }}
      >
        <TextField
          fullWidth
          label="ImageLink"
          id="fullWidth"
          value={courseImage}
          onChange={(e) => setCourseImage(e.target.value)}
        ></TextField>
      </Box>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
          marginBottom: "2em",
        }}
      >
        <TextField
          fullWidth
          label="coursePrice"
          type="number"
          id="fullWidth"
          value={coursePrice}
          onChange={(e) => setCoursePrice(e.target.value)}
        ></TextField>
      </Box>
      <Button variant="contained" onClick={handleClick}>
        Add Courses
      </Button>
    </div>
  );
}
