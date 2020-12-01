const express = require('express'); 
const connectDB = require('./db/mongoose');
const cors = require('cors')
const helmet = require("helmet");
var bodyParser = require('body-parser')
const userRouter = require('./routers/users');
const adminRouter = require('./routers/admin');
const quotesRouter = require('./routers/quotes');
const buildingRouter = require('./routers/services/building');
const furnishRouter = require('./routers/services/furnishing');
const automobileRouter = require('./routers/services/automobile');
const powerRouter = require('./routers/services/power');
const roadworkRouter = require('./routers/services/roadworks');
const roofRouter = require('./routers/services/roof');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


connectDB();

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 

const port = process.env.PORT;

app.use(helmet());
app.options('*', cors());

var whitelist = ['https://canaantowersb.netlify.app', 'http://localhost:8080', 'http://localhost:8081']
app.use(cors( {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
    },
    exposedHeaders: [ 'Authorization' ]
}))




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