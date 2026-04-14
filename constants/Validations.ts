import { Validation } from "@/models";

export const AGE_VALIDATION: Validation = {
  type: "Validación",
  msg: "Verificar los valores del rango de edad.",
  sucess: false,
};
export const OK_VALIDATION: Validation = {
  type: "Eureka!",
  msg: "La mascota se ha creado con éxito!",
  sucess: true,
};

export const OK_VALIDATION_UPDATE: Validation = {
  type: "Eureka!",
  msg: "La mascota se ha actualizado con éxito!",
  sucess: true,
};

export const FIELD_VALIDATION = (message: string): Validation => ({
  type: "Validación",
  msg: message,
  sucess: false,
});

export const OK_REPORT: Validation = {
  type: "Eureka!",
  msg: "Se ha enviado el reporte, estamos solucionando el problema.",
  sucess: true,
};
