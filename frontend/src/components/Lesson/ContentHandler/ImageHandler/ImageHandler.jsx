import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Image, Input } from "antd";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import client from "../../../../apiConfig/api";
import { assetsLocations } from "../../../../utils/assetsLocations";

export default function ImageHandler({
  index,
  saveContent,
  content = "",
  removeContent,
}) {
  const [image, setImage] = React.useState("");
  const [preview, setPreview] = React.useState("");
  const [uploadButtonText, setUploadButtonText] =
    React.useState("Upload Image");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", "images");
    try {
      const apiCall = await client.post("/course/upload-image", formData);
      const { data } = apiCall;
      if (apiCall.ok) {
        setImage(data.path);
        saveContent(index, data.path);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error("Error uploading image");
    }

    setLoading(false);
  };
  const handleImageRemove = async (e) => {
    e.preventDefault();

    setLoading(true);

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

    setLoading(false);
  };
  return (
    <div>
      <div className="form-row mb-2">
        <div className="col">
          <div className="form-group d-flex align-items-center justify-content-between">
            <label
              for={`imageUpload${index}`}
              className="btn btn-outline-secondary btn-block text-left"
            >
              {uploadButtonText}
            </label>

            <DeleteOutlined
              style={{ fontSize: "16px" }}
              onClick={() => removeContent(index)}
            />

            <input
              type="file"
              id={`imageUpload${index}`}
              name="image"
              onChange={handleImageUpload}
              accept="image/*"
              hidden
            />
          </div>
        </div>
        {
          image ? (
            <div className="col">
              <Badge count="X" className="pointer" onClick={handleImageRemove}>
                <Image src={preview} />
              </Badge>
            </div>
          ) : null
          // <SkeletonAvatar shape="square" size={360} />
        }
      </div>
    </div>
  );
}
