import { useEffect, useState } from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate("");

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

  function handleClick(courseId) {
    console.log("Clicked on course with ID:", courseId);
    navigate(`/courses/${courseId}`);
  }
  return (
    <div className="flex gap-5 flex-wrap">
      {courses.map((course) => (
        <div
          key={course._id}
          className="border-2 border-red-500  m-auto  w-1/3 p-5 text-left "
        >
          <Card
            imageLink={course.imageLink}
            title={course.title}
            price={course.price}
            onClick={() => handleClick(course._id)}
            description={course.description}
          />
        </div>
      ))}
    </div>
  );
}

export default Courses;
