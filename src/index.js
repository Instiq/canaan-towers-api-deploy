const express = require('express'); 
const connectDB = require('./db/mongoose');
const cors = require('cors')
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
const port = process.env.PORT;


app.use(cors())
app.options('*', cors());


app.use(express.json({ extended: false }))
app.use(express.static('uploads'))
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