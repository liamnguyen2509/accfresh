// models
const Group = require('./model');
const Product = require('../product/model');

const getGroups = async () => {
    const groups = await Group.find().sort({ createdAt: -1 });

    const returnGroups = [];
    for await (const group of groups) {
        const productsByGroups = await Product.find({ group: group._id });
        
        const total = productsByGroups.reduce(({ stock, sold }, product) => {
            return  { stock: stock + product.stock, sold: sold + product.sold };
        }, { stock: 0, sold: 0 });

        returnGroups.push({
            id: group.id,
            name: group.name,
            image: group.image,
            stock: total.stock,
            sold: total.sold,
            price: productsByGroups.length > 0 ? productsByGroups.sort((a, b) => a.price - b.price)[0].price : 0,
            isActive: group.isActive
        });
    }
    return returnGroups;
}

const createGroup = async (requestGroup) => {
    const existingGroup = await Group.findOne({ name: requestGroup.name });

    if (existingGroup) {
        throw Error(`Group name ${requestGroup.name} already existed.`);
    } else {
        const newGroup = new Group({
            name: requestGroup.name,
            image: requestGroup.image,
            isActive: true
        });
    
        const group = await newGroup.save().catch((err) => {
            throw Error("Create Group failed.");
        });
    
        return group;
    }
}

const updateGroup = async (requestGroup) => {
    const groupUpdate = await Group.findById(requestGroup.id);

    if (!groupUpdate) {
        throw Error(`Group name ${requestGroup.name} not exist.`);
    } else {
        groupUpdate.name = requestGroup.name;
        if (requestGroup.image) {
            groupUpdate.image = requestGroup.image;
        }
    
        const updatedGroup = await groupUpdate.save().catch((err) => {
            throw Error("Create Group failed.");
        });
    
        return updatedGroup;
    }
}

const deleteGroup = async (groupId) => {
    await Group.deleteOne({ _id: groupId }).catch((err) => {
        throw Error("Delete Group failed.");
    });;
}

module.exports = { getGroups, deleteGroup, createGroup, updateGroup }