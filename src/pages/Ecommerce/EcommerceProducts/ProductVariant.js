import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Input,
  Row,
} from "reactstrap";
import classnames from "classnames";
import { Input as InputNew, Select } from "antd";

const ProductVariant = ({ customActiveTab, toggleCustom, validation }) => {
  const [gst, setGst] = useState("include");

  let formattedPrice;
  let normalPrice;
  let discountPrice =
    (validation.values.originPrice * validation.values.discount) / 100;
  let gstPercentage = validation.values.cgst + validation.values.sgst;

  if (gst === "include") {
    formattedPrice = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(
      discountPrice !== 0
        ? validation.values.originPrice -
            (discountPrice + (discountPrice * gstPercentage) / 100)
        : validation.values.originPrice - gstPercentage / 100
    );
    normalPrice =
      discountPrice !== 0
        ? validation.values.originPrice -
          (discountPrice + (discountPrice * gstPercentage) / 100)
        : validation.values.originPrice - gstPercentage / 100;
  } else {
    let r = (validation.values.originPrice * gstPercentage) / 100;
    formattedPrice = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(
      (discountPrice !== 0
        ? validation.values.originPrice - discountPrice
        : validation.values.originPrice) + r
    );
    normalPrice =
      (discountPrice !== 0
        ? validation.values.originPrice - discountPrice
        : validation.values.originPrice) + r;
  }

  useEffect(() => {
    if (validation.values.price > validation.values.originPrice) {
      setGst("exclude");
    } else {
      setGst("include");
    }
    if (normalPrice) {
      validation.setFieldValue("price", normalPrice.toFixed());
    }
  }, [validation.values.price, normalPrice]);

  const { Option } = Select;
  const selectAfter = (
    <Select onChange={(e) => setGst(e)} defaultValue="include">
      <Option value="include">include</Option>
      <Option value="exclude">exclude</Option>
    </Select>
  );
  return (
    <>
      <Card>
        <CardHeader>
          <h5 className="card-title mb-0">Sales information</h5>
        </CardHeader>

        <CardBody>
          <Row>
            <Col sm={6}>
              <div className="mb-3">
                <label className="form-label">Old Price</label>
                <Input
                  type="number"
                  placeholder="Enter originPrice"
                  value={validation.values.originPrice || ""}
                  onChange={validation.handleChange}
                  invalid={
                    validation.errors.originPrice &&
                    validation.touched.originPrice
                  }
                  name="originPrice"
                />
                {validation.errors.originPrice &&
                  validation.touched.originPrice && (
                    <div className="invalid-feedback">
                      {validation.errors.originPrice}
                    </div>
                  )}
              </div>
            </Col>
            <Col sm={6}>
              <div className="mb-3">
                <label className="form-label">New price</label>
                <div
                  className="text-danger"
                  readOnly={true}
                  onChange={validation.handleChange}
                  invalid={validation.errors.price && validation.touched.price}
                  name="price"
                >
                  <Input disabled value={formattedPrice} />
                </div>
                {validation.errors.price && validation.touched.price && (
                  <div className="invalid-feedback">
                    {validation.errors.price}
                  </div>
                )}
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm={6}>
              <div className="mb-3">
                <label className="form-label">Discount</label>
                <Input
                  type="number"
                  placeholder="Enter % Discount"
                  value={validation.values.discount || ""}
                  onChange={validation.handleChange}
                  invalid={
                    validation.errors.discount && validation.touched.discount
                  }
                  name="discount"
                />

                {validation.errors.discount && validation.touched.discount && (
                  <div className="invalid-feedback">
                    {validation.errors.discount}
                  </div>
                )}
              </div>
            </Col>

            <Col sm={6}>
              <div className="mb-3">
                <label className="form-label">Discount End Date</label>
                <Input
                  type="date"
                  placeholder="Enter the Discount End Date"
                  onChange={validation.handleChange}
                  invalid={
                    validation.errors.discountenddate &&
                    validation.touched.discountenddate
                  }
                  name="discountenddate"
                />
                {validation.errors.discountenddate &&
                  validation.touched.discountenddate && (
                    <div className="invalid-feedback">
                      {validation.errors.discountenddate}
                    </div>
                  )}
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm={6}>
              <div className="mb-3">
                <label className="form-label">Qty</label>
                <Input
                  type="text"
                  placeholder="Enter the warehouse quantity"
                  value={validation.values.quantity || ""}
                  onChange={validation.handleChange}
                  invalid={
                    validation.errors.quantity && validation.touched.quantity
                  }
                  name="quantity"
                />
                {validation.errors.quantity && validation.touched.quantity && (
                  <div className="invalid-feedback">
                    {validation.errors.quantity}
                  </div>
                )}
              </div>
            </Col>
            <Col sm={6}>
              <div className="mb-3">
                <label className="form-label">Weight</label>
                <Input
                  type="Weight"
                  placeholder="Enter Weight"
                  onChange={validation.handleChange}
                  value={validation.values.weight || ""}
                  invalid={
                    validation.errors.weight && validation.touched.weight
                  }
                  name="weight"
                />
                {validation.errors.weight && validation.touched.weight && (
                  <div className="invalid-feedback">
                    {validation.errors.weight}
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <div className="mb-3">
                <label className="form-label">CGST</label>
                <InputNew
                  addonAfter={selectAfter}
                  type="number"
                  placeholder="Enter the cgst in %"
                  value={validation.values.cgst || ""}
                  onChange={validation.handleChange}
                  invalid={validation.errors.cgst && validation.touched.cgst}
                  name="cgst"
                />
                {/* <Input
                  type="text"
                  placeholder="Enter the cgst"
                  value={validation.values.cgst || ""}
                  onChange={validation.handleChange}
                  invalid={validation.errors.cgst && validation.touched.cgst}
                  name="cgst"
                /> */}
                {validation.errors.cgst && validation.touched.cgst && (
                  <div className="invalid-feedback">
                    {validation.errors.cgst}
                  </div>
                )}
              </div>
            </Col>
            <Col sm={6}>
              <div className="mb-3">
                <label className="form-label">SGST</label>
                <InputNew
                  addonAfter={selectAfter}
                  type="number"
                  placeholder="Enter the sgst"
                  value={validation.values.sgst || ""}
                  onChange={validation.handleChange}
                  invalid={validation.errors.sgst && validation.touched.sgst}
                  name="sgst"
                />
                {/* <Input
                  type="text"
                  placeholder="Enter the sgst"
                  value={validation.values.sgst || ""}
                  onChange={validation.handleChange}
                  invalid={validation.errors.sgst && validation.touched.sgst}
                  name="sgst"
                /> */}
                {validation.errors.sgst && validation.touched.sgst && (
                  <div className="invalid-feedback">
                    {validation.errors.sgst}
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <div className="mb-3">
                <label className="form-label">Video Link</label>
                <Input
                  type="text"
                  placeholder="Enter Link..."
                  value={validation.values.video || ""}
                  onChange={validation.handleChange}
                  invalid={validation.errors.video && validation.touched.video}
                  name="video"
                />
                {validation.errors.video && validation.touched.video && (
                  <div className="invalid-feedback">
                    {validation.errors.video}
                  </div>
                )}
              </div>
            </Col>
            <Col sm={6}>
              <div className="mb-3">
                <label className="form-label">For</label>
                {/* <Input
                  type="text"
                  placeholder="Enter here..."
                  value={validation.values.gender || ""}
                  onChange={validation.handleChange}
                  invalid={
                    validation.errors.gender && validation.touched.gender
                  }
                  name="gender"
                /> */}
                <Select
                  style={{ width: "100%", height: "40px", borderRadius: "3px" }}
                  onChange={(e) => validation.setFieldValue("gender", e)}
                  value={validation.values.gender}
                >
                  <Option value={"male"}>Male</Option>
                  <Option value={"female"}>Female</Option>
                  <Option value={"both"}>Both</Option>
                </Select>
                {validation.errors.gender && validation.touched.gender && (
                  <div className="invalid-feedback">
                    {validation.errors.gender}
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default ProductVariant;
