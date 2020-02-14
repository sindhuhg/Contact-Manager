
const {User}=require('../models/User')
//const {authenticateUser}=require('../middlewares/authentication')
const _=require('lodash')

//localhost:3020/users/register
module.exports.register=(req,res)=>{    
    const body=_.pick(req.body,['username','email','password'])
    const user=new User(body)
    user.save()
    .then(function(user){
        //const {_id,username,email}=user
        res.json(_.pick(user,['id','username','email']))
    })
    .catch(function(err){
        res.send(err)
    })
    
}

//localhost:3020/users/login

module.exports.login=(req,res)=>{
    console.log(req.body)
    const body=_.pick(req.body,['email','password'])

    User.findByCredentials(body.email,body.password)
    .then(function(user){
       return user.generateToken()
    })
    .then(function(token){
        res.send({token})//setheader('x-auth',token).send({})
    })
    
    .catch(function(err){
        res.send(err)
    })
 
}

//localhost:3020/users/account
module.exports.account=(req,res)=>{
    const {user}=req
    res.json(_.pick(user,['id','username','email']))
    
    //res.send({"_id":user._id,"username":user.username,"email":user.email})
}

//localhost:3020/users/logout
module.exports.logout=(req,res)=>{
    const{user,token}=req
    User.findByIdAndUpdate(user._id,{ $pull: { tokens:{token:token}}})
    .then(function(){
    res.send({notice:'successfully logged out'})
    })
    .catch(function(err){
    res.send(err)
    })
}



