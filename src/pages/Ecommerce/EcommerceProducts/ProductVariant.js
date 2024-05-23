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

const ProductVariant = ({
  customActiveTab,
  toggleCustom,
  validation,
  variation,
}) => {
  const [gstIncluded, setGstIncluded] = useState(true);
  const [discountType, setDiscountType] = useState("flat");
  const [gender, setGender] = useState("male");
  const [formattedPrice, setFormatPrice] = useState();
  const [totalQty, setTotalQty] = useState();

  useEffect(() => {
    // Calculate price based on GST and discount
    let price = calculatePrice(
      validation.values.originPrice,
      validation.values.discount
    );
    setFormatPrice(price);
    validation.setFieldValue("price", price.toFixed());
    validation.setFieldValue("discountType", discountType);

    setTotalQty(getTotalQuantity(variation));
    validation.setFieldValue("quantity", variation[0]?.quantity);

    // Set gender and GST variation
    validation.setFieldValue("gender", gender);
    validation.setFieldValue(
      "gstvariation",
      gstIncluded ? "include" : "exclude"
    );
  }, [
    validation.values.originPrice,
    validation.values.discount,
    variation,
    gender,
    gstIncluded,
  ]);

  const calculatePrice = (originPrice, discount) => {
    let discountedPrice = originPrice;

    if (gstIncluded) {
      discountedPrice -= (originPrice * validation.values.cgst) / 100;
    } else {
      discountedPrice += (originPrice * validation.values.cgst) / 100;
    }

    if (discountType === "flat") {
      discountedPrice -= discount;
    } else {
      discountedPrice -= (originPrice * discount) / 100;
    }

    return discountedPrice;
  };

  const getTotalQuantity = (data) => {
    return data.reduce(
      (totalQty, item) => totalQty + parseInt(item.quantity),
      0
    );
  };

  const { Option } = Select;
  const selectAfter = (
    <Select
      onChange={(e) => setGstIncluded(e === "include")}
      defaultValue="include"
    >
      <Option value="include">include</Option>
      <Option value="exclude">exclude</Option>
    </Select>
  );

  const selectDiscount = (
    <Select onChange={(e) => setDiscountType(e)} defaultValue="flat">
      <Option value="flat">Flat</Option>
      <Option value="%">%</Option>
    </Select>
  );
  return (
    <>
      <Card>
        <CardHeader>
          <h5 className="card-title mb-0">Sales information</h5>
        </CardHeader>

        <CardBody>
          {/* <Row>
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
          </Row> */}

          <Row>
            <Col sm={6}>
              <div className="mb-3">
                <label className="form-label">Discount</label>
                <InputNew
                  addonAfter={selectDiscount}
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
                  value={validation.values.quantity || totalQty}
                  disabled
                  name="quantity"
                />
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
                <label className="form-label">GST</label>
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
                <label className="form-label">For</label>
                <Select
                  style={{ width: "100%", height: "40px", borderRadius: "3px" }}
                  onChange={(e) => setGender(e)}
                  value={gender}
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
