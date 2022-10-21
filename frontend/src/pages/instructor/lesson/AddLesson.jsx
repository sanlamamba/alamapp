import { Avatar, List, Modal } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import client from "../../../apiConfig/api";
import ContentHandler from "../../../components/Lesson/ContentHandler/ContentHandler";
import LessonTitleHandler from "../../../components/Lesson/ContentHandler/LessonTitleHandler/LessonTitleHandler";
import VideoHandler from "../../../components/Lesson/VideoHandler/VideoHandler";

export default function AddLesson() {
  const { token } = useSelector((state) => state.auth);
  const { slug } = useParams();

  const [videoUpload, setVideoUpload] = useState({
    state: false,
    buttonText: "Upload Video",
    progress: 0,
  });
  const [values, setValues] = useState({
    title: "",
    video: "",
    content: [],
  });

  const readyForSubmit = () => {
    if (values.title === "" || values.video === "") {
      return false;
    }
    return true;
  };
  const setContent = (content) => {
    setValues({ ...values, content: content });
  };
  const editContent = (content = []) => {
    setValues({ ...values, content });
  };
  const handleRemoveVideo = async () => {
    setVideoUpload({ ...videoUpload, state: true, buttonText: "Removing..." });
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
        setVideoUpload({
          ...videoUpload,
          progress: 0,
          buttonText: "Upload Video",
        });
      } else {
        toast.error(data.message);
      }
      setVideoUpload({ ...videoUpload, state: false });
    } catch (e) {
      toast.error("Error removing video");
      setVideoUpload({ ...videoUpload, state: false });
    }
  };
  const handleVideo = async (e) => {
    setVideoUpload({ ...videoUpload, state: true, buttonText: "Uploading..." });
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("video", file);
      const apiCall = await client.post("/course/upload-video", formData, {
        onUploadProgress: (progressEvent) => {
          setVideoUpload({
            ...videoUpload,
            progress: Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            ),
          });
        },
      });
      const { data } = apiCall;
      if (apiCall.ok) {
        setValues({
          ...values,
          video: data.path,
        });
        toast.success(data.message);
        setVideoUpload({ ...videoUpload, buttonText: file.name });
      } else {
        toast.error(data.message);
        setVideoUpload({ ...videoUpload, buttonText: "Upload Video" });
      }
    } catch (e) {
      toast.error("Error uploading video");
      setVideoUpload({ ...videoUpload, buttonText: "Upload Video" });
    }
    setVideoUpload({ ...videoUpload, state: false });
  };

  const setTitle = (title) => {
    setValues({ ...values, title: title });
  };

  const handleSubmit = async () => {
    console.log(values);
    try {
      let apiCall = await client.post(`/course/create-lesson/${slug}`, {
        token,
        ...values,
      });
      const { data } = apiCall;
      if (apiCall.ok) {
        toast.success(data.message);
        // toast.info("Redirecting...");
        // setTimeout(() => {
        //   navigate(`/instructor/course/view/${values.slug}`);
        // }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  console.log(values);

  return (
    <>
      <LessonTitleHandler title={values.title} setTitle={setTitle} />
      <VideoHandler
        uploadButtonText={videoUpload.buttonText}
        uploading={videoUpload.state}
        values={values}
        handleRemoveVideo={handleRemoveVideo}
        handleVideo={handleVideo}
      />
      <ContentHandler
        editContent={editContent}
        content={values.content}
        setContent={setContent}
        readyForSubmit={readyForSubmit}
        values={values}
        handleSubmit={handleSubmit}
      />
      {/* <AddLessonForm
        values={values}
        handleVideo={handleVideo}
        setValues={setValues}
        handleAddLesson={handleAddLesson}
        uploadButtonText={videoUpload.buttonText}
        progress={videoUpload.progress}
        uploading={videoUpload.state}
        handleRemoveVideo={handleRemoveVideo}
      /> */}
    </>
  );
}
