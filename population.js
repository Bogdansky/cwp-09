const axios = require("axios");
const Promise = require('bluebird');

const populationBelarus = "http://api.population.io:80/1.0/population/2017/Belarus/";
const populationCanada = "http://api.population.io:80/1.0/population/2017/Canada/";
const populationGermany = "http://api.population.io:80/1.0/population/2017/Germany/";
const populationFrance = "http://api.population.io:80/1.0/population/2017/France/";

const populationBelarus25age2014 = "http://api.population.io:80/1.0/population/2014/Belarus/25/";
const populationBelarus25age2015 = "http://api.population.io:80/1.0/population/2015/Belarus/25/";

const mortalityForGreeceMen = "http://api.population.io:80/1.0/mortality-distribution/Greece/male/49y2m/today/";
const mortalityForGreeceWomen = "http://api.population.io:80/1.0/mortality-distribution/Greece/female/49y2m/today/";

const mortalityForTurkeyMen = "http://api.population.io:80/1.0/mortality-distribution/Turkey/male/49y2m/today/";
const mortalityForTurkeyWomen = "http://api.population.io:80/1.0/mortality-distribution/Turkey/female/49y2m/today/";

function totalPopulation(result){
    let totalPopulation = 0;
    result.forEach(element => {
        totalPopulation += element.total;
    });
    console.log(`Belarus has ${totalPopulation} humans`);
}

function outputMaleFemale(population, country = "Belarus"){
    let male = 0, female = 0;
    console.log(country);
    population.forEach((element) => {
        male += element.males;
        female += element.females;
    });
    console.log(`Year ${population[0].year}`)
    console.log(`There are ${male} males`);
    console.log(`There are ${female} females`);
}

function outputAgeMaleFemale(category){
    console.log(`Year ${category.year}`);
    console.log(`There are ${category.males} males`);
    console.log(`There are ${category.females} females`);
}

function getMaxMortal(result, country = "Belarus"){
    let age;
    let mortalityPercent = 0;
    result.forEach(point => {
        if (point.mortality_percent > mortalityPercent){
            mortalityPercent = point.mortality_percent;
            age = point.age;
        }
    });
    console.log(country)
    console.log(`Max age of mortality is ${age}`);
}

function getMessage(message){
    console.log(`Information has not loaded because ${message}`);
}

axios.get(populationBelarus).then((result) => {
    totalPopulation(result.data);
}).catch((error) => {
    console.log(error);
});

let promises = [
        axios.get(populationCanada),
        axios.get(populationGermany),
        axios.get(populationFrance)
    ];

const countries = ["Canada", "Germany", "France"];

Promise.all(promises).then(results => {
    results.forEach((result,index)=>{
        outputMaleFemale(result.data,countries[index]);
    })
});

let promisesAboutYears = [
    axios.get(populationBelarus25age2014),
    axios.get(populationBelarus25age2015)
];

Promise.any(promisesAboutYears).then(result => {
    outputMaleFemale(result.data);
}).catch(error => {
    console.log(`Information has not loaded because ${error.message}`)
})

Promise.props({
    male: axios.get(mortalityForGreeceMen),
    female: axios.get(mortalityForGreeceWomen)
}).then(result => {
    console.log('Male');
    getMaxMortal(result['male'].data.mortality_distribution, "Greece");   
    console.log('Female');
    getMaxMortal(result['female'].data.mortality_distribution, "Greece")
}).catch(error => {
    getMessage(error.message);
});

Promise.props({
    male: axios.get(mortalityForTurkeyMen),
    female: axios.get(mortalityForTurkeyWomen)
}).then(result => {
    console.log('Male');
    getMaxMortal(result['male'].data.mortality_distribution, "Turkey");   
    console.log('Female');
    getMaxMortal(result['female'].data.mortality_distribution, "Turkey")
}).catch(error => {
    getMessage(error.message);
});

axios.get('http://api.population.io:80/1.0/countries').then(result => {
    Promise.map(result.data.countries.slice(0,5), country => {
        return axios.get(`http://api.population.io:80/1.0/population/2007/${country}/`);
    }).then(results => {
        results.forEach(result => {
            let total = 0;
            result.data.forEach(article => {
                total += article.total;
            })
            console.log(`Country ${result.data[0].country} with population what equals ${total}`);
        });
    }).catch(error => getMessage(error));
})
