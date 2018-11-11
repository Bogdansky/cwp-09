const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const populationBelarus = "http://api.population.io:80/1.0/population/2017/Belarus/";

let promise = new Promise((resolve, reject) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", populationBelarus, false ); // false for synchronous request
    xmlHttp.send( null );
    responce = xmlHttp.responseText;
    if(responce){
        resolve(JSON.parse(responce))
    }
    else{
        reject("Bad request");
    }
});

promise.then((result) => {
    let totalPopulation = 0;
    result.forEach(element => {
        totalPopulation += element.total;
    });
    console.log(totalPopulation);
}).catch((error) => {
    console.log(error);
});