const
	dotenv = require('dotenv').load(),
	express = require('express'),
	app = express(),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	MONGODB_URI = 'mongodb://localhost:27017/react-express-jwt',
	PORT = process.env.PORT || 3001,
	usersRoutes = require('./routes/users.js'),
	kontenRoutes = require('./routes/Konten.js')

const cors = require('cors')

app.use(cors(
	{
		origin: 'http://127.0.0.1:5173',
		credentials: true,
	// x-access-token
		allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],

	}
))


mongoose.set('useCreateIndex', true)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (err) => {
	console.log(err || `Connected to MongoDB.`)
})
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(logger('dev'))
app.use(bodyParser.json())


app.get('/api', (req, res) => {
	res.json({message: "API root."})
});

app.use('/api/users', usersRoutes)
app.use('/api/konten', kontenRoutes)



app.listen(PORT, (err) => {
	console.log(err || `Server running on port ${PORT}.`)
})

