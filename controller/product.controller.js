import path from 'path'
import ProductModel from '../models/product.model.js'
export default class ProductController{
    getProducts(req, res, next) {
        var products = ProductModel.getAll();
        res.render('products', { products, userEmail:req.session.userEmail });
      }
       
      getAddProduct(req, res, next) {
        res.render('new-product', {
          errorMessage: null,userEmail:req.session.userEmail
        });
      }
    
      postAddProduct(req, res, next) {
        // validate data
        // const { name, price, imageUrl } = req.body;
        // let errors = [];
        // if (!name || name.trim() == '') {
        //   errors.push('Name is required');
        // }
        // if (!price || parseFloat(price) < 1) {
        //   errors.push(
        //     'Price must be a positive value'
        //   );
        // }
        // try {
        //   const validUrl = new URL(imageUrl);
        // } catch (err) {
        //   errors.push('URL is invalid');
        // }
    
        // if (errors.length > 0) {
        //   return res.render('new-product', {
        //     errorMessage: errors[0],
        //   });
        // }
        const {name,desc,price } = req.body;
        const imageUrl = 'images/' + req.file.filename;
        console.log(imageUrl);
        // ProductModel.add(req.body);
        ProductModel.add(name,desc,price,imageUrl);
        var products = ProductModel.getAll();
        res.render('products', { products ,userEmail:req.session.userEmail});
      }
      postUpdateProduct(req,res,next)
      {
        ProductModel.update(req.body);
        var products = ProductModel.getAll();
        res.render('products', {products,userEmail:req.session.userEmail});
      }
      deleteProduct(req,res,next){
        const id = Number(req.params.id);
        const foundProduct = ProductModel.getById(id);
        if(!foundProduct)
          {
            return res.status(401).send("Product not found");
          }
          ProductModel.delete(id);
        var products = ProductModel.getAll();
        res.render('products', {products,userEmail:req.session.userEmail});
      }

      getupdateProductView(req,res,next)
      {
        //1.if product exist return view.......
        // const {id } = req.body  this will not give id...

        const id = req.params.id;

        const foundProduct = ProductModel.getById(id)

        if(foundProduct)
          {
            return res.render("update-product", {product:foundProduct, errorMessage:null,userEmail:req.session.userEmail})
          }
         
        
        //2.else return error
        else{
          return res.status(401).send("Product not found")
        }
      }
}

