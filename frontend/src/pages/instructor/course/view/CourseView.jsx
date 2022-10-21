import { Avatar, List, Modal } from "antd";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import client from "../../../../apiConfig/api";
import { toast } from "react-toastify";
import CourseHeader from "../../../../components/CourseHeader";

const status = {
  publish: {
    modal: {
      title: "Make this post a draft",
      content: "Are you sure you want to make this course as a draft ?",
      button: "Draft",
    },
  },
  draft: {
    modal: {
      title: "Publish the course",
      content: "Are you sure you want to make this course as a published ?",
      button: "publish",
    },
  },
};

export default function CourseView() {
  const { slug } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [course, setCourse] = React.useState({});

  const [deleteCourseModalVisible, setDeleteCourseModalVisible] =
    React.useState(false);

  const navigate = useNavigate();
  const handleCourseStatus = async () => {
    console.log(course);
    try {
      let apiCall = await client.post(`/course/update-course/${slug}`, {
        token,
        ...course,
        published: !course.published,
      });
      const { data } = apiCall;
      if (apiCall.ok) {
        toast.success(data.message);
        setTimeout(() => {
          loadCourse();
        }, 500);
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  const loadCourse = async () => {
    try {
      const apiCall = await client.post("course/view", { slug, token });
      const { data } = apiCall;
      if (apiCall.ok) {
        console.log(data);
        setCourse(data.course);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCourse();
  }, [slug]);
  return (
    <div>
      {course && (
        <div className="container-fluid pt-1">
          {/* // Page for course information */}
          <CourseHeader
            image={course.image}
            title={course.title}
            description={course.description}
            // handleAddLesson={() => setAddLessonModalVisible(true)}
            handleAddLesson={() =>
              navigate(`/instructor/course/update/${slug}/lesson/add`)
            }
            handleDeleteCourse={() => setDeleteCourseModalVisible(true)}
            published={course.published}
            handleCourseEdit={() =>
              navigate(`/instructor/course/update/${slug}`)
            }
          />
        </div>
      )}

      <Modal
        title={
          course.published
            ? status.publish.modal.title
            : status.draft.modal.title
        }
        visible={deleteCourseModalVisible}
        onCancel={() => setDeleteCourseModalVisible(false)}
        onOk={() => {
          setDeleteCourseModalVisible(false);
          handleCourseStatus();
        }}
        okText={
          course.published
            ? status.publish.modal.button
            : status.draft.modal.button
        }
      >
        <p>
          {course.published
            ? status.publish.modal.content
            : status.draft.modal.content}
        </p>
      </Modal>
      <div className="row pb-5">
        <div className="col lesson-list">
          <h4>{course && course.lessons && course.lessons.length} Lessons</h4>
          {/* render course lessons */}
          {course && course.lessons && (
            <List
              itemLayout="horizontal"
              size="large"
              dataSource={course.lessons}
              renderItem={(item, index) => (
                <List.Item
                  key={item._id}
                  actions={[
                    <a
                      href={`/course/lesson/${slug}/${item._id}`}
                      key="list-loadmore-edit"
                    >
                      Edit
                    </a>,
                    <a
                      href={`/course/lesson/${slug}/${item._id}`}
                      key="list-loadmore-delete"
                    >
                      Delete
                    </a>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar>{index + 1}</Avatar>}
                    title={item.title}
                    // description={item.content}
                  />
                </List.Item>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}
