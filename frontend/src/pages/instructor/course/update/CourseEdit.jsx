import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import CourseCreateForm from "../../../../components/forms/CourseCreateForm";
import client from "../../../../apiConfig/api";
import { useEffect } from "react";
export default function CourseCreate() {
  const { slug } = useParams();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    title: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    loading: false,
    imagePreview: "",
  });
  const [image, setImage] = React.useState("");
  const [preview, setPreview] = React.useState("");
  const [uploadButtonText, setUploadButtonText] =
    React.useState("Upload Image");
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({
      ...values,
      loading: true,
    });
    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", "images");
    try {
      const apiCall = await client.post("/course/upload-image", formData);
      const { data } = apiCall;
      if (apiCall.ok) {
        setImage(data.path);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error("Error uploading image");
    }
    setValues({
      ...values,
      loading: false,
    });
  };
  const handleImageRemove = async (e) => {
    e.preventDefault();
    setValues({
      ...values,
      loading: true,
    });
    try {
      let apiCall = await client.post("/course/remove-image", {
        image,
      });
      const { data } = apiCall;
      if (apiCall.ok) {
        setPreview("");
        setImage("");
        setUploadButtonText("Upload Image");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.log(e);
    }
    setValues({
      ...values,
      loading: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.paid) {
      values.price = 0;
    }
    try {
      let apiCall = await client.post(`/course/update-course/${slug}`, {
        token,
        ...values,
        image,
      });
      const { data } = apiCall;
      if (apiCall.ok) {
        toast.success(data.message);
        toast.info("Redirecting...");
        setTimeout(() => {
          navigate("/instructor/courses");
        }, 2000);
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
        setValues(data.course);
        setUploadButtonText(data.course.image);
        setImage(data.course.image);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadCourse();
  }, []);

  return (
    <>
      <h1 className="jumbotron text-center bg-primary">Update course</h1>
      <CourseCreateForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        image={image}
        handleImageUpload={handleImageUpload}
        setValues={setValues}
        preview={preview}
        uploadButtonText={uploadButtonText}
        handleImageRemove={handleImageRemove}
      />
      <pre>{JSON.stringify(values, null, 2)}</pre>
      <pre>{image}</pre>
    </>
  );
}
