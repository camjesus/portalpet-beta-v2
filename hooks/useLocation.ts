
import { useEffect, useState } from "react";
import { getCurrentLocation, reverseGeocode, searchAddress } from "@/services/utils/location";

export function useLocation() {
  const [coords, setCoords] = useState<{ lat: number; lng: number }>();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const loc = await getCurrentLocation();
      if (loc) {
        setCoords(loc);
        const addr = await reverseGeocode(loc.lat, loc.lng);
        setAddress(addr);
      }
      setLoading(false);
    })();
  }, []);

  const search = async (addr: string) => {
    const result = await searchAddress(addr);
    if (result) {
      setCoords({ lat: result.lat, lng: result.lng });
      setAddress(result.address);
    }
  };

  return { coords, setCoords, address, setAddress, search, loading };
}