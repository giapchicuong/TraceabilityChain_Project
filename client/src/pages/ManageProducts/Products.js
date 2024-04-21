import React, { useEffect, useState } from "react";
import "./products.scss";
import { Col, Form, Row } from "react-bootstrap";
import ModalProduct from "./ModalProduct.js";
import ModalDelete from "./ModalDelete.js";
import { useStateContext } from "../../context/index.js";
const Products = () => {
  const { address, contract, getAllProducts } = useStateContext();

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setListProducts(data);
  };

  useEffect(() => {
    if (contract) fetchProducts();
  }, [address, contract]);

  // Data Product
  const [listProducts, setListProducts] = useState([]);
  // Modal Product
  const [isShowModalProduct, setIsShowModalProduct] = useState(false);

  // Modal Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModalDelete, setDataModalDelete] = useState([]);
  const [dataModal, setDataModal] = useState([]);

  const handleHideModalProduct = (item) => {
    setIsShowModalProduct(!isShowModalProduct);
    setDataModal(item);
  };
  const handleCreateProduct = () => {
    setIsShowModalProduct(!isShowModalProduct);
  };

  const handleHideModalDelete = () => {
    setIsShowModalDelete(!isShowModalDelete);
  };
  const handleDeleteProduct = (item) => {
    setIsShowModalDelete(!isShowModalDelete);
    setDataModalDelete(item);
  };
  return (
    <div className="products-container">
      <div className="table-container">
        <div className="table">
          <div className="add-product">
            <h3>Products</h3>
            <button
              className="btn btn-secondary"
              onClick={() => handleCreateProduct()}
            >
              <i class="fa fa-plus" aria-hidden="true"></i>New Product
            </button>
          </div>

          <div className="action-product">
            <Form inline>
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className=" mr-sm-2"
                  />
                </Col>
              </Row>
            </Form>
            <select class="form-select" aria-label="Default select example">
              <option selected>Sort by: Featured</option>
              <option value="1">Newest</option>
              <option value="1">Oldest</option>
            </select>
          </div>
          <table class="table table-borderless table-hover">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Name Product</th>
                <th scope="col">Description</th>
                <th scope="col">Type</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listProducts &&
                listProducts.length > 0 &&
                listProducts.map((item, index) => {
                  return (
                    <tr key={`rows-${index}`}>
                      <th scope="row"> {index + 1}</th>
                      <td className="product-text">
                        <div className="image-product">
                          <img
                            src={item.image}
                            className="image"
                            width={50}
                            alt={item.name}
                          />
                          {item.name}
                        </div>
                      </td>
                      <td className="product-text">{item.description}</td>
                      <td>{item.typeProduct}</td>
                      <td>{item.price}</td>
                      <td className="actions">
                        <span
                          title="View"
                          className="view"
                          onClick={() => handleHideModalProduct(item)}
                        >
                          <i class="fa fa-eye" aria-hidden="true"></i>
                        </span>
                        <span
                          title="Delete"
                          className="delete"
                          onClick={() => handleDeleteProduct(item)}
                        >
                          <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <ModalProduct
        show={isShowModalProduct}
        onHide={handleHideModalProduct}
        dataModal={dataModal}
      />
      <ModalDelete
        show={isShowModalDelete}
        dataModalDelete={dataModalDelete}
        onHide={handleHideModalDelete}
      />
    </div>
  );
};

export default Products;
