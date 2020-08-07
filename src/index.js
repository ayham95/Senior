const express=require('express')
require('./db/mongoose')
const User=require('./models/user')
//remember always in capital letter User 
const userRouter = require('./routers/user')

const app=express()
const port=process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)


app.listen(port,()=>{
    console.log('server is up on port '+port)
}) 

// TODO: remove comments if you have Hadoop client installed.
// var WebHDFS = require('webhdfs');
// var hdfs = WebHDFS.createClient({
//   user: 'hadoop-ayham',
//   host: 'localhost',
//   port: 9870,
//   path: '/webhdfs/v1'
// });
 
// var remoteFileStream = hdfs.createReadStream('/test/i000qa-fn.jpg');
// remoteFileStream.on('error', function onError (err) {
//   console.log(err);
// });
 
// remoteFileStream.on('data', function onChunk (chunk) {
//   console.log("CHUNCK");
//     console.log(chunk);
// });
 
// remoteFileStream.on('finish', function onFinish () {
//     console.log("DONE");
// });
