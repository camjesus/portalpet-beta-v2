export const ACCTIONS = ["ADOPTION", "WANTED", "FOUND"];
export const LABELS_ACCTION = ["En adopción", "Buscado", "Encontrado"];
export const PLACEHOLDER_DESCRIPTION = [
  "Esbribe una descripción de la mascota.",
  "Esbribe una descripción de la mascota, donde lo viste por última vez, detalles distintivos para reconocerlo.",
  "Esbribe una descripción de la mascota, donde lo encontraste, detalles distintivos para reconocerlo.",
];
export const SIZE = ["SMALL", "MEDIUM", "BIG"];
export const LABEL_SIZE = ["Pequeño", "Mediano", "Grande"];
export const MAXIMUN_AGE = 25;
export const defaultRescuer = {
  id: "",
  name: "",
  lastName: "",
  email: "",
};

export type ActionType = "ADOPTION" | "WANTED" | "FOUND" | "ADOPTED"| "FOUNDED" | "DELIVERED" | "ADAPTING";

export type ActionConfig = {
  label: string;
  color: string;
};

export const ACTION_CONFIG: Record<ActionType, ActionConfig> = {
  ADOPTION:  { label: "ADOPCIÓN", color: "#9D69A3" },
  WANTED:    { label: "BUSCADO",  color: "#C73E1D" },
  FOUND:     { label: "ENCONTRADO", color: "#2E86AB" },
  ADOPTED:   { label: "ADOPTADO", color: "#6B4870"  },
  FOUNDED:   { label: "ENCONTRADO", color: "#8A2B14" },
  DELIVERED: { label: "ENTREGADO", color: "#1E5C75"  },
  ADAPTING:  { label: "ADAPTACIÓN", color: "#c88bcfff"  },
};

export const ACTIONS = Object.keys(ACTION_CONFIG) as ActionType[];


export const ROUTE_BY_ACTION: Partial<Record<ActionType | ActionType, string>> = {
  ADOPTION:  "/managementAdoption",
  ADAPTING:  "/managementAdoption",
  ADOPTED:   "/managementAdoption",
  FOUND:     "/managementFound",
  FOUNDED:   "/managementFound",
  WANTED:    "/managementWanted",
  DELIVERED: "/managementWanted",
};