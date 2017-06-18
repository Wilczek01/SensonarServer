var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());  
app.use(cors());


var mongoose = require('mongoose');

app.listen(3000, function () {
    console.log("App listening on port 3000");
    mongoose.connect('mongodb://air:air2017@ds133981.mlab.com:33981/cleanair');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'b³¹d po³¹czenia z baza danych...'));
    db.once('open', function () {
        console.log('db opened');
       
  	    var Schema = mongoose.Schema;
        var SensorsSchema = new Schema({
            serial_number: String,
            device_type: String,
			probed_at: String,
			position: { coordinates: [
							String,
							String
					]
			},
            measurements: {			
				PM2_5: String,
				CO: String,
				PM1: String,
				PM10: String,
				SO2: String,
				O3: String,
				NO2: String,
				sensor_temperature: String
			}
        });
        Sensor = mongoose.model('SensorMeasurements', SensorsSchema);
    });

	
});

app.get('/', function(request, response) {
   response.send('Hello world');
});

app.get('/products', function (req, res) {
     /*   Sensor.find(function (err, products) {
        console.log('GET ALL PRODUCTS');
        if (err) {
		    console.log("Problem z odczytem do bazy");
            res.send(err);
		}
	    else {
		   console.log("Sukcess odczytu z bazy");
           res.status(201).send; 
		}  */
		
		
		res.writeHead(200, {
        'Content-Type': 'application/json;charset=utf-8'
        });

        Sensor.find({}, function (err, orders) {
		
		    console.log('GET ALL PRODUCTS');
            if (err) {
		        console.log("Problem z odczytem do bazy");
                res.send(err);
		    }
	        else {
		       console.log("Sukcess odczytu z bazy");
               res.end(JSON.stringify(orders));
		    } 
         });
});

app.post('/products', function (req, res) {
    
	console.log('Post product');
    console.log(req.body); //This prints the JSON document received (if it is a JSON document)
	
	new Sensor(req.body).save(function (err) {
        if (err) {
		    console.log("Problem z zapisem do bazy");
            res.send(err);
		}
	    else {
		   console.log("Sukcess zapisu do bazy");
           res.status(201).json(req.body.serial_number); 
		}
    });  

  //  res.status(201).json(req.body.serial_number);   // wyswy³a status oraz info o numerze czyjnika
});


