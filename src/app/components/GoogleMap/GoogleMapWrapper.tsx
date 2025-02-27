"use client";
import {
  useLoadScript,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import styles from "./GoogleMapWrapper.module.css";
import { Place } from "@/app/useSearch";

interface GoogleMapWrapperProps {
  origin?: Place;
  destination?: Place;
  showRoute?: boolean;
  selectedRouteIndex?: number;
  onRouteChange?: (index: number) => void;
}

const GoogleMapWrapper = ({
  origin,
  destination,
  showRoute = false,
  selectedRouteIndex = 0,
  onRouteChange,
}: GoogleMapWrapperProps) => {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [currentRouteIndex, setCurrentRouteIndex] =
    useState(selectedRouteIndex);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  useEffect(() => {
    if (isLoaded && origin && destination && showRoute) {
      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: {
            lat: origin.geometry.location.lat(),
            lng: origin.geometry.location.lng(),
          },
          destination: {
            lat: destination.geometry.location.lat(),
            lng: destination.geometry.location.lng(),
          },
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true, // Request alternative routes
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          }
        }
      );
    }
  }, [isLoaded, origin, destination, showRoute]);

  const center = {
    lat: 32.0853,
    lng: 34.7818,
  }; // Default to Tel Aviv

  if (!isLoaded) {
    return <div className={styles.loadingContainer}>Loading map...</div>;
  }

  return (
    <div className={styles.mapContainer}>
      {directions && directions.routes.length > 1 && (
        <button
          onClick={() => {
            const nextIndex =
              (currentRouteIndex + 1) % directions.routes.length;
            setCurrentRouteIndex(nextIndex);
            onRouteChange?.(nextIndex);
          }}
          className={styles.routeButton}
        >
          Change Route ({currentRouteIndex + 1}/{directions.routes.length})
        </button>
      )}
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName={styles.map}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {directions && (
          <>
            <DirectionsRenderer
              directions={{
                ...directions,
                routes: [directions.routes[currentRouteIndex]],
              }}
              options={{
                polylineOptions: {
                  strokeColor: "#4285F4",
                  strokeWeight: 5,
                  strokeOpacity: 1,
                },
              }}
            />
          </>
        )}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapWrapper;
