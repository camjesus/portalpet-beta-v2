import { useState, useEffect } from "react";
import { getCurrentLocation } from "@/services/utils/location";

type Coords = { lat: number; lng: number };

export function useLocationMap(initialCoords: Coords | null) {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialCoords) {
      setCoords(initialCoords);
    } else {
      getCurrentLocation().then((loc) => {
        if (loc) setCoords({ lat: loc.lat, lng: loc.lng });
      });
    }
  }, []);

  async function search(query: string) {
  }

  return { coords, setCoords, address, setAddress, search, loading };
}