// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract SupplyChain {
    event Added(uint256 index);
    struct Product {
        uint256 productId;
        string name;
        string description;
        string typeProduct;
        uint256 price;
        string image;
        uint256 date;
        address userId;
    }
    mapping(uint256 => Product) public products;

    uint256 public numberOfProducts = 0;
    uint256 items = 0;

    function createProduct(
        string memory _name,
        string memory _description,
        string memory _typeProduct,
        uint256 _price,
        string memory _image
    ) public returns (uint256) {
        Product storage product = products[numberOfProducts];
        product.productId = items;
        product.name = _name;
        product.description = _description;
        product.typeProduct = _typeProduct;
        product.price = _price;
        product.image = _image;
        product.date = block.timestamp;
        product.userId = msg.sender;

        numberOfProducts++;
        items++;
        emit Added(items - 1);
        return numberOfProducts - 1;
    }

    function getAllProducts() public view returns (Product[] memory) {
        Product[] memory allProducts = new Product[](numberOfProducts);
        for (uint i = 0; i < numberOfProducts; i++) {
            Product storage item = products[i];
            allProducts[i] = item;
        }
        return allProducts;
    }

    function searchProduct(
        uint _productId
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint256,
            string memory,
            uint256,
            address
        )
    {
        require(_productId <= items, "Product does not exist");

        Product storage product = products[_productId];

        return (
            product.name,
            product.description,
            product.typeProduct,
            product.price,
            product.image,
            product.date,
            product.userId
        );
    }
}
