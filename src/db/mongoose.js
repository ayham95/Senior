const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/server-db',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(db => {
    console.log('Connected')
})