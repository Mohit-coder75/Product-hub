
import {body, validationResult} from 'express-validator'
const validateRequest =  async (req,res,next)=>{
    //   const {name, price,imageUrl} = req.body
    //   const errors= []
    //   if(!name || name.trim() == '')
    //     {
    //         errors.push("Name is required")
    //     }
    //     if( !price || price <= 0)
    //     {
    //         errors.push("Price cannot be negative")
        
            
    //     }
    //     try{
    //         const validUrl = new URL(imageUrl)
    //     }
    //     catch(err)
    //     {
    //         errors.push("Invalid Url")
    //     }

    //setup the rules........
     const rules = [
        body('name').notEmpty().withMessage("Name is required"),
        body('price').isFloat({gt:0}).withMessage("Price cannot be negative"),
        // body('imageUrl').isURL().withMessage("Ivalid url") 

        body('imageUrl').custom((value,{req})=>{
            if(!req.file)
                {
                    throw new Error("Image is required");
                }
            return true;    
        })

     ]

    //run those rule.........
     await Promise.all(rules.map(rule=>rule.run(req)));

    //check if error.........

    var validationErrors = validationResult(req)

        if(!validationErrors.isEmpty())
        {
                return res.render('new-product', {errorMessage:validationErrors.array()[0].msg})
        }
        next()    //whenever u are making middle ware dont forget to call next()
}

export default validateRequest;