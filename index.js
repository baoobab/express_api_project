import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import router from "./router.js";

const PORT = "5000"
const app = express()
const DB_URL = "mongodb+srv://db_user:SdpThmstUzrt8wE6@cluster0.igpw9vx.mongodb.net/?retryWrites=true&w=majority"
app.set("view engine", "ejs")
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static('static'))
app.use('/api', router)

async function startApp () {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(DB_URL)
        app.route('/ajax').get(function (req, res) {
            res.render('ajax', {quote: "AJAX test"})
        })
            .post(function (req, res) {
                res.send({response: req.body.quote})
            })
        app.listen(PORT, () => console.log("SERVER STARTED ON PORT:", PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp()