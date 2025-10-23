import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CustomMarker } from "../components/CustomMarker";

const { BaseLayer } = LayersControl;

//function LocationMap({ lat, lng }) {
function LocationMap() {
  //if (!lat || !lng) return null;

  //   const lat = -1.2142139;
  //   const lng = 36.8661946;

  const lat = -1.276502;
  const lng = 36.826517;

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      style={{ height: "500px", width: "100%", borderRadius: "10px" }}
    >
      <LayersControl position="topright">
        <BaseLayer checked name="Street View">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </BaseLayer>

        <BaseLayer name="Satellite">
          <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
        </BaseLayer>

        <BaseLayer name="Terrain">
          <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
        </BaseLayer>

        <BaseLayer name="Dark Mode">
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        </BaseLayer>
      </LayersControl>
      <Marker position={[lat, lng]} icon={CustomMarker}>
        <Popup>Your current location</Popup>
      </Marker>
    </MapContainer>
  );
}

export default LocationMap;
