export const ACTION_LABEL: Record<string, string> = {
  ADOPTION: "Adopción",
  WANTED: "Buscado",
  FOUND: "Encontrado",
};

export const SIZE_LABEL: Record<string, string> = {
  SMALL: "Pequeño",
  MEDIUM: "Mediano",
  BIG: "Grande",
};

export const TYPE_LABEL: Record<string, string> = {
  DOG: "Perro",
  CAT: "Gato",
};

export const SEX_LABEL: Record<string, string> = {
  MALE: "Macho",
  FEMALE: "Hembra",
};

export function formatAge(age: number, ageType: string) {
  if (!age) return null;
  return ageType === "MONTH"
    ? `${age} ${age === 1 ? "mes" : "meses"}`
    : `${age} ${age === 1 ? "año" : "años"}`;
}

export function formatDate(date: Date) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function getPetName(name: string) {
  return name === "NO_NAME" || !name ? "Sin nombre" : name;
}
