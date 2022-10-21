import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

export default function TexteHandler({
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
      <hr />
      {value.editMode !== true ? (
        <div className="d-flex justify-content-between align-items-center">
          <p
            style={{
              width: "calc(100% - 100px)",
            }}
          >
            {value.content}
          </p>

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
          <TextArea
            showCount
            rows={8}
            value={value.content}
            onChange={handleContent}
            placeholder="Ajouter du texte"
          />
          <Button
            style={{ width: "100px", height: "100%", marginBottom: "20px" }}
            type="primary"
            disabled={value.content.length <= 25}
            onClick={finishEdit}
          >
            Enregistrer
          </Button>
        </>
      )}
    </>
  );
}
