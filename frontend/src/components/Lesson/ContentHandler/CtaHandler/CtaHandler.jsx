import {
  AlignLeftOutlined,
  FileImageOutlined,
  FontColorsOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

export default function CtaHandler({
  addNewContent,
  readyForSubmit,
  values,
  handleSubmit,
}) {
  return (
    <div className="d-flex justify-content-between bg-light rounded-5 p-2 w-auto">
      <div>
        <button
          type="button"
          className="btn btn-light rounded-5 mx-1 p-0"
          onClick={() => addNewContent("titre")}
        >
          <Tooltip title="Ajouter un titre" className="p-2">
            <FontColorsOutlined style={{ fontSize: "20px" }} />
          </Tooltip>
        </button>
        <button
          type="button"
          className="btn btn-light rounded-5 mx-1 p-0"
          onClick={() => addNewContent("texte")}
        >
          <Tooltip title="Ajouter du text" className="p-2">
            <AlignLeftOutlined style={{ fontSize: "20px" }} />
          </Tooltip>
        </button>
        <button type="button" className="btn btn-light rounded-5 mx-1 p-0">
          <Tooltip
            title="Ajouter un lien"
            className="p-2"
            onClick={() => addNewContent("lien")}
          >
            <LinkOutlined style={{ fontSize: "20px" }} />
          </Tooltip>
        </button>

        <button
          type="button"
          className="btn btn-light rounded-5 mx-1 p-0"
          onClick={() => addNewContent("image")}
        >
          <Tooltip title="Ajouter une image" className="p-2">
            <FileImageOutlined style={{ fontSize: "20px" }} />
          </Tooltip>
        </button>
      </div>
      <div>
        <button
          type="button"
          className={`btn  rounded-5 align-self-end ${
            values.title === "" || values.video === ""
              ? "btn-secondary"
              : "btn-primary"
          }`}
          disabled={values.title === "" || values.video === ""}
          onClick={() => handleSubmit()}
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}
