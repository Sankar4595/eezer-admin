import React from "react";

const EcommerceOrderProduct = (props) => {
  return (
    <React.Fragment>
      <tr>
        <td>
          <div className="d-flex">
            <div className="flex-shrink-0 avatar-md bg-light rounded p-1">
              <img
                src={props.item.product.images[0].url}
                alt=""
                className="img-fluid d-block"
              />
            </div>
            <div className="flex-grow-1 ms-3">
              <h5 className="fs-15">
                <a
                  href="apps-ecommerce-product-details"
                  className="text-reset"
                  title={props.item.product.name}
                >
                  {props.item.product.name.substring(0, 44) + "..."}
                </a>
              </h5>

              <p className="text-muted mb-0">
                Color:{" "}
                <span className="fw-medium">{"props.product.color"}</span>
              </p>
              <p className="text-muted mb-0">
                Size: <span className="fw-medium">{"props.product.size"}</span>
              </p>
            </div>
          </div>
        </td>
        <td>
          {parseFloat(props.item.price).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </td>

        <td>{props.item.quantity}</td>
        <td>
          <div className="text-warning fs-15">
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-half-fill"></i>
          </div>
        </td>
        <td className="fw-medium text-end">
          {(props.item.price * props.item.quantity).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </td>
      </tr>
    </React.Fragment>
  );
};

export default EcommerceOrderProduct;
