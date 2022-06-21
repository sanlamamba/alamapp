import { CloseCircleFilled } from "@ant-design/icons";
import { Button, Progress, Tooltip } from "antd";

import React from "react";

export default function AddLessonForm({
  handleAddLesson,
  values,
  setValues,
  uploadButtonText,
  handleVideo,
  progress,
  uploading,
  handleRemoveVideo,
}) {
  return (
    <div>
      <form onSubmit={handleAddLesson}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={values.title}
            onChange={(e) => {
              setValues({ ...values, title: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            className="form-control"
            cols="7"
            rows="7"
            onChange={(e) => {
              setValues({ ...values, content: e.target.value });
            }}
            value={values.content}
            name="content"
            placeholder="Enter content here"
          />
        </div>
        <div className="form-group">
          <label htmlFor="video" className="btn btn-secondary w-100 mt-2">
            {uploadButtonText}
          </label>
          {!uploading && values.video !== "" && (
            <Tooltip title="Click to remove video">
              <span onClick={handleRemoveVideo} className="pt-1 pl-3">
                <CloseCircleFilled className="text-danger d-flex justify-content-center pt-4 pointer" />
              </span>
            </Tooltip>
          )}

          <input
            type="file"
            accept="video/*"
            name="video"
            id="video"
            hidden
            onChange={handleVideo}
          />
        </div>
        {progress > 0 && (
          <Progress
            percent={progress}
            size="small"
            status="active"
            strokeColor="#1890ff"
          />
        )}
      </form>
    </div>
  );
}
