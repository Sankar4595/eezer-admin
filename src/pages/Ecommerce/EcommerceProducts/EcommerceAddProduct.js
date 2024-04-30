import React, { useRef, useState, useEffect } from "react";
import { format } from "date-fns";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Input,
  Label,
  FormFeedback,
  Form,
  Row,
  Alert,
  Table,
  InputGroup,
  InputGroupText,
} from "reactstrap";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts as onGetProducts,
  addNewProduct as onAddNewProduct,
  updateProduct as onUpdateProduct,
} from "../../../slices/thunks";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Dropzone, { useDropzone } from "react-dropzone";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createSelector } from "reselect";
//formik
import { useFormik } from "formik";
import * as Yup from "yup";

// Import React FilePond
import { registerPlugin } from "react-filepond";
import Select from "react-select";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import ProductVariant from "./ProductVariant";
import EcommerceCategory from "./EcommerceCategory";
import EcommerceBrand from "./EcommerceBrand";
import EcommerceColor from "./EcommerceColor";
import EcommerceAttributes from "./EcommerceAttributes";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const EcommerceAddProduct = (props) => {
  document.title = "Add product | Eezer - React Admin & Dashboard Template";

  const history = useNavigate();
  const productId = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [attributeData, setAttributeData] = useState([]);
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [variation, setVariation] = useState([]);
  const dispatch = useDispatch();
  const selectDashboardData = createSelector(
    (state) => state.Ecommerce.products,
    (products) => products
  );
  const products = useSelector(selectDashboardData);
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(onGetProducts());
    }
  }, [dispatch, products]);
  const editorDesRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const editorSpecRef = useRef(null);

  useEffect(() => {
    // Tạo một async hàm bên trong useEffect
    const fetchData = async () => {
      const foundProduct = products.find(
        (product) => product._id === productId._id
      );
      // Cập nhật giá trị của selectedProduct khi tìm thấy sản phẩm
      if (foundProduct) {
        await setSelectedProduct(foundProduct);
        // Sau khi setSelectedProduct hoàn thành, bạn có thể thực hiện các bước tiếp theo ở đây
        setIsEditMode(true);
        validation.setFieldValue("name", foundProduct.name);
        validation.setFieldValue("description", foundProduct.description);
        validation.setFieldValue("specification", foundProduct.specification);
        validation.setFieldValue("price", foundProduct.price);
        validation.setFieldValue("stock", foundProduct.stock);
        validation.setFieldValue("discount", foundProduct.discount);
        const isPublishOption = IsPublishOptions[0].options.find(
          (option) => option.value === foundProduct.isPublish
        );
        validation.setFieldValue("isPublish", isPublishOption);
        validation.setFieldValue(
          "brandArr",
          foundProduct.brandArr.length > 0
            ? JSON.parse(foundProduct.brandArr)
            : foundProduct.brandArr
        );
        validation.setFieldValue(
          "colorArr",
          foundProduct.colorArr.length > 0
            ? JSON.parse(foundProduct?.colorArr)
            : foundProduct.colorArr
        );

        validation.setFieldValue(
          "categoryArr",
          foundProduct.categoryArr.length > 0
            ? JSON.parse(foundProduct.categoryArr)
            : foundProduct.categoryArr
        );

        validation.setFieldValue("video", foundProduct.video);
        validation.setFieldValue("weight", foundProduct.weight);
        validation.setFieldValue(
          "discountenddate",
          foundProduct.discountenddate
        );
        validation.setFieldValue("cgst", foundProduct.cgst);
        validation.setFieldValue("sgst", foundProduct.sgst);
        validation.setFieldValue("shippingdays", foundProduct.shippingdays);
        validation.setFieldValue("cod", foundProduct.cod);
        // validation.setFieldValue(
        //   "productVariation",
        //   foundProduct.productVariation.length > 0
        //     ? JSON.parse(foundProduct.productVariation)
        //     : foundProduct.productVariation
        // );
        setVariation(JSON.parse(foundProduct.productVariation));
        setAttributeData(JSON.parse(foundProduct?.attributeArr));
        await setselectedFiles(foundProduct.images);
        validation.setFieldValue("images", selectedFiles);
        validation.setFieldValue(
          "attributeArr",
          foundProduct?.attributeArr.length > 0
            ? JSON.parse(foundProduct?.attributeArr)
            : foundProduct?.attributeArr
        );
      }
    };

    // Gọi async hàm
    fetchData();
  }, [productId, products, isEditMode]);

  const [isHovered, setIsHovered] = useState(false);

  const handleCardMouseEnter = () => {
    setIsHovered(true);
  };

  const handleCardMouseLeave = () => {
    setIsHovered(false);
  };
  const [selectedFiles, setselectedFiles] = useState([]);
  function handleAcceptedFiles(files, fromClipboard = false) {
    const processedFiles = files.map((file) => {
      const randomFileName = generateRandomString(10);
      const newFile = new File([file], `${randomFileName}.png`, {
        type: file.type,
      });

      return Object.assign(newFile, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      });
    });

    if (fromClipboard) {
      // Nếu từ clipboard, chỉ thêm file đầu tiên trong mảng processedFiles
      setselectedFiles((prevFiles) => [...prevFiles, processedFiles[0]]);
    } else {
      // Logic cho việc thêm file thủ công
      if (selectedFiles.length === 0) {
        setselectedFiles(processedFiles);
      } else if (selectedFiles.length === 1) {
        const newFiles = processedFiles.slice(0, 2);
        setselectedFiles([...selectedFiles, ...newFiles]);
      } else {
        setselectedFiles([...selectedFiles, ...processedFiles]);
      }
    }
  }

  function handleRemoveImage(index) {
    // Tạo một bản sao của danh sách ảnh đã chọn
    const updatedFiles = [...selectedFiles];
    // Loại bỏ ảnh tại chỉ mục index
    updatedFiles.splice(index, 1);
    // Cập nhật danh sách ảnh
    setselectedFiles(updatedFiles);
    // Cập nhật trường images trong Formik với danh sách ảnh mới
    validation.setFieldValue("images", updatedFiles);
  }
  function generateRandomString(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }

    return result;
  }
  useEffect(() => {
    const handlePaste = (event) => {
      const clipboardData = event.clipboardData || window.clipboardData;
      const items = clipboardData.items || [];

      // Lặp từ cuối lên đầu
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        if (item.type.indexOf("image") !== -1) {
          const blob = item.getAsFile();
          const randomFileName = generateRandomString(10); // Độ dài tên file mong muốn
          const file = new File([blob], `${randomFileName}.png`, {
            type: blob.type,
          });
          handleAcceptedFiles([file, ...selectedFiles], true);
          break; // Dừng sau khi xử lý ảnh đầu tiên (gần nhất)
        }
      }
    };
    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [selectedFiles]);
  useEffect(() => {
    validation.setFieldValue("images", selectedFiles);
  }, [selectedFiles]);

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const IsPublishOptions = [
    {
      options: [
        { label: "Hidden", value: false },
        { label: "Show", value: true },
      ],
    },
  ];
  const handleCategoryChange = (categoryId) => {
    validation.setFieldValue("categoryArr", categoryId);
  };
  const handleCategoryBlur = () => {
    validation.handleBlur;
  };
  const handleBrandChange = (brandId) => {
    validation.setFieldValue("brandArr", brandId);
  };
  const handleColorChange = (colorId) => {
    validation.setFieldValue("colorArr", colorId);
  };
  const handleattributeChange = (attributeId) => {
    validation.setFieldValue("attributeArr", attributeId);
  };
  const handleBrandBlur = () => {
    validation.handleBlur;
  };
  const handleColorBlur = () => {
    validation.handleBlur;
  };
  const handleattributeBlur = () => {
    validation.handleBlur;
  };
  //json gửi đi
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      stock: "",
      price: "",
      newPrice: "",
      categoryArr: [],
      brandArr: [],
      colorArr: [],
      attributeArr: [],
      specification: "",
      description: "",
      video: "",
      weight: "",
      discountenddate: "",
      cgst: "",
      sgst: "",
      shippingdays: "",
      cod: false,
      productVariation: [],
      discount: 0,
      isPublish: null,
      images: [],
    },
    validationSchema: Yup.object({
      name: Yup.string() //check biến isEditMode == true thì không cần test unique
        .required("Please enter product name")
        .max(500, "Please do not enter more than 500 characters")
        .test("is-unique", "Product name already exists", function (value) {
          // Chuẩn bị tên sản phẩm để kiểm tra
          if (isEditMode === true) {
            return true;
          }
          const trimmedLowerCaseValue = value.trim().toLowerCase();
          // Kiểm tra xem tên sản phẩm đã tồn tại trong danh sách products hay không
          return !products.some((product) => {
            const productLowerCaseName = product.name.trim().toLowerCase();
            return productLowerCaseName === trimmedLowerCaseValue;
          });
        }),
      price: Yup.number().required("Please enter product price"),
      stock: Yup.number().required("Please enter stock quantity"),
      isPublish: Yup.object()
        .nullable(false)
        .required("Please select display status"),
      categoryArr: Yup.array()
        .nullable(false)
        .required("Please select a category"),
      brandArr: Yup.array().nullable(false).required("Please select a brand"),
      colorArr: Yup.array().nullable(false).required("Please select a color"),
      attributeArr: Yup.array()
        .nullable(false)
        .required("Please select a attribute"),
      description: Yup.string()
        .required("Please enter product description")
        .max(3000, "Cannot exceed 3000 characters"),
      specification: Yup.string()
        .required("Please enter product specifications")
        .max(3000, "Cannot exceed 3000 characters"),
      images: Yup.array().test(
        "images-validation",
        "Please add at least 1 photo",
        function (value) {
          // Nếu isEditMode là true, trả về true và bỏ qua kiểm tra
          if (isEditMode === true) {
            return true;
          }
          // Kiểm tra số lượng ảnh khi isEditMode là false
          return value && value.length >= 1;
        }
      ),
      video: Yup.string().optional("Please enter video link"),
      weight: Yup.string().optional("Please enter weight"),
      discountenddate: Yup.string().optional("Please enter discountenddate"),
      cgst: Yup.number().optional("Please enter cgst"),
      sgst: Yup.number().optional("Please enter sgst"),
      shippingdays: Yup.number().optional("Please enter shippingdays"),
      cod: Yup.boolean().optional("Please enter cash on delivery"),
      productVariation: Yup.array().optional(
        "Please enter productVariation details"
      ),
    }),
    onSubmit: async (values) => {
      // Xử lý dữ liệu khác
      const newProduct = new FormData();
      // Thêm dữ liệu sản phẩm
      newProduct.append("name", values.name);
      newProduct.append("price", values.price);
      newProduct.append("stock", values.stock);
      newProduct.append("discount", values.discount);
      newProduct.append("isPublish", values.isPublish.value);
      newProduct.append("description", values.description);
      newProduct.append("specification", values.specification);
      newProduct.append("video", values.video);
      newProduct.append("weight", values.weight);
      newProduct.append("discountenddate", values.discountenddate);
      newProduct.append("cgst", values.cgst);
      newProduct.append("sgst", values.sgst);
      newProduct.append("shippingdays", values.shippingdays);
      newProduct.append("cod", values.cod);
      newProduct.append("productVariation", JSON.stringify(variation));
      newProduct.append("brandArr", JSON.stringify(values.brandArr));
      newProduct.append("categoryArr", JSON.stringify(values.categoryArr));
      newProduct.append("colorArr", JSON.stringify(values.colorArr));
      newProduct.append("attributeArr", JSON.stringify(attributeData));
      if (isEditMode !== true) {
        values.images.forEach((file) => {
          newProduct.append("images", file);
        });
        await dispatch(onAddNewProduct(newProduct));
        await dispatch(onGetProducts());
        history("/apps-ecommerce-products");
        validation.resetForm();
      } else {
        newProduct.append("id", productId._id);
        // for (const [key, value] of newProduct.entries()) {
        //   console.log(`Key: ${key}, Value: ${value}`);
        // }
        await dispatch(onUpdateProduct(newProduct));
        await dispatch(onGetProducts());
        history("/apps-ecommerce-products");
        validation.resetForm();
      }
    },
  });

  // Sử dụng state để quản lý dữ liệu CKEditor
  const [editorDesData, setEditorDesData] = useState(
    validation.values.description
  );
  const [editorSpecData, setEditorSpecData] = useState(
    validation.values.description
  );
  useEffect(() => {
    setEditorDesData(validation.values.description);
    setEditorSpecData(validation.values.specification);
  }, [
    validation.values.description,
    validation.values.specification,
    validation.values.colorId,
  ]);

  const handleAttributeDataChange = (e, value) => {
    setAttributeData((prev) => {
      const index = prev.findIndex((item) => item.value === value.value);
      if (index !== -1) {
        const updatedData = [...prev];
        updatedData[index].data = e;
        return updatedData;
      } else {
        return [...prev, { ...value, data: e }];
      }
    });
  };
  const generateCombinations = (
    data,
    currentCombination = [],
    index = 0,
    combinations = []
  ) => {
    if (index === data?.length) {
      combinations.push([...currentCombination]);
      return;
    }

    const category = data[index];
    category?.data?.forEach((variation) => {
      currentCombination.push(variation);
      generateCombinations(data, currentCombination, index + 1, combinations);
      currentCombination.pop();
    });

    return combinations;
  };

  const handleInputChange = (rowIndex, colIndex, value, name) => {
    const updatedVariations = JSON.parse(JSON.stringify(variation));
    updatedVariations[rowIndex][colIndex][name] = value;
    setVariation(updatedVariations);
  };

  let resultColor = {
    label: "color",
    value: "color",
    data: validation.values.colorArr,
  };
  console.log("productId: ", productId);
  useEffect(() => {
    if (
      attributeData.length > 0 ||
      validation.values.colorArr.length > 0 ||
      productId.length === 0
    ) {
      const generatedVariations = generateCombinations([
        ...attributeData,
        resultColor,
      ]);
      setVariation(generatedVariations);
    }
  }, [attributeData, validation.values.colorArr]);

  console.log("variation: ", variation);
  const renderRows = () => {
    return variation?.map((combination, rowIndex) => (
      <tr key={`row-${rowIndex}`}>
        {combination.map((variation, colIndex) => (
          <React.Fragment key={`col-${colIndex}`}>
            <td>{variation.label}</td>
            {colIndex === combination.length - 1 && (
              <>
                <td>
                  <Input
                    value={variation?.SKU || ""}
                    onChange={(e) =>
                      handleInputChange(
                        rowIndex,
                        colIndex,
                        e.target.value,
                        "SKU"
                      )
                    }
                    type="text"
                    placeholder="SKU"
                  />
                </td>
                <td>
                  <Input
                    value={variation?.Price || ""}
                    onChange={(e) =>
                      handleInputChange(
                        rowIndex,
                        colIndex,
                        e.target.value,
                        "Price"
                      )
                    }
                    type="text"
                    placeholder="Price"
                  />
                </td>
                <td>
                  <Input
                    value={variation?.QTY || ""}
                    onChange={(e) =>
                      handleInputChange(
                        rowIndex,
                        colIndex,
                        e.target.value,
                        "QTY"
                      )
                    }
                    type="number"
                    placeholder="Qty"
                  />
                </td>
                {/* <td>
                  <div>
                    <Input
                      // value={variation?.Image || ""}
                      type="file"
                      onChange={(e) =>
                        handleInputChange(
                          rowIndex,
                          colIndex,
                          e.target.files,
                          "Image"
                        )
                      }
                    />
                    {variation?.Image ? (
                      <p>{variation.Image[0].name}</p>
                    ) : (
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    )}
                  </div>
                </td> */}
              </>
            )}
          </React.Fragment>
        ))}
      </tr>
    ));
  };
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Create Product" pageTitle="Ecommerce" />
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row>
            <Col lg={8}>
              <Card>
                <CardBody>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="product-title-input">
                      Product's name
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="product-title-input"
                      placeholder="Enter product name"
                      name="name"
                      value={validation.values.name || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.name && validation.touched.name
                          ? true
                          : false
                      }
                    />
                    {validation.errors.name && validation.touched.name ? (
                      <FormFeedback type="invalid">
                        {validation.errors.name}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div>
                    <Label>Product Description</Label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={editorDesData} // Sử dụng state để cung cấp dữ liệu cho CKEditor
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setEditorDesData(data); // Cập nhật state khi dữ liệu thay đổi
                        validation.setFieldValue("description", data);
                      }}
                    />
                    {validation.errors.description && (
                      <Alert color="danger">
                        <strong>An error occurred! </strong>
                        {validation.errors.description}
                      </Alert>
                    )}
                    <Label>Detailed parameters</Label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={editorSpecData} // Sử dụng state để cung cấp dữ liệu cho CKEditor
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setEditorSpecData(data); // Cập nhật state khi dữ liệu thay đổi
                        validation.setFieldValue("specification", data);
                      }}
                    />
                    {validation.errors.specification && (
                      <Alert color="danger">
                        <strong>An error occurred! </strong>
                        {validation.errors.specification}
                      </Alert>
                    )}
                  </div>
                </CardBody>
              </Card>
              <div>
                <ProductVariant
                  customActiveTab={customActiveTab}
                  toggleCustom={toggleCustom}
                  validation={validation}
                />
                <Card>
                  <CardHeader>
                    <h5 className="card-title mb-0">Shipping</h5>{" "}
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col sm={6}>
                        <div className="mb-3">
                          <label className="form-label">
                            Estimate Shipping
                          </label>
                          <InputGroup>
                            <Input
                              type="text"
                              placeholder="Enter Shipping days..."
                              value={validation.values.shippingdays || ""}
                              onChange={validation.handleChange}
                              invalid={
                                validation.errors.shippingdays &&
                                validation.touched.shippingdays
                              }
                              name="shippingdays"
                            />
                            <InputGroupText>Days</InputGroupText>
                          </InputGroup>
                          {validation.errors.shippingdays &&
                            validation.touched.shippingdays && (
                              <div className="invalid-feedback">
                                {validation.errors.shippingdays}
                              </div>
                            )}
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div className="mb-3">
                          <label className="form-label">Cash on Delivery</label>
                          <Select
                            // value={validation.values.cod || ""}
                            onChange={(selectedOption) =>
                              validation.handleChange("cod")(
                                selectedOption.value
                              )
                            }
                            name="cod"
                            options={[
                              { label: "true", value: "true" },
                              { label: "false", value: "false" },
                            ]}
                            isInvalid={
                              validation.errors.cod && validation.touched.cod
                            }
                          />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                {/* other components */}
                <Card>
                  <CardHeader>
                    <h5 className="card-title mb-0">Product Variation</h5>{" "}
                  </CardHeader>
                  <CardBody>
                    <Table bordered>
                      <thead>
                        <tr>
                          {[...attributeData, resultColor].map((category) => (
                            <th key={`header-${category.label}`}>
                              {category.label}
                            </th>
                          ))}
                          <th>SKU</th>
                          <th>Price</th>
                          <th>Qty</th>
                          {/* <th>Image Upload</th> */}
                        </tr>
                      </thead>
                      <tbody>{renderRows()}</tbody>
                    </Table>
                  </CardBody>
                </Card>
              </div>

              <div className="text-end mb-3">
                {isEditMode ? (
                  <button type="submit" className="btn btn-primary w-sm">
                    Save edits
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary w-sm">
                    Add products
                  </button>
                )}
              </div>
            </Col>
            <Col lg={4}>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">Status</h5>{" "}
                </CardHeader>
                <CardBody>
                  <div>
                    <Label
                      htmlFor="choices-publish-visibility-input"
                      className="form-label"
                    >
                      Hide/Show
                    </Label>

                    <Select
                      name="isPublish"
                      options={IsPublishOptions}
                      value={validation.values.isPublish}
                      onBlur={validation.handleBlur}
                      onChange={(selectedOption) => {
                        validation.setFieldValue("isPublish", selectedOption);
                      }}
                    />
                    {validation.touched.isPublish &&
                    validation.errors.isPublish ? (
                      <Alert color="danger">
                        <strong>An error occurred! </strong>
                        {validation.errors.isPublish}
                      </Alert>
                    ) : null}
                  </div>
                </CardBody>
              </Card>
              <EcommerceCategory
                categoryId={validation.values.categoryArr}
                errors={validation.errors.categoryArr}
                blur={validation.touched.categoryArr}
                handleCategoryBlur={handleCategoryBlur}
                handleCategoryChange={handleCategoryChange}
              />

              <EcommerceBrand
                brandId={validation.values.brandArr}
                errors={validation.errors.brandArr}
                blur={validation.touched.brandArr}
                handleBrandBlur={handleBrandBlur}
                handleBrandChange={handleBrandChange}
              />

              <EcommerceColor
                ColorId={validation.values.colorArr}
                errors={validation.errors.colorArr}
                blur={validation.touched.colorArr}
                handleColorBlur={handleColorBlur}
                handleColorChange={handleColorChange}
              />

              <EcommerceAttributes
                AttributeId={validation.values.attributeArr}
                errors={validation.errors.attributeArr}
                blur={validation.touched.attributeArr}
                handleAttributeBlur={handleattributeBlur}
                handleAttributeChange={handleattributeChange}
              />

              {validation?.values?.attributeArr?.length > 0 && (
                <Card>
                  <CardHeader>
                    <h5 className="card-title mb-0">
                      Choose the attributes of each products
                    </h5>
                  </CardHeader>
                  <CardBody>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                        flexWrap: "wrap",
                      }}
                    >
                      {validation?.values?.attributeArr?.length > 0 &&
                        validation?.values?.attributeArr.map((val, i) => {
                          return (
                            <Select
                              key={i}
                              name={val.label}
                              isMulti
                              value={
                                attributeData.length > 0
                                  ? attributeData[i]?.data
                                  : ""
                              }
                              options={val.data}
                              onChange={(e) => {
                                handleAttributeDataChange(e, val);
                              }}
                            />
                          );
                        })}
                    </div>
                  </CardBody>
                </Card>
              )}

              <Card
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
                className={`mb-3 ${isHovered ? "active" : ""}`}
              >
                <CardHeader>
                  <h5 className="card-title mb-0">Product image</h5>
                </CardHeader>
                <CardBody>
                  <div>
                    <h5 className="fs-14 mb-1">Some other photos</h5>
                    <p className="text-muted">Add product photo</p>

                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        const newFiles = acceptedFiles;
                        handleAcceptedFiles(newFiles);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone dz-clickable">
                          <div
                            className="dz-message needsclick mt-4"
                            {...getRootProps()}
                          >
                            <div className="mb-3">
                              <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                            </div>
                            <h5>
                              Drag and drop or click to post photos (minimum 1
                              image)
                            </h5>
                          </div>
                        </div>
                      )}
                    </Dropzone>

                    <div className="list-unstyled mb-0" id="file-previews">
                      {selectedFiles.map((f, i) => {
                        return (
                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + "-file"}
                          >
                            <div className="p-2">
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    alt={f.name}
                                    src={f.preview || f.url}
                                  />
                                </Col>
                                <Col>
                                  <Link
                                    to="#"
                                    className="text-muted font-weight-bold"
                                  >
                                    {f.name}
                                  </Link>
                                  <p className="mb-0">
                                    <strong>{f.formattedSize}</strong>
                                  </p>
                                </Col>

                                <div className="col-xl-3 col-lg-4 col-sm-6">
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onBlur={validation.handleBlur}
                                    onClick={() => handleRemoveImage(i)} // Truyền chỉ mục i vào hàm xử lý
                                  >
                                    <i className="mdi mdi-archive-cancel"></i>{" "}
                                    Erase
                                  </button>
                                </div>
                              </Row>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                    {isHovered && (
                      <Alert color="primary" className="border-0">
                        <strong> Notifications </strong> Tips:{" "}
                        <b>Ctrl + V to paste the image.</b>{" "}
                      </Alert>
                    )}
                    {validation.errors.images && validation.touched.images ? (
                      <Alert color="danger">
                        <strong>An error occurred! </strong>
                        {validation.errors.images}
                      </Alert>
                    ) : null}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default EcommerceAddProduct;
