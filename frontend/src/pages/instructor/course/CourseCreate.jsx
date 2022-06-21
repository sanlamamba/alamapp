import React from "react";
import { useNavigate } from "react-router-dom";
import CourseCreateForm from "../../../components/forms/CourseCreateForm";
import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import client from "../../../apiConfig/api";
export default function CourseCreate() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    title: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    loading: false,
  });
  const [image, setImage] = React.useState("");
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
      let apiCall = await client.post("/course/create-course", {
        token,
        ...values,
        image,
      });
      const { data } = apiCall;
      if (apiCall.ok) {
        toast.success(data.message);
        toast.info("Redirecting...");
        setTimeout(() => {
          navigate("/instructor");
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <h1 className="jumbotron text-center bg-primary">Create a new course</h1>
      <CourseCreateForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        setValues={setValues}
        handleImageUpload={handleImageUpload}
        uploadButtonText={uploadButtonText}
        handleImageRemove={handleImageRemove}
        image={image}
      />
      <pre>{JSON.stringify(values, null, 2)}</pre>
      <pre>{image}</pre>
    </>
  );
}
