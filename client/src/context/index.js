import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useContractWrite,
  walletConnect,
} from "@thirdweb-dev/react";
import { SMART_CONTRACT } from "../utils/constants";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(SMART_CONTRACT);
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createProduct"
  );
  const { mutateAsync: searchProductMutation } = useContractWrite(
    contract,
    "searchProduct"
  );

  const address = useAddress();
  const connect = walletConnect();

  const publishProduct = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          form.name, // title
          form.description, // description
          form.typeProduct, // type product
          form.price,
          form.image,
        ],
      });

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getAllProducts = async () => {
    const products = await contract.call("getAllProducts");

    const parsedProducts = products.map((product, i) => ({
      name: product.name,
      description: product.description,
      typeProduct: product.typeProduct,
      price: ethers.utils.formatEther(product.price.toString()),
      image: product.image,
      userId: product.userId,
      pId: i,
    }));

    return parsedProducts;
  };

  const getUserProducts = async () => {
    const allProducts = await getAllProducts();

    const filteredProducts = allProducts.filter(
      (product) => product.userId === address
    );

    return filteredProducts;
  };
  const searchProduct = async (searchData) => {
    try {
      const data = await searchProductMutation({
        args: [searchData.id],
      });
      return data;
    } catch (error) {
      console.error("Error searching product:", error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createProduct: publishProduct,
        getAllProducts,
        getUserProducts,
        searchProduct,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
