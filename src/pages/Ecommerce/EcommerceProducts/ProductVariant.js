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
import { Input as InputNew, Select as AntSelect } from "antd";
import Select from "react-select";

const ProductVariant = ({ customActiveTab, toggleCustom, validation }) => {
  const [gst, setGst] = useState("include");
  let formattedPrice;
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
  }

  useEffect(() => {
    if (validation.values.price > validation.values.originPrice) {
      setGst("exclude");
    } else {
      setGst("include");
    }
  }, [validation.values.price]);

  const { Option } = AntSelect;
  const selectAfter = (
    <AntSelect onChange={(e) => setGst(e)} defaultValue="include">
      <Option value="include">include</Option>
      <Option value="exclude">exclude</Option>
    </AntSelect>
  );

  return (
    <>
      <Card>
        <CardHeader>
          <Nav className="nav-tabs-custom card-header-tabs border-bottom-0">
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                className={classnames({
                  active: customActiveTab === "1",
                })}
                onClick={() => {
                  toggleCustom("1");
                }}
              >
                Sales information
              </NavLink>
            </NavItem>
          </Nav>
        </CardHeader>

        <CardBody>
          <Row>
            <Col sm={6}>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <Input
                  type="number"
                  placeholder="Enter price"
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
          </Row>

          <Row>
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
                <label className="form-label">New price</label>
                <div
                  className="text-danger"
                  readOnly={true}
                  onChange={validation.handleChange}
                  invalid={validation.errors.price && validation.touched.price}
                  name="price"
                >
                  <Input
                    onChange={validation.handleChange}
                    disabled
                    value={formattedPrice}
                  />
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
                <label className="form-label">Gender</label>
                <Select
                  // value={validation.values.cod || ""}
                  onChange={(selectedOption) =>
                    validation.handleChange("gender")(selectedOption.value)
                  }
                  name="gender"
                  options={[
                    { label: "male", value: "Male" },
                    { label: "female", value: "Female" },
                    { label: "both", value: "Both" },
                  ]}
                  isInvalid={validation.errors.cod && validation.touched.cod}
                />
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
