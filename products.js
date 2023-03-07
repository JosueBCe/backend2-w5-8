const mongodb = require('../models/connectdb'); // requires functions from db/connect
const ObjectId = require('mongodb').ObjectId; // Requieres the ID 


// Function that allows to get the collection "ProductS"
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db("ecommerce").collection("products").find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }

};

const getCategory = async (req, res) => {
  try {
    const productCategory = req.params.category
    const result = await mongodb
      .getDb()
      .db("ecommerce")
      .collection("products")
      .find({ category: productCategory });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

const getById = async (req, res) => {
  try {
    const productId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("ecommerce")
      .collection("products")
      .find({ _id: productId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

const addNewProduct = async (req, res) => {
  try {
    const Product = {
      name: req.body.name,
      brand: req.body.brand,
      color: req.body.color,
      size: req.body.size,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category

    };
    // Inserting in DB New Product
    const response = await mongodb
      .getDb()
      .db("ecommerce")
      .collection("products")
      .insertOne(Product);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || "Some error occurred while creating the Product");
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const productId = new ObjectId(req.params.id); // Get the id specified in the url parameter
    const product = {
      name: req.body.name,
      brand: req.body.brand,
      color: req.body.color,
      size: req.body.size,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category
    };
    const response = await mongodb
      .getDb()
      .db("ecommerce")
      .collection("products")
      .replaceOne({ _id: productId }, product);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the Product.');
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};


const deleteProduct = async (req, res) => {
  try {
    const productId = new ObjectId(req.params.id);
    const response = await
      mongodb.getDb()
        .db("ecommerce")
        .collection("products")
        .deleteOne({ _id: productId });

    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the Product.');
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};
module.exports = { getAll, getCategory, getById, addNewProduct, updateProduct, deleteProduct }