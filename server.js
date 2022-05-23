const
    express = require('express'),
    app = express(),
    eta = require('eta'),
    path = require('path'),
    PORT = process.env.PORT || 8080;

app.engine('eta', eta.renderFile);

app.set('view engine', 'eta');

app.set('views', './views');

app.use(express.static(path.join(__dirname + '/public')));

app.get('/', (request, response) => {

    const birthday = new Date("1994.07.04");
    let
    today = new Date(),
    age = (today.getFullYear() - birthday.getFullYear());

    const getMyage = function() {
	    if (today.getMonth() < birthday.getMonth() || today.getMonth() == birthday.getMonth() && today.getDate() < birthday.getDate()) {
		    return (age - 1) + " éves";
	    }
	    else if (today.getMonth() == birthday.getMonth() && today.getDate() == birthday.getDate()) {
		    return "Ma vagyok " + age + " éves! &#129321;";
	    }
	    else {
		    return age + " éves";
	    }
    }
    console.log("Age: " + getMyage());

    response.render('index', {
        age: getMyage()
    })
});

app.listen(PORT, _ => {
    console.log('Listening on port:', PORT);
});