import { LoadScript } from "@react-google-maps/api";
import type { ReactNode } from "react";

const libraries: ("places")[] = ["places"];

interface Props {
  children: ReactNode;
}

export default function GoogleMapsProvider({ children }: Props) {
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      {children}
    </LoadScript>
  );
}