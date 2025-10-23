import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

const userMarkerIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149059.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});

export const Routing = ({ userLat, userLng, storeLat, storeLng }) => {
  const map = useMap();
  const routingRef = useRef(null);
  const userMarkerRef = useRef(null);

  useEffect(() => {
    if (!map || !userLat || !userLng || !storeLat || !storeLng) return;

    // Add user marker
    userMarkerRef.current = L.marker([userLat, userLng], { icon: userMarkerIcon }).addTo(map);

    // Initialize routing control
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(userLat, userLng), L.latLng(storeLat, storeLng)],
      lineOptions: { styles: [{ color: "#1677ff", weight: 5, opacity: 0.95 }] },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      show: false,
      createMarker: () => null,
      router: new L.Routing.OSRMv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),
    }).addTo(map);

    // Hide the panel
    const container = routingControl.getContainer();
    if (container?.parentNode) container.parentNode.removeChild(container);

    routingRef.current = routingControl;

    // Monkey-patch _clearLines to avoid errors if map is destroyed
    const originalClearLines = routingControl._clearLines;
    routingControl._clearLines = function () {
      if (this._map) return originalClearLines.call(this);
    };

    // Cleanup
    return () => {
      try {
        if (routingRef.current) map.removeControl(routingRef.current);
        if (userMarkerRef.current) map.removeLayer(userMarkerRef.current);
      } catch {
        /* safely ignore */
      }
      routingRef.current = null;
      userMarkerRef.current = null;
    };
  }, [userLat, userLng, storeLat, storeLng, map]);

  return null;
};
