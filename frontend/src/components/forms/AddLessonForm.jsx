import { CloseCircleFilled } from "@ant-design/icons";
import { Avatar, Button, Progress, Tooltip } from "antd";

import React from "react";
// import TextEditor from "../General/TextEditor/TextEditor";

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
        {progress > 0 && (
          <Progress
            percent={progress}
            size="small"
            status="active"
            strokeColor="#1890ff"
          />
        )}
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
          {/* <TextEditor /> */}
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
      </form>
    </div>
  );
}
