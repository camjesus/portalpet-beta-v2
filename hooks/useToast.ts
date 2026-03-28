import { useState } from "react";
import { Validation } from "@/models";

export function useToast() {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<Validation>();

  function showToast(validation: Validation) {
    setConfig(validation);
    setVisible(true);
  }

  return { visible, config, showToast, setVisible };
}