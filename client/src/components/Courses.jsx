import { useEffect, useState } from "react";

function Courses() {
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

  return (
    <div className="flex gap-5 flex-wrap">
      {courses.map((course) => (
        <div
          key={course._id}
          className="border-2 border-red-500  m-auto  w-1/3 p-5 text-left h-96"
        >
          {course.imageLink ? (
            <img
              src={course.imageLink}
              alt={course.title}
              className="w-full  rounded-lg"
            />
          ) : (
            <p>No image available</p>
          )}
          <div className="flex justify-between font-black">
            <p>{course.title}</p>

            <p>${course.price}</p>
          </div>
          <p>
            <em>{course.description}</em>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Courses;
