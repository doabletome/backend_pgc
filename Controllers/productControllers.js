import Product from "../Models/productModel.js";

export async function fetchProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log("Unable to fetch data:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export async function fetchSingleProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `product with id:${id} does not exist ` });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log("Unable to fetch Product:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
