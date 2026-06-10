"use client";

import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet + Next.js
const defaultIcon = typeof window !== "undefined" ? L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
}) : null;

// Category-specific icons using L.divIcon
const createCategoryIcon = (color: string) => typeof window !== "undefined" ? L.divIcon({
  className: "custom-marker",
  html: `<div style="
    background-color: ${color};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  ">
    <div style="width: 6px; height: 6px; background: white; border-radius: 50%;"></div>
  </div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
}) : null;

const ICONS: Record<string, any> = {
  student: createCategoryIcon("#3b82f6"),
  driver: createCategoryIcon("#f59e0b"),
  bus: createCategoryIcon("#10b981"),
  taxi: createCategoryIcon("#eab308"),
  bicycle: createCategoryIcon("#6b7280"),
};

interface MapProps {
  isPicking: boolean;
  onPick: (lat: number, lng: number) => void;
  allData: Record<string, any[]>;
  activeTabId: string;
}

function MapEvents({ isPicking, onPick }: { isPicking: boolean; onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      if (isPicking) {
        onPick(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
}

export default function Map({ isPicking, onPick, allData, activeTabId }: MapProps) {
  const [mounted, setMounted] = useState(false);
  const defaultPosition: [number, number] = [6.4578, 100.5056];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Items to display based on active tab - cached to prevent Leaflet reconciliation on log updates
  const markers = useMemo(() => {
    if (!mounted || activeTabId === "logs") return [];
    
    const items = allData[activeTabId] || [];
    const icon = ICONS[activeTabId] || defaultIcon;

    return items
      .filter(item => item && typeof item.lat === 'number' && typeof item.lng === 'number')
      .map((item, idx) => {
        const itemKey = item.matric_id || item.plate_id || item.driver_id || item.fleet_id || `idx-${idx}`;
        return (
          <Marker 
            key={`${activeTabId}-${itemKey}`} 
            position={[item.lat, item.lng]} 
            icon={icon}
          >
            <Popup>
              <div className="p-1 min-w-[120px]">
                <p className="text-[11px] font-black text-zinc-900 uppercase truncate">
                  {item.name || "Stationary Node"}
                </p>
                <p className="text-[9px] text-zinc-400 mt-0.5 font-mono">
                  ID: {itemKey}
                </p>
                <div className="mt-2 pt-2 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-[8px] font-bold text-emerald-600 uppercase tracking-tighter">
                    {activeTabId} Node
                  </span>
                  <span className="text-[8px] text-zinc-300">Active</span>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      });
  }, [allData[activeTabId], activeTabId, mounted]);

  if (!mounted) return null;

  return (
    <div className={`h-full w-full transition-all duration-500 overflow-hidden ${isPicking ? "cursor-crosshair" : ""}`}>
      {isPicking && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-zinc-900/90 text-white px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest shadow-2xl border border-white/20 backdrop-blur-md">
          <span className="flex items-center gap-2 text-white">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            Click on the map to pin & save the location
          </span>
        </div>
      )}

      <MapContainer
        center={defaultPosition}
        zoom={16}
        scrollWheelZoom={true}
        className="h-full w-full z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapEvents isPicking={isPicking} onPick={onPick} />

        {/* Global Markers: UUM Landmark */}
        {defaultIcon && (
          <Marker position={defaultPosition} icon={defaultIcon}>
            <Popup>Universiti Utara Malaysia (UUM)</Popup>
          </Marker>
        )}

        {/* Dynamic Category Markers */}
        {markers}
      </MapContainer>
    </div>
  );
}
