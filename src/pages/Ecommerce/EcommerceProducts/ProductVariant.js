import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Input,
  Label,
  FormFeedback,
  Form,
  Button,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Row,
  UncontrolledTooltip,
  Alert,
  Table,
} from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";

const ProductVariant = ({ customActiveTab, toggleCustom, validation }) => {
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(
    validation.values.price -
      (validation.values.price * validation.values.discount) / 100
  );

  const [showVariationForm, setShowVariationForm] = useState(false);
  const [columns, setColumns] = useState([
    { id: 0, value: "" }, // Ban đầu có một cột
  ]);
  const handleAddVariationClick = () => {
    setShowVariationForm(true);
  };
  const handleCloseClick = () => {
    setShowVariationForm(false);
    setShowVariationForm2(false);
    setColumns([{ id: 0, value: "" }]);
    setColumns2([{ id: 0, value: "" }]);
  };

  const handleInputChange = (text, columnIndex) => {
    const updatedColumns = [...columns];
    updatedColumns[columnIndex].value = text;

    // Kiểm tra nếu người dùng gõ vào cột cuối cùng, thêm một cột mới
    if (columnIndex === updatedColumns.length - 1) {
      updatedColumns.push({ id: columns.length, value: "" });
    }

    setColumns(updatedColumns);
  };
  const handleDeleteColumn = (columnId) => {
    // Kiểm tra nếu columnId khác 1 (cột đầu tiên), thì mới cho phép xóa
    if (columnId !== 0) {
      const updatedColumns = columns.filter((column) => column.id !== columnId);
      setColumns(updatedColumns);
    }
  };
  //PHÂN LOẠI 2
  const [showVariationForm2, setShowVariationForm2] = useState(false);
  const [columns2, setColumns2] = useState([{ id: 0, value: "" }]); // Ban đầu có một cột

  const handleAddVariationClick2 = () => {
    setShowVariationForm2(true);
  };

  const handleCloseClick2 = () => {
    setShowVariationForm2(false);
    setColumns2([{ id: 0, value: "" }]);
  };

  const handleInputChange2 = (text, columnIndex) => {
    const updatedColumns2 = [...columns2];
    updatedColumns2[columnIndex].value = text;

    // Kiểm tra nếu người dùng gõ vào cột cuối cùng, thêm một cột mới
    if (columnIndex === updatedColumns2.length - 1) {
      updatedColumns2.push({ id: columns2.length, value: "" });
    }

    setColumns2(updatedColumns2);
  };

  const handleDeleteColumn2 = (columnId) => {
    // Kiểm tra nếu columnId khác 1 (cột đầu tiên), thì mới cho phép xóa
    if (columnId !== 0) {
      const updatedColumns2 = columns2.filter(
        (column) => column.id !== columnId
      );
      setColumns2(updatedColumns2);
    }
  };
  //FOCUS
  const [groupLabel, setGroupLabel] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setInputFocused] = useState({}); // Một đối tượng để theo dõi trạng thái focus của các ô input
  // Giá trị outline cố định
  const outlineStyle = "2px solid #007bff";

  const handleInputFocus = (inputName) => {
    setInputFocused((prev) => ({
      ...prev,
      [inputName]: true, // Đánh dấu ô input với tên `inputName` được focus
    }));
  };

  const handleInputBlur = (inputName) => {
    setInputFocused((prev) => ({
      ...prev,
      [inputName]: false, // Đánh dấu ô input với tên `inputName` mất focus
    }));
  };

  const inputField = [
    {
      name: "input1",
      placeholder: "Example: color",
      label: "Category group 1",
    },
    {
      name: "input2",
      placeholder: "Example: another field",
      label: "Category group 2",
    },
    // Thêm các ô input khác vào mảng inputFields
  ];

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
          {!showVariationForm && (
            <Row>
              <Col sm={6}>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <Input
                    type="text"
                    placeholder="Enter price"
                    value={validation.values.price || ""}
                    onChange={validation.handleChange}
                    invalid={
                      validation.errors.price && validation.touched.price
                    }
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
                    type="text"
                    placeholder="Enter % Discount"
                    value={validation.values.discount || ""}
                    onChange={validation.handleChange}
                    invalid={
                      validation.errors.discount && validation.touched.discount
                    }
                    name="discount"
                  />
                  {validation.errors.discount &&
                    validation.touched.discount && (
                      <div className="invalid-feedback">
                        {validation.errors.discount}
                      </div>
                    )}
                </div>
              </Col>
            </Row>
          )}

          {!showVariationForm && (
            <Row>
              <Col sm={6}>
                <div className="mb-3">
                  <label className="form-label">Qty</label>
                  <Input
                    type="text"
                    placeholder="Enter the warehouse quantity"
                    value={validation.values.stock || ""}
                    onChange={validation.handleChange}
                    invalid={
                      validation.errors.stock && validation.touched.stock
                    }
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
                  {validation.errors.newPrice &&
                    validation.touched.newPrice && (
                      <div className="invalid-feedback">
                        {validation.errors.newPrice}
                      </div>
                    )}
                </div>
              </Col>
            </Row>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default ProductVariant;
