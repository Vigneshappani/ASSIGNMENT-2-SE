
// const mongo_url = process.env.MONGO_URL || "mongodb://localhost:27018/itemDb"
require('dotenv/config')

module.exports = {
    url: process.env.MONGO_URL || "mongodb+srv://Inventory-user:Inventory-user@cluster0.nghnqy6.mongodb.net/Inventory-db?retryWrites=true&w=majority"
}


// mongodb+srv://madhuwantha:1234FFMMss..@daily-expenses.rymco.mongodb.net/myFirstDatabase?retryWrites=true&w=majority