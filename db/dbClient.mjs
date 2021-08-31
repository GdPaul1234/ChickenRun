import pkg from 'pg';
const { Client } = pkg;

import dotenv from 'dotenv';
dotenv.config()

import { Chicken } from '../models/chicken.mjs';

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

client.connect();

process.on( "SIGINT", function() {
  client.end()
  .then(() => console.log('client has disconnected'))
  .catch(err => console.error('error during disconnection', err.stack))

  console.log( "\ngracefully shutting down from SIGINT (Crtl-C)" );

  process.exit();
} );

/**
 * Obtenir les informations sur un chicken
 * @param chickenID {number} id du Chicken
 * @returns {JSON} les informations sur un chicken
 */
export async function getChicken(chickenID) {

  const stmt = 'select * from chicken where "chickenID"=$1';
  const result = await client.query({
    text: stmt,
    values: [chickenID],
  });
    return result.rows[0];
}

/**
 * Ajouter un nouveau chicken dans la BDD
 * @param chicken {Chicken} Le chicken à ajouter
 */
export async function createChicken(chicken) {
  let newChicken = Chicken.parseChicken(chicken);

  if(newChicken.isValid()) {
      const stmt = "insert into chicken(name,birthday,weight) values($1,$2,$3);";
      await client.query({
        text: stmt,
        values: [newChicken.name, new Date(), newChicken.weight],
      });
  } else {
    throw 'chicken is not a valid Chicken';
  }
}

/**
 * Remplacer l'enregistrement chickenID de la BDD par un nouveau chicken
 * @param chickenID  {number} id du Chicken
 * @param newChicken {Chicken} Le chicken à ajouter
 */
export async function replaceChicken(chickenID, newChicken) {
  newChicken = Chicken.parseChicken(newChicken);

  if(newChicken.isValid()) {
    const stmt = 'update chicken set name=$1,birthday=$2,weight=$3,steps=$4,"isRunning"=$5 where "chickenID"=$6;';
    await client.query({
      text: stmt,
      values: [newChicken.name,newChicken.birthday,
        newChicken.weight,newChicken.steps,newChicken.isRunning,
        chickenID],
    });
  } else {
    throw 'chicken is not a valid Chicken';
  }
}

/**
 * Modifier seulement un propriété d'un chicken
 * @param chickenID {number} id du Chicken
 * @param propertyName {string} nom de l'attribut à modifier
 * @param propertyValue {any} valeur de l'attribut à modifier
 */
export async function changeChickenProperty(chickenID, propertyName, propertyValue) {
  switch (propertyName) {
    case 'chickenID':
    case 'name':
    case 'birthday':
    case 'weight':
    case 'isRunning':
    case 'steps':
      const stmt = 'update chicken set "' + propertyName + '" = $1 where "chickenID" = $2';
      await client.query({
        text: stmt,
        values: [propertyValue,chickenID],
      });
      break;
  
    default:
      throw 'propertyName is not a valid property';
  }
} 

/**
 * Supprimer l'enregistrement d'un chicken de la BDD
 * @param chickenID {number} id du Chicken
 */
export async function deleteChicken(chickenID) {
  const stmt = 'delete from chicken where "chickenID"=$1';
  await client.query({
    text: stmt,
    values: [chickenID],
  });
}

/**
 * Forcer le chicken chickenID de faire un pas
 * @param chickenID  {number} id du Chicken
 */
export async function runChicken(chickenID) {
  const stmt = 'update chicken set steps = steps+1, "isRunning"=true where "chickenID"=$1'
  await client.query({
    text: stmt,
    values: [chickenID],
  })
}

export { client }