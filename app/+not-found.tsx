import React from "react";
import ViewCustom from "@/components/ViewCustom";
import Loading from "@/components/ui/Loading";

export default function NotFoundScreen() {
  console.log("entro a not found");

  return (
    <ViewCustom>
      <Loading />
    </ViewCustom>
  );
}
