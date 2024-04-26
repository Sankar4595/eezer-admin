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
                    type="text"
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
          )}
        </CardBody>

      </Card>
      <Card>
        <CardBody>
          {!showVariationForm && (
            <Row style={{ marginBottom: "10px" }}>
              <div
                style={{
                  position: "relative",
                  //backgroundColor: "#f6f6f6",
                  padding: "16px",
                  borderRadius: "5px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  marginTop: "15px",
                }}
              >
                <Col sm={6}>
                  <Button
                    className="primary-dash-button"
                    onClick={handleAddVariationClick}
                  >
                    <i className="shopee-icon">+</i> Add Variation group 1
                  </Button>
                </Col>
              </div>
            </Row>
          )}
          {showVariationForm && (
            <Row style={{ marginBottom: "10px" }}>
              <div
                style={{
                  position: "relative",
                  backgroundColor: "#f6f6f6",
                  padding: "16px",
                  borderRadius: "5px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  marginTop: "15px",
                }}
              >
                <Button
                  className="btn btn-soft-danger"
                  style={{ position: "absolute", top: 0, right: 0 }}
                  onClick={handleCloseClick}
                >
                  <i className="ri-delete-bin-2-line"></i>
                </Button>
                <Row style={{ marginBottom: "10px" }}>
                  <Col sm={2}>
                    <Label>Classification group 1</Label>
                  </Col>
                  <Col sm={4}>
                    <Input
                      type="text"
                      placeholder={inputField[0].placeholder}
                      onChange={(e) => setGroupLabel(e.target.value)}
                      onFocus={() => handleInputFocus(inputField[0].name)}
                      onBlur={() => handleInputBlur(inputField[0].name)}
                      style={{
                        outline: isInputFocused[inputField[0].name]
                          ? outlineStyle
                          : "",
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm={2}>
                    <Label>Classification of goods</Label>
                  </Col>
                  <Col sm={10}>
                    <Row>
                      {columns.map((column, index) => (
                        <Col sm={4} key={column.id}>
                          <Input
                            style={{ marginBottom: "15px" }}
                            type="text"
                            placeholder="for example: White, Red etc"
                            value={column.value}
                            onChange={(e) => {
                              setInputValue(e.target.value);
                              handleInputChange(e.target.value, index);
                            }}
                          />
                          <Button
                            className="btn btn-soft-danger"
                            style={{ position: "absolute", top: 0, right: 0 }}
                            onClick={() => handleDeleteColumn(column.id)}
                          >
                            <i className="ri-delete-back-2-line"></i>
                          </Button>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
              </div>
            </Row>
          )}
          {showVariationForm && !showVariationForm2 && (
            <Row style={{ marginBottom: "10px" }}>
              <div
                style={{
                  position: "relative",
                  backgroundColor: "#f6f6f6",
                  padding: "16px",
                  borderRadius: "5px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  marginTop: "15px",
                }}
              >
                <Col sm={6}>
                  <Button
                    className="primary-dash-button"
                    onClick={handleAddVariationClick2}
                  >
                    <i className="shopee-icon">+</i> Add Variation group 2
                  </Button>
                </Col>
              </div>
            </Row>
          )}
          {showVariationForm2 && (
            <Row style={{ marginBottom: "10px" }}>
              <div
                style={{
                  position: "relative",
                  backgroundColor: "#f6f6f6",
                  padding: "16px",
                  borderRadius: "5px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  marginTop: "15px",
                }}
              >
                <Button
                  className="btn btn-soft-danger"
                  style={{ position: "absolute", top: 0, right: 0 }}
                  onClick={handleCloseClick2}
                >
                  <i className="ri-delete-bin-2-line"></i>
                </Button>
                <Row style={{ marginBottom: "10px" }}>
                  <Col sm={2}>
                    <Label>Classification group 2</Label>
                  </Col>
                  <Col sm={4}>
                    <Input
                      type="text"
                      placeholder="For example: size
"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm={2}>
                    <Label>Classification of goods</Label>
                  </Col>
                  <Col sm={10}>
                    <Row>
                      {columns2.map((column, index) => (
                        <Col sm={4} key={column.id}>
                          <Input
                            style={{ marginBottom: "15px" }}
                            type="text"
                            placeholder="ví dụ: Lớn, Nhỏ v.v"
                            value={column.value}
                            onChange={(e) =>
                              handleInputChange2(e.target.value, index)
                            }
                          />
                          <Button
                            className="btn btn-soft-danger"
                            style={{ position: "absolute", top: 0, right: 0 }}
                            onClick={() => handleDeleteColumn2(column.id)}
                          >
                            <i className="ri-delete-back-2-line"></i>
                          </Button>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                  {/**Tự thêm cột y hệt để gõ tiếp tại đây */}
                </Row>
              </div>
            </Row>
          )}
          {showVariationForm && (
            <Row style={{ marginBottom: "10px" }}>
              <div className="table-responsive">
                <Table className="table-bordered border-secondary table-nowrap align-middle mb-0">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        style={{
                          outline: isInputFocused[inputField[0].name]
                            ? outlineStyle
                            : "",
                        }}
                      >
                        {groupLabel ? `${groupLabel}` : inputField[0].label}
                      </th>
                      {showVariationForm2 && (
                        <th scope="col">Classification group 2</th>
                      )}
                      <th scope="col">Price</th>
                      <th scope="col">Warehouse</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-medium">{inputValue}</td>
                      {showVariationForm2 && <td>Implement new UX</td>}
                      <td>
                        <span className="badge bg-primary-subtle text-primary">
                          Backlog
                        </span>
                      </td>
                      <td>Lanora Sandoval</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Row>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default ProductVariant;
