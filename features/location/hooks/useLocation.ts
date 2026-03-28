import { useEffect } from "react";
import { getCurrentLocation } from "@/services/utils/location";
import { filterActions } from "@/services/filter/filterActions";

export function useLocation(dispatch: React.Dispatch<any>) {
  useEffect(() => {
    (async () => {
      const loc = await getCurrentLocation();
      if (loc) {
        filterActions.changeFilter(dispatch, "latitude", loc.lat);
        filterActions.changeFilter(dispatch, "longitude", loc.lng);
      }
    })();
  }, []);
}