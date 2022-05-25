import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://dpeliser:Snapcaster21@nodejs-app-cluster.yxql2.mongodb.net/nodejs-app');

const db = mongoose.connection;

export default db;