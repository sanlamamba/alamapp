import {
  AlignLeftOutlined,
  FileImageOutlined,
  FontColorsOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/Icon";
import { Tooltip } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import CtaHandler from "./CtaHandler/CtaHandler";
import ImageHandler from "./ImageHandler/ImageHandler";
import LinkHandler from "./LinkHandler/LinkHandler";
import TexteHandler from "./TexteHandler/TexteHandler";
import TitleHandler from "./TitleHandler/TitleHandler";

export default function ContentHandler({
  editContent,
  content,
  setContent,
  readyForSubmit,
  handleSubmit,
  values,
}) {
  const [adding, setAdding] = useState(false);
  const removeContent = (index) => {
    const newContent = content;
    newContent.splice(index, 1);
    setContent([...newContent]);
  };
  const addNewContent = (type) => {
    setAdding(true);
    const newContent = {
      type,
      content: "",
    };
    setContent([...content, newContent]);
  };
  const saveContent = (index, newContent) => {
    const contentContainer = content;
    //     console.log(contentContainer[index]);
    contentContainer[index].content = newContent;
    setContent([...contentContainer]);
  };
  useEffect(() => {
    editContent(content);
  }, [...content]);

  return (
    <div className="d-flex py-2 px-5 flex-column">
      {/* <TitleHandler /> */}
      {content.map((element, index) => (
        <ContentRenderer
          type={element.type}
          index={index}
          saveContent={saveContent}
          content={element.content}
          key={`element ${index}`}
          removeContent={removeContent}
        />
      ))}

      <CtaHandler
        handleSubmit={handleSubmit}
        values={values}
        addNewContent={addNewContent}
        readyForSubmit={readyForSubmit}
      />
    </div>
  );
}

function ContentRenderer({ type, index, saveContent, content, removeContent }) {
  if (type === "titre") {
    return (
      <TitleHandler
        index={index}
        saveContent={saveContent}
        content={content}
        removeContent={removeContent}
      />
    );
  }
  if (type === "texte") {
    return (
      <TexteHandler
        index={index}
        saveContent={saveContent}
        content={content}
        removeContent={removeContent}
      />
    );
  }
  if (type === "lien") {
    return (
      <LinkHandler
        index={index}
        saveContent={saveContent}
        content={content}
        removeContent={removeContent}
      />
    );
  }
  if (type === "image") {
    return (
      <ImageHandler
        index={index}
        saveContent={saveContent}
        content={content}
        removeContent={removeContent}
      />
    );
  }

  return "ERROR !";
}
