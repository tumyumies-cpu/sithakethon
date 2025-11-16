
'use client';

import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { HandHeart } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';

const locations = [
  { position: [12.9716, 77.5946], name: "Bangalore", donations: 120 },
  { position: [19.0760, 72.8777], name: "Mumbai", donations: 85 },
  { position: [28.6139, 77.2090], name: "Delhi", donations: 95 },
  { position: [13.0827, 80.2707], name: "Chennai", donations: 70 },
  { position: [18.5204, 73.8567], name: "Pune", donations: 60 },
  { position: [22.5726, 88.3639], name: "Kolkata", donations: 50 },
];

const customIcon = new Icon({
    iconUrl: "data:image/svg+xml," + encodeURIComponent(
        ReactDOMServer.renderToStaticMarkup(
            <HandHeart className="h-6 w-6 text-white fill-primary" />
        )
    ),
    iconSize: [24, 24],
    className: 'bg-primary p-1 rounded-full shadow-lg'
});

const InteractiveMap = () => {
  if (typeof window === 'undefined') {
    return (
        <div className="w-full h-full bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">Loading map...</p>
        </div>
    );
  }

  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {locations.map((loc, idx) => (
        <React.Fragment key={idx}>
            <Marker position={loc.position as [number, number]} icon={customIcon}>
                <Popup>
                    <div className="font-bold">{loc.name}</div>
                    <p>{loc.donations} Active Partners</p>
                </Popup>
            </Marker>
            <Circle
                center={loc.position as [number, number]}
                radius={loc.donations * 500}
                pathOptions={{
                    color: 'hsl(var(--primary))',
                    fillColor: 'hsl(var(--primary))',
                    fillOpacity: 0.1,
                    weight: 1,
                }}
            />
        </React.Fragment>
      ))}
    </MapContainer>
  );
};

export default InteractiveMap;
