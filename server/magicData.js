import mongoose from 'mongoose';
import fakeproducts from './fakeproducts.js';
import fakeusers from './fakeusers.js';

//import Models
import User from "./models/User.js";
import Product from './models/Product.js';
import './dbConnect.js';

//LoadData
//purgeData

async function LoadData() {
    try {
        await User.deleteMany();
        await Product.deleteMany();

        const newUsers = await User.insertMany(fakeusers);
        const adminUser = newUsers[0]._id;
        const sampleProducts = fakeproducts.map((product) => {
            return { ...product, user: adminUser }
        });
        await Product.insertMany(sampleProducts);
        console.log("Data Dumped successfully");
        process.exit();

    } catch (error) {
        console.log("There is some problem loading fake data sets");
        console.error(error);
    }
}

async function purgeData() {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        console.log("Data Deleted successfully");
        process.exit();
    } catch (error) {
        console.log("There is some problem deleting fake data sets");
        console.error(error);
    }
}
LoadData();
// purgeData();