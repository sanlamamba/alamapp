import { Avatar, Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import client from "../../apiConfig/api";
import CLink from "../../components/General/CustomLink/CLink";
import { assetsLocations } from "../../utils/assetsLocations";

export default function InstructorIndex() {
  const [courses, setCourses] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const loadCourses = async () => {
    try {
      const apiCall = await client.post("/instructor/instructor-courses", {
        token,
      });
      setCourses(apiCall.data.courses);
    } catch (err) {
      console.log(err);
      toast.error("Error getting courses");
    }
  };
  useEffect(() => {
    loadCourses();
  }, []);
  console.log(courses);

  return (
    <div>
      <h1>Instructor Courses</h1>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              slug={course.slug}
              id={course._id}
              image={course.image}
              title={course.title}
              description={course.description.substring(0, 50) + "..."}
            />
          ))}
        </Row>
      </div>
    </div>
  );
}

const CourseCard = ({ id, slug, image, title, description }) => {
  return (
    <Col span={6}>
      <Link to={`/instructor/course/view/${slug}`}>
        <Card
          clickable
          cover={
            <img alt={`${title}`} src={`${assetsLocations.images}/${image}`} />
          }
        >
          <Meta title={title} description={description} />
        </Card>
      </Link>
    </Col>
  );
};
