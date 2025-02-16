import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
