const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
//remember always in capital letter User 
const userRouter = require('./routers/user')

const app = express()
const port = process.env.PORT || 3000
const http = require('http')
const server = http.createServer(http)
const socketio = require('socket.io')
const io = socketio(server)
app.use(express.json())
app.use(userRouter)
socketio.listen(process.env.PORT || 8000)

app.listen(port, () => {
  console.log('server is up on port ' + port)
})
let count = 0 ; // count global variable 
io.on('connect', () => {
  console.log('connected0')
  socket.emit('updatecount', count) // this is used to send a event and count here is parameter we can send as many parameter we want 
  // Listening the event and performing logic here 
  socket.on('increment', () => {
    count++;
    console.log(count)
    io.emit('updatecount', count)
  })
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
