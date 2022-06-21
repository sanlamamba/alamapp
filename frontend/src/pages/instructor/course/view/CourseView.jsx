import { Avatar, Button, List, Modal } from "antd";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import client from "../../../../apiConfig/api";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import AddLessonForm from "../../../../components/forms/AddLessonForm";
import Item from "antd/lib/list/Item";
import CourseHeader from "../../../../components/CourseHeader";

export default function CourseView() {
  const { slug } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [course, setCourse] = React.useState({});
  const [addLessonModalVisible, setAddLessonModalVisible] =
    React.useState(false);
  const [deleteCourseModalVisible, setDeleteCourseModalVisible] =
    React.useState(false);
  const [values, setValues] = React.useState({
    title: "",
    content: "",
    video: "",
  });
  const navigate = useNavigate();
  const [uploading, setUploading] = React.useState(false);
  const [uploadButtonText, setUploadButtonText] =
    React.useState("Upload Video");
  const [videoProgress, setVideoProgress] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  const handleVideo = async (e) => {
    setUploading(true);
    setUploadButtonText("Uploading...");
    setUploading(true);
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("video", file);
      const apiCall = await client.post("/course/upload-video", formData, {
        onUploadProgress: (progressEvent) => {
          setProgress(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        },
      });
      const { data } = apiCall;
      if (apiCall.ok) {
        console.log(data);
        setValues({
          ...values,
          video: data.path,
        });
        toast.success(data.message);
        setUploadButtonText(file.name);
      } else {
        toast.error(data.message);
        setUploadButtonText("Upload Video");
      }
    } catch (e) {
      toast.error("Error uploading video");
      setUploadButtonText("Upload Video");
    }
    setUploading(false);
  };
  const resetModal = () => {
    setValues({
      title: "",
      content: "",
      video: "",
    });
    setUploadButtonText("Upload Video");
    setProgress(0);
  };
  const handleAddLesson = async () => {
    console.log(values);
    try {
      const apiCall = await client.post(`/course/lesson/${slug}`, {
        ...values,
        token,
      });
      console.log(apiCall.status);
      const { data } = apiCall;
      if (apiCall.ok) {
        toast.success(data.message);
        setCourse(data.course);
        setAddLessonModalVisible(false);
        resetModal();
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error("Error adding lesson");
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

  const handleRemoveVideo = async () => {
    setUploading(true);
    setUploadButtonText("Removing...");
    try {
      const apiCall = await client.post("course/remove-video", {
        video: values.video,
        token,
      });
      const { data } = apiCall;
      if (apiCall.ok) {
        toast.success(data.message);
        setValues({
          ...values,
          video: "",
        });
        setUploadButtonText("Upload Another Video");
        setProgress(0);
      } else {
        toast.error(data.message);
      }
      setUploading(false);
    } catch (e) {
      toast.error("Error removing video");
      setUploading(false);
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
            handleAddLesson={() => setAddLessonModalVisible(true)}
            handleDeleteCourse={() => setDeleteCourseModalVisible(true)}
            handleCourseEdit={() => navigate(`/instructor/course/edit/${slug}`)}
          />
        </div>
      )}
      <Modal
        title="Add Lesson"
        centered
        visible={addLessonModalVisible}
        onCancel={() => {
          setAddLessonModalVisible(false);
        }}
        onOk={() => handleAddLesson()}
        okButtonProps={{
          disabled: uploading,
          loading: uploading,
          title: "Add Lesson",
        }}
      >
        <AddLessonForm
          values={values}
          handleVideo={handleVideo}
          setValues={setValues}
          handleAddLesson={handleAddLesson}
          uploadButtonText={uploadButtonText}
          progress={progress}
          uploading={uploading}
          handleRemoveVideo={handleRemoveVideo}
        />
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Modal>
      <Modal
        title="Delete Course"
        visible={deleteCourseModalVisible}
        onCancel={() => setDeleteCourseModalVisible(false)}
        onOk={() => {
          setDeleteCourseModalVisible(false);
          navigate(`/instructor/courses`);
        }}
        okText="Delete Course"
        okType="danger"
      >
        <p>Are you sure you want to delete this course?</p>
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
                    description={item.content}
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
