import mongoose from "mongoose";
import sampleProducts from "./utils/sampleData.js";
import Product from "./Models/productModel.js";

async function seedDataBase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/backend");
    console.log("Connected to DB successfully!");

    //Delete all Previous data
    await Product.deleteMany({});
    console.log("Previous product data deleted!");

    //Insert sampel data
    await Product.insertMany(sampleProducts);
    console.log("Sample product data inserted!");

    //close connection
    await mongoose.connection.close();
  } catch (error) {
    console.log("Error sedding dataBase:", error);
  }
}

seedDataBase();
