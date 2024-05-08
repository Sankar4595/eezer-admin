import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  CardHeader,
  Collapse,
} from "reactstrap";

import classnames from "classnames";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { productDetails } from "../../../common/data/ecommerce";
import EcommerceOrderProduct from "./EcommerceOrderProduct";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
//redux
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { getOrderById as onGetOrderByID } from "../../../slices/thunks";

const EcommerceOrderDetail = (props) => {
  const [col1, setcol1] = useState(true);
  const [col2, setcol2] = useState(true);
  const [col3, setcol3] = useState(true);
  const { _id: orderId } = useParams();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.Ecommerce.orderDetails);
  useEffect(() => {
    if (orderDetails && !orderDetails.length) {
      dispatch(onGetOrderByID(orderId));
    }
  }, [orderId, dispatch]);
  const shippingAddress =
    orderDetails && orderDetails.shippingAddress
      ? orderDetails.shippingAddress
      : "";
  function togglecol1() {
    setcol1(!col1);
  }

  function togglecol2() {
    setcol2(!col2);
  }

  function togglecol3() {
    setcol3(!col3);
  }

  document.title = "Order Details | Eezer - React Admin & Dashboard Template";
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Order Details" pageTitle="E-commerce" />

        <Row>
          <Col xl={9}>
            <Card>
              <CardHeader>
                <div className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">
                    {"Order " + orderDetails._id}
                  </h5>
                  <div className="flex-shrink-0">
                    <Link
                      to={`/apps-invoices-details/${orderDetails._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      <i className="ri-download-2-fill align-middle me-1"></i>{" "}
                      Bill{" "}
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="table-responsive table-card">
                  <table className="table table-nowrap align-middle table-borderless mb-0">
                    <thead className="table-light text-muted">
                      <tr>
                        <th scope="col">Product details</th>
                        <th scope="col">Unit price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Evaluation</th>
                        <th scope="col" className="text-end">
                          into money
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails &&
                        orderDetails.items &&
                        orderDetails.items.map((item, key) => (
                          <EcommerceOrderProduct item={item} key={key} />
                        ))}

                      {orderDetails && (
                        <tr className="border-top border-top-dashed">
                          <td colSpan="3"></td>
                          <td colSpan="2" className="fw-medium p-0">
                            <table className="table table-borderless mb-0">
                              <tbody>
                                <tr>
                                  <td>
                                    Total :{" "}
                                    {orderDetails.totalItem &&
                                      orderDetails.totalItem.toLocaleString(
                                        "en-IN",
                                        {
                                          style: "currency",
                                          currency: "INR",
                                        }
                                      )}
                                  </td>
                                  <td className="text-end"></td>
                                </tr>
                                <tr>
                                  <td>
                                    Discount{" "}
                                    <span className="text-muted">
                                      (Eezer15)
                                    </span>{" "}
                                    : {orderDetails.voucher}%
                                  </td>
                                  <td className="text-end"></td>
                                </tr>
                                <tr>
                                  <td>
                                    Shipping fee :{" "}
                                    {orderDetails.shippingCost &&
                                      orderDetails.shippingCost.toLocaleString(
                                        "en-IN",
                                        {
                                          style: "currency",
                                          currency: "INR",
                                        }
                                      )}
                                  </td>
                                  <td className="text-end"></td>
                                </tr>
                                <tr>
                                  <td>Tax: {orderDetails.taxFee}%</td>
                                  <td className="text-end"></td>
                                </tr>
                                <tr className="border-top border-top-dashed">
                                  <th scope="row">
                                    Total order value:{" "}
                                    {orderDetails.total &&
                                      orderDetails.total.toLocaleString(
                                        "en-IN",
                                        {
                                          style: "currency",
                                          currency: "INR",
                                        }
                                      )}
                                  </th>
                                  <th className="text-end"></th>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <div className="d-sm-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">Order status</h5>
                  <div className="flex-shrink-0 mt-2 mt-sm-0">
                    <Link
                      to="#"
                      className="btn btn-soft-primary btn-sm mt-2 mt-sm-0"
                    >
                      <i className="ri-map-pin-line align-middle me-1"></i>
                      Replace change address
                    </Link>{" "}
                    <Link
                      to="#"
                      className="btn btn-soft-secondary btn-sm mt-2 mt-sm-0"
                    >
                      <i className="mdi mdi-archive-remove-outline align-middle me-1"></i>{" "}
                      Cancel order
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="profile-timeline">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div
                      className="accordion-item border-0"
                      onClick={togglecol1}
                    >
                      <div className="accordion-header" id="headingOne">
                        <Link
                          to="#"
                          className={classnames(
                            "accordion-button",
                            "p-2",
                            "shadow-none",
                            { collapsed: !col1 }
                          )}
                        >
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 avatar-xs">
                              <div className="avatar-title bg-success rounded-circle">
                                <i className="ri-shopping-bag-line"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="fs-15 mb-0 fw-semibold">
                                Ordered -{" "}
                                <span className="fw-normal">
                                  {orderDetails.createDate}
                                </span>
                              </h6>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <Collapse
                        id="collapseOne"
                        className="accordion-collapse"
                        isOpen={col1}
                      >
                        <div className="accordion-body ms-2 ps-5 pt-0">
                          <h6 className="mb-1">Order has been placed</h6>
                          <p className="text-muted">
                            {orderDetails.createDate}
                          </p>

                          <h6 className="mb-1">
                            Staff takes orders and prepares goods
                          </h6>
                          <p className="text-muted mb-0">
                            {orderDetails.modifyDate}
                          </p>
                        </div>
                      </Collapse>
                    </div>
                    <div
                      className="accordion-item border-0"
                      onClick={togglecol2}
                    >
                      <div className="accordion-header" id="headingTwo">
                        <Link
                          to="#"
                          className={classnames(
                            "accordion-button",
                            "p-2",
                            "shadow-none",
                            { collapsed: !col2 }
                          )}
                          href="#collapseTwo"
                        >
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 avatar-xs">
                              <div className="avatar-title bg-success rounded-circle">
                                <i className="mdi mdi-gift-outline"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="fs-15 mb-1 fw-semibold">
                                Packed -{" "}
                                <span className="fw-normal">
                                  {orderDetails.modifyDate}
                                </span>
                              </h6>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <Collapse
                        id="collapseTwo"
                        className="accordion-collapse"
                        isOpen={col2}
                      >
                        <div className="accordion-body ms-2 ps-5 pt-0">
                          <h6 className="mb-1">
                            The order has been sent to the delivery company
                          </h6>
                          <p className="text-muted mb-0">Updating</p>
                        </div>
                      </Collapse>
                    </div>
                    <div
                      className="accordion-item border-0"
                      onClick={togglecol3}
                    >
                      <div className="accordion-header" id="headingThree">
                        <Link
                          to="#"
                          className={classnames(
                            "accordion-button",
                            "p-2",
                            "shadow-none",
                            { collapsed: !col3 }
                          )}
                          href="#collapseThree"
                        >
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 avatar-xs">
                              <div className="avatar-title bg-success rounded-circle">
                                <i className="ri-truck-line"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="fs-15 mb-1 fw-semibold">
                                Delivering -{" "}
                                <span className="fw-normal">Updating</span>
                              </h6>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <Collapse
                        id="collapseThree"
                        className="accordion-collapse"
                        isOpen={col3}
                      >
                        <div className="accordion-body ms-2 ps-5 pt-0">
                          <h6 className="fs-14">Updating</h6>
                          <h6 className="mb-1">
                            The order is being delivered to the recipient
                          </h6>
                          <p className="text-muted mb-0">Updating</p>
                        </div>
                      </Collapse>
                    </div>
                    <div className="accordion-item border-0">
                      <div className="accordion-header" id="headingFour">
                        <Link
                          to="#"
                          className="accordion-button p-2 shadow-none"
                        >
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 avatar-xs">
                              <div className="avatar-title bg-light text-success rounded-circle">
                                <i className="ri-takeaway-fill"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="fs-14 mb-0 fw-semibold">
                                On the way of transportation
                              </h6>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="accordion-item border-0">
                      <div className="accordion-header" id="headingFive">
                        <Link
                          className="accordion-button p-2 shadow-none"
                          to="#"
                        >
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 avatar-xs">
                              <div className="avatar-title bg-light text-success rounded-circle">
                                <i className="mdi mdi-package-variant"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="fs-14 mb-0 fw-semibold">
                                Delivered{" "}
                              </h6>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xl={3}>
            <Card>
              <CardHeader>
                <div className="d-flex">
                  <h5 className="card-title flex-grow-1 mb-0">
                    <i className="mdi mdi-truck-fast-outline align-middle me-1 text-muted"></i>
                    Shipping unit information
                  </h5>
                  <div className="flex-shrink-0">
                    <Link
                      to="#"
                      className="badge bg-primary-subtle text-primary fs-11"
                    >
                      Order tracking
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="text-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/uetqnvvg.json"
                    trigger="loop"
                    colors="primary:#405189,secondary:#0ab39c"
                    style={{ width: "80px", height: "80px" }}
                  ></lord-icon>
                  <h5 className="fs-16 mt-2">UTE Logistics</h5>
                  <p className="text-muted mb-0">
                    {"#ID: " + orderDetails._id}
                  </p>
                  <p className="text-muted mb-0">
                    {"Payment methods:" + orderDetails.paymentMethod}
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <div className="d-flex">
                  <h5 className="card-title flex-grow-1 mb-0">
                    Receiver's information
                  </h5>
                  <div className="flex-shrink-0">
                    <Link to="#" className="link-secondary">
                      View profile
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled mb-0 vstack gap-3">
                  <li>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <img
                          src={avatar3}
                          alt=""
                          className="avatar-sm rounded"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6 className="fs-14 mb-1">
                          {orderDetails.name
                            ? orderDetails.name + "(Haunt)"
                            : orderDetails.user
                            ? orderDetails.user.name + "(Member)"
                            : ""}
                        </h6>
                        <p className="text-muted mb-0">Client</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <i className="ri-mail-line me-2 align-middle text-muted fs-16"></i>
                    {orderDetails.email}
                  </li>
                  <li>
                    <i className="ri-phone-line me-2 align-middle text-muted fs-16"></i>
                    {orderDetails.phoneNumber}
                  </li>
                </ul>
              </CardBody>
            </Card>

            {/* <Card>
              <CardHeader>
                <h5 className="card-title mb-0">
                  <i className="ri-map-pin-line align-middle me-1 text-muted"></i>{" "}
                  Địa chỉ thanh toán
                </h5>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                  <li className="fw-medium fs-14">Joseph Parker</li>
                  <li>+(256) 245451 451</li>
                  <li>2186 Joyce Street Rocky Mount</li>
                  <li>New York - 25645</li>
                  <li>United States</li>
                </ul>
              </CardBody>
            </Card> */}

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">
                  <i className="ri-map-pin-line align-middle me-1 text-muted"></i>{" "}
                  Delivery address
                </h5>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                  <li className="fw-medium fs-14">
                    <span style={{ fontWeight: "bold" }}>Address:</span>{" "}
                    {shippingAddress}
                  </li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">
                  <i className="ri-secure-payment-line align-bottom me-1 text-muted"></i>{" "}
                  Billing Information
                </h5>
              </CardHeader>
              <CardBody>
                <div className="d-flex align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0">Code orders :</p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-0">{orderDetails._id}</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0">Payment methods:</p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-0">{orderDetails.paymentMethod}</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0">Total order value :</p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-0">
                      {" "}
                      {orderDetails.total &&
                        orderDetails.total.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                    </h6>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EcommerceOrderDetail;
