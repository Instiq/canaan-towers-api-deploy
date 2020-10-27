const express = require('express'); 
require('./db/mongoose');
const userRouter = require('./routers/users');
const adminRouter = require('./routers/admin');
const quotesRouter = require('./routers/quotes');
const buildingRouter = require('./routers/services/building');

const app = express();
const port = process.env.PORT;

app.use(express.json({ extended: false }))
app.use(userRouter)
app.use(adminRouter)
app.use(quotesRouter)
app.use(buildingRouter)

app.get('/', (req, res) => {
    res.send('this is working')

})

app.listen(port, () => console.log(`Server running on port: ${port}`))