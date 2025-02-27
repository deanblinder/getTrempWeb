import { Place } from "@/app/useSearch";

export const isLocationWithinDistance = (
  place1: Place,
  place2: Place,
  radius: number
): boolean => {
  const lat1 = place1.geometry.location.lat();
  const lon1 = place1.geometry.location.lng();
  const lat2 = place2.geometry.location.lat();
  const lon2 = place2.geometry.location.lng();
  // Radius of the Earth in kilometers (mean value)
  const R = 6371.0;

  // Convert latitude and longitude from degrees to radians
  const radLat1 = (Math.PI * lat1) / 180;
  const radLon1 = (Math.PI * lon1) / 180;
  const radLat2 = (Math.PI * lat2) / 180;
  const radLon2 = (Math.PI * lon2) / 180;

  // Haversine formula
  const dLon = radLon2 - radLon1;
  const dLat = radLat2 - radLat1;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance <= radius;
};
