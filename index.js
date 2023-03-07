const mongodb = require('../db/connect'); // requires functions from db/connect
const ObjectId = require('mongodb').ObjectId; // Requieres the ID 


// Function that allows to get the collection "CONTACTS"
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db("ecommerce").collection('products').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }

};
// Function that allows to get one item of the  collection "CONTACTS" by ID 
const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("Collections")
      .collection('Contacts')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

// With the request, structure the request and insert a new contact. 
const addNewProduct = async (req, res) => {
  try {
    const contact = {
      name: req.body.name,
      brand: req.body.brand,
      color: req.body.color,
      size:req.body.size,
      price: req.body.price,
      description:req.body.description ,
      category:req.body.category
      
    };
    // Inserting in DB New Contact
    const response = await mongodb
      .getDb()
      .db("ecommerce")
      .collection("products")
      .insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || "Some error occurred while creating the contact");
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateContact = async (req, res) => {
  try {
    const productId = new ObjectId(req.params.id); // Get the id specified in the url parameter
    const product = {
      name: req.body.name,
      brand: req.body.brand,
      color: req.body.color,
      size:req.body.size,
      price: req.body.price,
      description:req.body.description ,
      category:req.body.category
    };
    const response = await mongodb
      .getDb()
      .db("Collections")
      .collection('Contacts')
      .replaceOne({ _id: productId }, product);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

const deleteContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await
      mongodb.getDb()
        .db("Collections")
        .collection('Contacts')
        .deleteOne({ _id: userId });

    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};




module.exports = { getAll, getSingle, addNewContact, updateContact, deleteContact };