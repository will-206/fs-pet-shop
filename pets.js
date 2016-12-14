#!/usr/bin/env node

/* eslint-disable no-console */

'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const pets = JSON.parse(data);
    const petIndex = process.argv[3];

    if (petIndex >= 0) {
      if (petIndex < pets.length) {
        console.log(pets[petIndex]);
      }
      else {
        console.error(`Usage: ${node} ${file} read INDEX`);
        process.exit(1);
      }
    }
    else {
      console.log(pets);
    }
  });
}
else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) {
      throw readErr;
    }

    const pets = JSON.parse(data);
    const petAge = parseInt(process.argv[3]);
    const petKind = process.argv[4];
    const petName = process.argv[5];

    const newPet = { age: petAge, kind: petKind, name: petName };

    pets.push(newPet);

    const petsJSON = JSON.stringify(pets);

    if (petAge && petKind && petName) {
      fs.writeFile(petsPath, petsJSON, (writeErr) => {
        if (writeErr) {
          throw writeErr;
        }
        console.log(newPet);
      });
    }
    else {
      console.error(`Usage: ${node} ${file} create AGE KIND NAME`);
      process.exit(1);
    }
  });
}
else if (cmd === 'update') {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const pets = JSON.parse(data);
    const index = parseInt(process.argv[3]);
    const newAge = parseInt(process.argv[4]);
    const newKind = process.argv[5];
    const newName = process.argv[6];

    if (index && newAge && newKind && newName) {
      pets[index].age = newAge;
      pets[index].kind = newKind;
      pets[index].name = newName;

      const petsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, petsJSON, (writeErr) => {
        if (writeErr) {
          throw writeErr;
        }

        console.log(pets[index]);
      });
    }
    else {
      console.error(`Usage: ${node} ${file} update INDEX AGE KIND NAME`);
      process.exit(1);
    }
  });
}
else if (cmd === 'destroy') {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const pets = JSON.parse(data);
    const index = parseInt(process.argv[3]);

    if (index >= 0 && index < pets.length) {
      const newPets = pets.splice(index, 1);
      const petsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, petsJSON, (writeErr) => {
        if (writeErr) {
          throw writeErr;
        }
        console.log(newPets[0]);
      });
    }
    else {
      console.error(`Usage: ${node} ${file} destroy INDEX`);
      process.exit(1);
    }
  });
}
else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
