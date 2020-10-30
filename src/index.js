const express = require('express'); 
const connectDB = require('./db/mongoose');
const cors = require('cors')
const userRouter = require('./routers/users');
const adminRouter = require('./routers/admin');
const quotesRouter = require('./routers/quotes');
const buildingRouter = require('./routers/services/building');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


connectDB();

const app = express();
const port = process.env.PORT;


app.use(cors())
app.use(express.json({ extended: false }))
app.use(userRouter)
app.use(adminRouter)
app.use(quotesRouter)
app.use(buildingRouter)

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (req, res) => {
    res.send('this is working')

})

app.listen(port, () => console.log(`Server running on port: ${port}`))