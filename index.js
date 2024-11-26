const express = require("express");

const app = express();

app.get("/", function(request, response){
     
    response.send("<h2>Привет, Октагон!</h2>");
});


app.get("/", function (request, response) {
    response.send("<h2>Привет, Октагон!</h2>");
});


app.get("/static", function (request, response) {
    response.json({
        header: "Hello",
        body: "Octagon NodeJS Test"
    });
});


app.get("/dynamic", function (request, response) {
    const { a, b, c } = request.query;

    if (!a || !b || !c || isNaN(a) || isNaN(b) || isNaN(c)) {
        return response.json({
            header: "Error"
        });
    }


    const result = (a * b * c) / 3;

    response.json({
        header: "Calculated",
        body: result.toString()
    });
});
app.listen(3000);