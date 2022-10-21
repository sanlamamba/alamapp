import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

export default function TitleHandler({
  index,
  saveContent,
  content = "",
  removeContent,
}) {
  const inputRef = useRef();
  const [value, setValue] = useState({
    editMode: true,
    content: "",
  });
  const handleContent = (e) => {
    setValue({ ...value, content: e.target.value });
  };
  const finishEdit = () => {
    saveContent(index, value.content);
    setValue({
      ...value,
      editMode: false,
    });
  };
  const startEdit = () => {
    setValue({
      ...value,
      editMode: true,
    });
  };
  useEffect(() => {
    console.log("HIT");

    if (content == "") {
      setValue({
        editMode: true,
        content: content,
      });
      //  inputRef.current.focus();
    } else {
      setValue({
        editMode: false,
        content: content,
      });
    }
  }, []);
  return (
    <>
      {value.editMode !== true ? (
        <div className="d-flex justify-content-between align-items-center">
          <h2
            style={{
              width: "calc(100% - 100px)",
            }}
          >
            {value.content}
          </h2>

          <EditOutlined
            style={{ fontSize: "16px" }}
            onClick={() => startEdit()}
          />
          <DeleteOutlined
            style={{ fontSize: "16px" }}
            onClick={() => removeContent(index)}
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
              }}
              value={value.content}
              onChange={handleContent}
              placeholder="Mettre un titre"
            />
            <Button
              style={{ width: "100px", height: "100%" }}
              type="primary"
              disabled={value.content.length <= 5}
              onClick={finishEdit}
            >
              Enregistrer
            </Button>
          </Input.Group>
        </>
      )}
    </>
  );
}
