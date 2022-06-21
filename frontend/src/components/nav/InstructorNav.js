import React, { useEffect, useState } from "react";
import CLink from "../General/CustomLink/CLink";

const instructorLinks = [
  {
    label: "Instructor Profile",
    path: "/instructor",
  },
  {
    label: "Create Course",
    path: "/instructor/course/create",
  },
];

export default function InstructorNav() {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    setCurrent(window.location.pathname);
  }, [window.location.pathname]);
  console.log(current);

  return (
    <div className="nav flex-column nav-pills mt-2">
      {instructorLinks.map((link, index) => {
        return (
          <CLink
            key={index}
            label={link.label}
            path={link.path}
            customClass={"nav-link" + (current === link.path ? " active" : "")}
          />
        );
      })}
    </div>
  );
}
