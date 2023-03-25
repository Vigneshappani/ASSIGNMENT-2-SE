const Item =  require('../mongo/item');

 const add = (request, response, next) => {
    const item = request.body;
    const _item = new Item(item);
    _item.save((err, n) => {
        if (err) {
            console.log(err)
            return response.status(500).json(err)
        } else {
            return response.status(200).json(n)
        }
    });
}

const update = async  (request, response, next) => {
    const item = request.body;
    const _item =  await Item.findOne({"_id": request.params.id}).exec();
    _item.name = item.name;
    _item.quantity = item.quantity;
    _item.save((err, n) => {
        if (err) {
            console.log(err)
            return response.status(500).json(err)
        } else {
            return response.status(200).json(n)
        }
    });
}

 const getAll =  async (request, response, next) => {
   try{
       let itemList =  await Item.find({  }, null, { skip: 0 }).exec();
       return response.status(200).json(itemList)
   }catch(err){
       console.log(err)
       return response.status(500).json(err)
   }
}

 const getById =  async (request, response, next) => {
    try{
        const item =  await Item.findOne({"_id": request.params.id}).exec();
        return response.status(200).json(item)
    }catch(err){
        console.log(err)
        return response.status(500).json(err)
    }
}

 const upload =  async (request, response, next) => {
    try{
        const {file} = request.files;
        const image = file;

        if (!image) return response.status(400).json({message: "no image found"})
        // if (/^image/.test(image.mimetype)) return response.status(400).json({message: "not a image"})

        let r = (Math.random() + 1).toString(36).substring(7);
        let name =  r+"-"+image.name.replace(" ","-");
        let full = __dirname.replace("controller","public") + '/upload/' + name;
        // console.log(full);
        image.mv(full);

        response.json({
            path: name
        })
    }catch(err){
        console.log(err)
        return response.status(500).json(err)
    }
}



module.exports = { add, getAll, getById, update, upload}
