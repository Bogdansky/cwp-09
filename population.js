const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const axios = require("axios");

const populationBelarus = "http://api.population.io:80/1.0/population/2017/Belarus/";
const populationCanada = "http://api.population.io:80/1.0/population/2017/Canada/";
const populationGermany = "http://api.population.io:80/1.0/population/2017/Germany/";
const populationFrance = "http://api.population.io:80/1.0/population/2017/France/";

const populationBelarus25age2014 = "http://api.population.io:80/1.0/population/2014/Belarus/25/";
const populationBelarus25age2015 = "http://api.population.io:80/1.0/population/2015/Belarus/25/";

function outputMaleFemale(population, country = "Belarus"){
    let male = 0, female = 0;
    console.log(country);
    population.forEach((element) => {
        male += element.males;
        female += element.females;
    });
    console.log(`There are ${male} males`);
    console.log(`There are ${female} females`);
}

function totalPopulation(result){
    let totalPopulation = 0;
    result.forEach(element => {
        totalPopulation += element.total;
    });
    console.log(`Belarus has ${totalPopulation} humans`);
}

// axios.get(populationBelarus).then((result) => {
//     totalPopulation(result.data);
// }).catch((error) => {
//     console.log(error);
// });

// let promises = [
//         axios.get(populationCanada),
//         axios.get(populationGermany),
//         axios.get(populationFrance)
//     ];

// const countries = ["Canada", "Germany", "France"];

// Promise.all(promises).then(results => {
//     results.forEach((result,index)=>{
//         outputMaleFemale(result.data,countries[index]);
//     })
// });

