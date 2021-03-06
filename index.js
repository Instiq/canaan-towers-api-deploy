const express = require('express'); 
const connectDB = require('./src/db/mongoose')();
const cors = require('cors')
const helmet = require("helmet");
var bodyParser = require('body-parser')
const userRouter = require('./src/routers/users');
const adminRouter = require('./src/routers/admin');
const quotesRouter = require('./src/routers/quotes');
const buildingRouter = require('./src/routers/services/building');
const furnishRouter = require('./src/routers/services/furnishing');
const automobileRouter = require('./src/routers/services/automobile');
const powerRouter = require('./src/routers/services/power');
const roadworkRouter = require('./src/routers/services/roadworks');
const roofRouter = require('./src/routers/services/roof');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/swagger.json');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 

const port = process.env.PORT;

app.use(helmet());
app.options('*', cors());

var allowedOrigins = ['http://localhost:8080','http://localhost:8081', 'http://canaantowersltd.com', 'https://canaantowersb.netlify.app'];
app.use(cors({
  origin: function(origin, callback) {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  exposedHeaders: [ 'Authorization' ]
}));




app.use(express.json({ extended: false }))
app.use(express.static('public/uploads'))
app.use(userRouter)
app.use(adminRouter)
app.use(quotesRouter)
app.use(buildingRouter)
app.use(furnishRouter)
app.use(automobileRouter)
app.use(powerRouter)
app.use(roadworkRouter)
app.use(roofRouter)

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (req, res) => {
    res.send('this is working')

})

app.listen(port, () => console.log(`Server running on port: ${port}`))