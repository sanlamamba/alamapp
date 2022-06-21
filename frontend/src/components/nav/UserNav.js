import React, { useEffect, useState } from "react";
import CLink from "../General/CustomLink/CLink";

const userLinks = [
  {
    label: "Profile",
    path: "/user",
  },
  {
    label: "My Courses",
    path: "/user/courses",
  },
];

export default function UserNav() {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    setCurrent(window.location.pathname);
  }, [window.location.pathname]);
  console.log(current);

  return (
    <div className="nav flex-column nav-pills mt-2">
      {userLinks.map((link, index) => {
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
