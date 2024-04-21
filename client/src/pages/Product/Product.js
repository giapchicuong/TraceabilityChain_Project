import React, { useEffect } from "react";
import "./product.scss";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import { useStateContext } from "../../context";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
const Product = () => {
  const { address, contract, searchProduct } = useStateContext();
  const [data, setData] = useState({});
  const { id } = useParams();
  const handleSearch = async () => {
    const data = await searchProduct({ id });
    setData(data);
  };

  useEffect(() => {
    handleSearch();
  }, [address, contract, id]);
  if (data === undefined) return <Error />;
  return (
    <div className="product">
      {data !== null && data?.length > 0 ? (
        <div className="product">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={data[4]} />
            <Card.Body>
              <Card.Title>{data[0]}</Card.Title>
              <Card.Text>{data[1]}</Card.Text>
              <Card.Text>{data[2]}</Card.Text>
              <Card.Text>{data[6]}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <>
          <Loading />
        </>
      )}
    </div>
  );
};

export default Product;
