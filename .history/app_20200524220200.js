const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const rutas = require('./rutas');
const exphbs = require('express-handlebars');
const passport = require('passport');
const flash = require('connect-flash');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const app = express();
require('./config/passport');
//conneccion
mongoose.connect('mongodb+srv://admin:123@cluster0-7h0cp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => console.log('Conectado'))
                   .on('error',error  => {console.log('Error de conexion:',error)
});
//middle
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: '123',
    resave: true,
    saveUninitialized:true,
}));
app.use(express.static(path.join(__dirname, '/assets')));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//rutas
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });
app.use('/',rutas);
//listen
app.listen(3000);
app.set('Paginas', path.join(__dirname,'Paginas'));
app.engine ('.hbs', exphbs({
    defaultLayout: 'principal',
    layoutsDir:     path.join(app.get('views'),'layouts'),
    partialsDir:    path.join(app.get('views'),'partials'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine','.hbs');




