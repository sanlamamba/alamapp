import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, PageHeader, Row, Tag, Typography } from "antd";
import { assetsLocations } from "../utils/assetsLocations";

const CourseHeader = ({
  title,
  instructorImage = "default.png",
  description,
  handleAddLesson,
  handleCourseEdit,
  handleDeleteCourse,
  published,
  image,
}) => (
  <PageHeader
    title={title}
    className="site-page-header"
    subTitle="course"
    tags={
      published ? (
        <Tag color="green">Active</Tag>
      ) : (
        <Tag color="orange">Draft</Tag>
      )
    }
    extra={[
      <Button key="3" onClick={handleDeleteCourse}>
        {published ? "Make Draft" : "Publish"}
      </Button>,
      <Button key="2" onClick={handleCourseEdit}>
        Edit
      </Button>,
      <Button key="1" type="primary" onClick={handleAddLesson}>
        Add Lesson
      </Button>,
    ]}
    avatar={{
      src: instructorImage,
    }}
  >
    <Row>
      <div style={{ flex: 1 }}>{description}</div>
      <div className="image">
        <img
          src={`${assetsLocations.images}/${image}`}
          alt="content"
          width={350}
        />
      </div>
    </Row>
  </PageHeader>
);

export default CourseHeader;
