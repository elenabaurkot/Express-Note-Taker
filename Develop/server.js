const express = require("express");
const app = express();
var PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
const fs = require("fs");

require("./public/routes/apiRoutes")(app);
require("./public/routes/htmlRoutes")(app);


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});