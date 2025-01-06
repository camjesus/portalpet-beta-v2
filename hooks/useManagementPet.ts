import { useState } from "react";
import { useReducer } from 'react';

const INITIAL_STATE = {
  name: "", //NO_NAME
  size: "", //SMALL - MEDIUM - BIG
  type: "", //DOG - CAT
  sex: "", //FAMALE - MALE
  oldMonths: 0,
  oldYears: 0,
  description: "",
  image: "",
  acction: "", //ADOPTION - WANTED - FOUND
  ubication: null, // N/A
};

//CREAR REDUCER QUE MANEJEN SOLO LA INTERFAZ
//CREAR UN REDUCER EN OTRO ARCHIVO PARA LAS MODIFICACIONES DE LAS MASCOTAS

