const { Decimal128 } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    description: String,
    stock: Number,
    sold: Number,
    price: Decimal128,
    image: String,
    isActive: Boolean,
    orderDetails: [{ type: mongoose.Types.ObjectId, ref: "orderDetails" }]
}, { timestamps: true });

const Product = mongoose.model('products', ProductSchema);
// Product.insertMany([
//     { 
//         name: "Walmart Have Card No Bypass", 
//         decription: "MAIL:PASS | Gift | VISA | 2025-10-31 | Chloe-de-Vanessa Pierre | 1008 Marley Manor Dr | Apt 301 | Salisbury | MD | 21804 | 4436714318 | NeedCVV : true",
//         stock: 5500,
//         sold: 11,
//         price: "0.30",
//         image: "assets/img/walmart.jpg",
//         isActive: true
//     },
//     { 
//         name: "Walmart Have Card Bypass", 
//         decription: "MAIL:PASS | Gift | VISA | 2023-08-31 | | 1326sheetz Mill Rd | | Woodstock | VA | 22664 | 5403310964 | NeedCVV : false",
//         stock: 1500,
//         sold: 43,
//         price: "0.90",
//         image: "assets/img/walmart.jpg",
//         isActive: true
//     },
//     { 
//         name: "Walmart Have Paypal", 
//         decription: "",
//         stock: 0,
//         sold: 0,
//         price: "9.00",
//         image: "assets/img/walmart.jpg",
//         isActive: false
//     },
//     { 
//         name: "Wayfair Have Card", 
//         decription: "MAIL:PASS | Credit Card - VISA ****0146 | exp. 03/25 | Expires: 03/2025 | Nadine Waller | 11645 W Cross Slope Way, Nampa, ID 83686, United States",
//         stock: 100,
//         sold: 69,
//         price: "0.80",
//         image: "assets/img/wayfair.png",
//         isActive: true
//     },
//     { 
//         name: "Wayfair Have Paypal", 
//         decription: "MAIL:PASS | PayPal | Expires: 06/2024 | Lola Samples | 1328 Minton Drive, New Albany, IN 47150-4115, United States",
//         stock: 46,
//         sold: 6,
//         price: "4",
//         image: "assets/img/wayfair.png",
//         isActive: true
//     },
//     { 
//         name: "Petmeds Have Card", 
//         decription: "MAIL:PASS | Ending 12/2023 | ORMOND BEACH, FL 32176",
//         stock: 100,
//         sold: 1,
//         price: "0.60",
//         image: "assets/img/petmeds.jpg",
//         isActive: true
//     },
//     { 
//         name: "Petmeds Have Auto Ship", 
//         decription: "MAIL:PASS | Autoship true | Ending 9/2023 | RIDGECREST, CA 93555",
//         stock: 20,
//         sold: 2,
//         price: "2.00",
//         image: "assets/img/petmeds.jpg",
//         isActive: true
//     },
//     { 
//         name: "Dickssportinggoods No Have Order", 
//         decription: "MAIL:PASS | No Order",
//         stock: 1,
//         sold: 1,
//         price: "1.5",
//         image: "assets/img/dicksport.jpg",
//         isActive: true
//     },
//     { 
//         name: "Dickssportinggoods Have Order", 
//         decription: "MAIL:PASS | Have Order March 24, 2022 | -$32.16",
//         stock: 100,
//         sold: 11,
//         price: "3.00",
//         image: "assets/img/dicksport.jpg",
//         isActive: true
//     }
// ]);

module.exports = Product;