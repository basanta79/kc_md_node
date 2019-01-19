'use strict';

var readLine = require('readline'); 
var db = require('../lib/connectMongoose');
//var schema = require('../model/anuncio');
var Anuncio = require('../model/anuncio'); // mongoose.model('anuncio', schema);
var arrInitValues = require('../data/initAnuncios.json');

//console.log(arrInitValues);

db.once('open', async () => {
    try{
        //Ask to user for erase confirmation.
        const respuesta = await askUser('Estás seguro que quieres que borre TODA la base de datos? (no) ');

        if (respuesta !== 'si'){
            console.log('proceso cancelado');
            process.exit(0); // Exit clean
        }

        await initDataBase(Anuncio, arrInitValues, 'anuncios');

        db.close();

    } catch(err){
        console.log('Hubo un error ', err);
        process.exit(0);
    }
});


/**
 * @description This function shows a question in cosole, and waits for user answer. 
 * @param {String} question String to show in console
 * @return Promise.
 */
function askUser(question){
    const promAnswer = new Promise((resolve, reject) =>{
        const interfaz = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        interfaz.question(question,answer =>{
            interfaz.close();
            resolve(answer);
        })
    })
    return promAnswer;
}

/**
 * @description Function to delete documents in model given in arguments, and insert documents
 * given in initArray. Description is only for console.log literal.
 * @param {Mongoose.Model} model 
 * @param {json} initArray 
 * @param {String} description 
 * @return {Promise} Promise
 */
async function initDataBase(model, initArray, description){
    const deleted = await model.deleteMany();
    console.log(`Se han eliminado ${deleted.n} ${description}.`);

    const inserted = await model.insertMany(initArray);
    console.log(`Se han añadido ${inserted.length} ${description}.`);
}
