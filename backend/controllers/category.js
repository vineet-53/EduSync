const Category  = require('../models/Category')

exports.createCategory = async ( req ,res)=> { 
    try { 

        const { name ,description }  = req.body  
        if(!name || !description) { 
            throw "missing Properties"
        }
        const CategoryDetails = await Category.create({ name , description})

        return res.status(200).json( { 
            success : true , 
            message : "created Category successfully"
            ,CategoryDetails
        })
    }catch(err){  
        return res.status(400).json( { 
            success : false , 
            message : err.message
        })
    }
}
exports.updateCategory = async (req  ,res) => { 
    try { 
        // input required params
        const {CategoryId , updateName , updateDesc}  = req.body 
        // validate input params
        if(!CategoryId) { 
            throw "Category not found"
        }
        if(!updateName || !updateDesc) { 
            throw "missing props"
        }

        const CategoryDetails = await Category.findByIdAndUpdate(CategoryId , { 
            $set : { 
                name : updateName , 
                description : updateDesc
            }
        })
        if(!CategoryDetails) {
            throw "Category not found and updated"
        }
        return res.status(200).json( { 
            success : true , 
            message : "updated Category successfully"
            ,CategoryDetails
        })
    }catch(err) { 
        return res.status(400).json( { 
            success : false , 
            message : err.message
        }) 
    }
}
exports.showAllCategories = async (req ,res) => { 

    try { 
        const categoryDetails = await Category.find({ } , {name : true , description : true,})

        return res.status(200).json( { 
            success : true , 
            message : "fetched all Categorys successfully",
            categoryDetails
        })

    }catch(err) { 
        return res.status(401).json( { 
            success : false , 
            message : err.message
        })
    }
}
exports.getCategoryPageDetails = async(req ,res) => { 
    try { 
        const { categoryId } = req.body; 
        // validate
        if(!categoryId){ 
            throw new Error("missing details")
        }
        // find category 
        const category = await Category.findById(categoryId).populate('courses').exec(); 
        // validtate
        if(!category) { 
            throw new Error('no category found in db')
        }
        return res.status(200).json({  
            success : true, 
            message : "Fetched single category successfully",
            category, 
        })
    }catch(err) { 
        return res.status(401).json({ 
            success  :false ,
            message : err.message
        })
    }
}