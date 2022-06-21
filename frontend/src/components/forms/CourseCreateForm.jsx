import { Badge, Button, Select } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import React from "react";
import { assetsLocations } from "../../utils/assetsLocations";

const { Option } = Select;

export default function CourseCreateForm({
  handleChange,
  handleSubmit,
  handleImageUpload,
  setValues,
  values,
  image,
  uploadButtonText,
  handleImageRemove,
}) {
  const children = [];
  for (let i = 9.99; i <= 100; i += 10) {
    children.push(
      <Option key={i.toFixed(2)} value={i.toFixed(2)}>
        ${i.toFixed(2)}
      </Option>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Course Name"
          name="title"
          value={values.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mb-2">
        <textarea
          col="7"
          rows={"3"}
          className="form-control"
          placeholder="Course Description"
          name="description"
          value={values.description}
          onChange={handleChange}
        />
      </div>
      <div class="row mb-2">
        <div class="col-8">
          <Select
            value={values.paid}
            style={{ width: "100%" }}
            size="large"
            onChange={(value) => setValues({ ...values, paid: value })}
          >
            <Option value={true}>Paid</Option>
            <Option value={false}>Free</Option>
          </Select>
        </div>
        <div class="col-4">
          <Select
            defaultValue={9.99}
            value={!values.paid ? "0" : values.price}
            style={{ width: "100%" }}
            size="large"
            onChange={(value) => setValues({ ...values, price: value })}
            tokenSeparators={[","]}
            disabled={!values.paid}
          >
            {children}
          </Select>
        </div>
      </div>
      <div className="form-row mb-2">
        <div className="col">
          <div className="form-group">
            <label
              for="imageUpload"
              className="btn btn-outline-secondary btn-block text-left"
            >
              {uploadButtonText}
            </label>
            <input
              type="file"
              id="imageUpload"
              name="image"
              onChange={handleImageUpload}
              accept="image/*"
              hidden
            />
          </div>
        </div>
        {image ? (
          <div className="col">
            <Badge count="X" className="pointer" onClick={handleImageRemove}>
              <Avatar
                src={`${assetsLocations.images}/${image}`}
                shape="square"
                size={100}
              />
            </Badge>
          </div>
        ) : (
          <SkeletonAvatar shape="square" size={100} />
        )}
      </div>

      <div className="row">
        <div className="col">
          <Button
            onClick={handleSubmit}
            disabled={values.loading || values.uploading}
            className="btn btn-primary"
            loading={values.loading}
            type="primary"
            size="large"
            shape="round"
          >
            {values.loading ? "Saving..." : "Save & Continue"}
          </Button>
        </div>
      </div>
    </form>
  );
}
