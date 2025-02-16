import Cart from "../Models/cartModel.js";
import Product from "../Models/productModel.js";

export async function addProductToCart(req, res) {
  try {
    const { id } = req.body;
    console.log(id);

    // Check if the product exists in the database
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with id:${id} does not exist` });
    }

    // Check if the product is already in the cart
    const cartProduct = await Cart.findOne({ productId: id });
    if (cartProduct) {
      const updatedCartProduct = await Cart.updateOne(
        { productId: id },
        { $inc: { stockQuantity: 1 } }
      );

      return res.status(200).json({
        message: `Quantity updated for product id:${id}`,
        updatedCartProduct,
      });
    }

    // If not in cart, add as new cart item
    const newCartProduct = await Cart.create({
      productId: id,
      stockQuantity: 1,
    });

    res.status(201).json({
      message: `Product with id: ${id} is added to Cart`,
      cartItem: newCartProduct,
    });
  } catch (error) {
    console.log("Unable to add product in cart");
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export async function updateQuantity(req, res) {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cartProduct = await Cart.findOne({ productId: id });

    if (cartProduct) {
      const updatedCartItem = await Cart.updateOne(
        { productId: id },
        { $inc: { stockQuantity: quantity } }
      );
      if (updatedCartItem.modifiedCount === 0) {
        return res.status(400).json({ message: "Failed to update quantity" });
      }

      return res.status(200).json({ message: "products quantity updated" });
    } else {
      return res.status(200).json({ message: "products quantity updated" });
    }
  } catch (error) {
    console.log("unable to update product's quantity", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
export async function removeProductFromCart(req, res) {
  try {
    const { id } = req.params;
    const cartProduct = await Cart.findOne({ productId: id });

    if (cartProduct) {
      await Cart.deleteOne({ productId: id });
      return res.status(200).json({ message: "products is removed" });
    } else {
      return res.status(404).json({ message: "product does not exist" });
    }
  } catch (error) {
    console.log("unable to update remove product", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
