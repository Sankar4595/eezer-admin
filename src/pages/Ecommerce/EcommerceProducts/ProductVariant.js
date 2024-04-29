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
  let discountPrice =
    (validation.values.price * validation.values.discount) / 100;
  let gstPercentage = validation.values.cgst + validation.values.sgst;

  if (gst === "include") {
    formattedPrice = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(
      discountPrice !== 0
        ? validation.values.price -
            (discountPrice + (discountPrice * gstPercentage) / 100)
        : validation.values.price - gstPercentage / 100
    );
  } else {
    let r = (validation.values.price * gstPercentage) / 100;
    formattedPrice = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(
      (discountPrice !== 0
        ? validation.values.price - discountPrice
        : validation.values.price) + r
    );
  }

  useEffect(() => {
    if (validation.values.newPrice > validation.values.price) {
      setGst("exclude");
    } else {
      setGst("include");
    }
  }, [validation.values.newPrice]);

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
                  value={validation.values.price || ""}
                  onChange={validation.handleChange}
                  invalid={validation.errors.price && validation.touched.price}
                  name="price"
                />
                {validation.errors.price && validation.touched.price && (
                  <div className="invalid-feedback">
                    {validation.errors.price}
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
                  value={validation.values.stock || ""}
                  onChange={validation.handleChange}
                  invalid={validation.errors.stock && validation.touched.stock}
                  name="stock"
                />
                {validation.errors.stock && validation.touched.stock && (
                  <div className="invalid-feedback">
                    {validation.errors.stock}
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
                  invalid={
                    validation.errors.newPrice && validation.touched.newPrice
                  }
                  name="newPrice"
                >
                  <Input disabled value={formattedPrice} />
                </div>
                {validation.errors.newPrice && validation.touched.newPrice && (
                  <div className="invalid-feedback">
                    {validation.errors.newPrice}
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
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default ProductVariant;
