const { Decimal128 } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name: String,
    image: String,
    isActive: Boolean,
    products: [{ type: mongoose.Types.ObjectId, ref: "products" }]
}, { timestamps: true });

const Group = mongoose.model('groups', GroupSchema);
// Group.insertMany([
//     { 
//         name: "Walmart", 
//         image: "assets/img/walmart.jpg",
//         isActive: true
//     },
//     { 
//         name: "Wayfair", 
//         image: "assets/img/wayfair.jpg",
//         isActive: true
//     },
//     { 
//         name: "PetMeds", 
//         image: "assets/img/petmeds.jpg",
//         isActive: true
//     },
//     { 
//         name: "Dick's Sporting Goods", 
//         image: "assets/img/dicksport.jpg",
//         isActive: true
//     }
// ]);

module.exports = Group;