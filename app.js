const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//AdminBro

const AdminBro = require("admin-bro");
const expressAdminBro = require("@admin-bro/express");
const mongooseAdminBro = require("@admin-bro/mongoose");

//Modelos

const User = require('./models/User')
const Post = require('./models/Post')

AdminBro.registerAdapter(mongooseAdminBro)
const AdminBroOptions = {resources: [User, Post]}

const adminBro = new AdminBro(AdminBroOptions)
const router = expressAdminBro.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)


// router

app.get("/admin", (req, res)=>{
    res.send("Dashboard con Node");
})


// la conexion para de dba
mongoose.connect(process.env.MONGOOSE_DBA).then(() => console.log("Connected to MongooseDBA Atlas")).catch((error) => console.error(error));



app.listen(3000, ()=>{
    console.log("Server UP! ON http://localhost:3000/admin")
})