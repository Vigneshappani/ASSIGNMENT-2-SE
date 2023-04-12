
require('dotenv/config')

// module.exports = {
//     url: process.env.MONGO_URL || "mongodb+srv://Inventory-user:Inventory-user@cluster0.nghnqy6.mongodb.net/Inventory-db?retryWrites=true&w=majority"
// }


const mongo_url = process.env.MONGO_URL || "3.215.180.226"

module.exports = {
    url: `mongodb://${mongo_url}:27017/inventory`
}