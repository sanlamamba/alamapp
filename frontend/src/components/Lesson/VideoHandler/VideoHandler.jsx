import { CloseCircleFilled, LoadingOutlined } from "@ant-design/icons";
import { Avatar, Image, Tooltip } from "antd";
import React from "react";
import { assetsLocations } from "../../../utils/assetsLocations";

export default function VideoHandler({
  uploadButtonText = "Upload Video",
  uploading = false,
  values = { video: null },
  handleRemoveVideo,
  handleVideo,
}) {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center flex-column">
        {values.video ? (
          // <Image
          //   width={"90%"}
          //   height={"100%"}
          //   src="https://dummyimage.com/1920%20x%201080%20/000/fff"
          // />
          <video width="720" height="480" controls>
            <source
              src={`${assetsLocations.videos}/${values.video}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            width={"90%"}
            height={"100%"}
            src="https://dummyimage.com/1920%20x%201080%20/eee/000"
          />
        )}
        <div className="my-3">
          {uploading && <LoadingOutlined style={{ fontSize: 24 }} />}
          {!uploading &&
            (!values.video ? (
              <label
                htmlFor="video"
                className="btn btn-secondary d-flex flex-row align-items-center"
              >
                {uploadButtonText}
              </label>
            ) : (
              <button className="btn btn-danger" onClick={handleRemoveVideo}>
                Retirer la video
              </button>
            ))}
        </div>

        <input
          type="file"
          accept="video/*"
          name="video"
          id="video"
          hidden
          onChange={handleVideo}
        />
      </div>
    </div>
  );
}
