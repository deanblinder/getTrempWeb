"use client";

import { useLoadScript } from "@react-google-maps/api";
import { ReactNode, createContext, useContext } from "react";

interface GoogleMapsContextType {
  isLoaded: boolean;
}

interface GoogleMapsProviderProps {
  children: ReactNode;
}

const GoogleMapsContextInstance = createContext<GoogleMapsContextType>({
  isLoaded: false,
});

export const GoogleMapsContext = {
  isLoaded: false,
  useContext: () => useContext(GoogleMapsContextInstance),
};

const GoogleMapsProvider = ({ children }: GoogleMapsProviderProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
    language: "he",
  });

  GoogleMapsContext.isLoaded = isLoaded;

  return (
    <GoogleMapsContextInstance.Provider value={{ isLoaded }}>
      {children}
    </GoogleMapsContextInstance.Provider>
  );
};

export default GoogleMapsProvider;
