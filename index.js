import express from 'express';
import ProductController from './controller/product.controller.js';
import path from 'path'
import ejsLayouts from 'express-ejs-layouts'
import validateRequest from './middlewares/validation.middleware.js';
import { uploadFile } from './middlewares/file-upload.middleware.js';
import UserController from './controller/user.controller.js';
import session from 'express-session';
import { auth } from './middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './middlewares/lastVisit.middleware.js';
// import { uploadFile } from './middlewares/file-upload.middleware.js';



const server = express()
server.use(express.static('public'));
server.use(cookieParser());
// server.use(setLastVisit);
server.use(ejsLayouts);
server.use(session({
           secret:'SecretKey',
           resave:false,
           saveUninitialized:true,
           cookie: {secure:false},
}));


// setup view engine settings.........
server.set('view engine', 'ejs');
server.set('views',path.join(path.resolve(),
'views') )


//parse form data..........................
server.use(express.urlencoded({extended:true}))

//create an instance of product controller.......
const productController = new ProductController();

//instance of Usercontroller......
const usersController = new UserController();


server.get('/',setLastVisit, auth,productController.getProducts);
server.get('/new',auth,productController.getAddProduct);
server.get('/update-product/:id',auth, productController.getupdateProductView);
server.post('/delete-product/:id',auth, productController.deleteProduct);
server.post('/',auth,uploadFile.single('imageUrl'),validateRequest, productController.postAddProduct);  //middleeare updated  uploadFile.single('imageUrl')
server.post('/update-product', auth,productController.postUpdateProduct);
server.get('/register', usersController.getRegister);
server.get('/login',usersController.getLogin);
server.post('/login',usersController.postLogin);
server.post('/register', usersController.postRegister);
server.get('/logout',usersController.logout);
server.use(express.static('./views'));
server.listen(3400, ()=>{
    console.log("Server is listening at port 3400");
})
