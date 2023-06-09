const express = require('express')
const app = express()
const port = 5000
const { User } = require('./models/User');
const bodyParser  = require('body-parser');
const config = require('./config/key')

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());



const mongoose = require('mongoose');
mongoose.connect(config.mongoURI).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
  //회원 가입 할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);

  user.save().then(()=>{
    res.status(200).json({
        success:true
    })}).catch((err)=>{
        return res.json({success:false,err})
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})