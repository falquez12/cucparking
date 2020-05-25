const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usuario = require('../models/usuario');

passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'pass' 
}, async (name, pass, done) => {
        console.log(name)
        const user = await usuario.findOne({ 'name': name });
        if (!user) {
            return done(null,false,{message: 'No se encontro usario'});
        } else {
            console.log(pass);
            console.log(user.pass);
            if(pass==user.pass){
                return done(null,user);
            } else{
                return done(null,false,{message: 'Contrasena incorrecta'})
            }
        }
}));

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    usuario.findById(id,(err,user)=>{
        done(err,user);
    });
});