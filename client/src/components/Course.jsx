import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "./Card";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";

function Course() {
  let { courseId } = useParams();
  const [courses, setCourses] = useState([]);

  function callback(data) {
    console.log(data);
    if (data && data.courses) {
      setCourses(data.courses);
    } else {
      console.error("Invalid data format received from the server");
    }
  }

  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(callback)
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  let course = null;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i]._id === courseId) {
      course = courses[i];
    }
  }

  if (!course) {
    return <>Course not found.</>;
  }

  return (
    <div className="flex">
      <div className="border-2 border-red-500 m-auto w-1/3 p-5 text-left h-[28rem]">
        <CourseCard course={course} />
      </div>
      <div className="border-2 border-blue-500 m-auto w-1/3 p-5 text-left">
        <UpdateCard course={course} setCourses={setCourses} courses={courses} />
      </div>
    </div>
  );
}

function UpdateCard(props) {
  const [coursetitle, setCourseTitle] = useState("");
  const [coursedescription, setCourseDescription] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [coursePrice, setCoursePrice] = useState("");

  const course = props.course;

  useEffect(() => {
    console.log(course);
  }, []);
  const { courseId } = useParams();

  function handleClick() {
    const localAuthToken = localStorage.getItem("token");

    if (!localAuthToken) {
      console.error("Authentication token is missing.");
      return;
    }
    if (coursetitle === "" || coursedescription === "") {
      return console.error("please input course title and description");
    }
    fetch(`http://localhost:3000/admin/courses/${courseId}`, {
      method: "PUT",
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
        const updatedCourses = props.courses.map((c) =>
          c._id === courseId
            ? {
                ...c,
                title: coursetitle,
                description: coursedescription,
                price: coursePrice,
                imageLink: courseImage,
                published: false,
              }
            : c
        );
        props.setCourses(updatedCourses);
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
    <div className="m-auto mt-4">
      <h1>Update Course</h1>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
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
        Update Courses
      </Button>
    </div>
  );
}

function CourseCard(props) {
  const course = props.course;
  return (
    <Card
      imageLink={course.imageLink}
      title={course.title}
      price={course.price}
      description={course.description}
    />
  );
}

CourseCard.propTypes = {
  course: PropTypes.shape({
    imageLink: PropTypes.string,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

UpdateCard.propTypes = {
  course: PropTypes.shape({
    imageLink: PropTypes.string,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  setCourses: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
};

export default Course;
