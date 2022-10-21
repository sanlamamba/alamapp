import { EditOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React from "react";
import { useState } from "react";

export default function LessonTitleHandler({ title = "", setTitle }) {
  const [editMode, setEditMode] = useState(true);
  const [value, setValue] = useState(title);
  const handleContent = (e) => {
    setValue(e.target.value);
  };
  const finishEdit = () => {
    setEditMode(false);
    setTitle(value);
  };
  return (
    <div className="px-5 mt-4">
      {editMode !== true ? (
        <div className="d-flex justify-content-between align-items-center">
          <h2
            style={{
              width: "calc(100% - 100px)",
            }}
          >
            {value}
          </h2>

          <EditOutlined
            style={{ fontSize: "16px" }}
            onClick={() => setEditMode(true)}
          />
        </div>
      ) : (
        <>
          <Input.Group compact className="p-2">
            <Input
              style={{
                width: "calc(100% - 100px)",
                fontWeight: "regular",
                fontSize: "18px",
                height: "40px",
              }}
              value={value}
              onChange={handleContent}
              placeholder="Mettre un titre"
            />
            <Button
              style={{ width: "100px", height: "40px" }}
              type="primary"
              disabled={value.length <= 5}
              onClick={finishEdit}
            >
              Enregistrer
            </Button>
          </Input.Group>
        </>
      )}
    </div>
  );
}
