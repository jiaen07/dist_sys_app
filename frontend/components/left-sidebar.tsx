"use client";

import { User, IdCard, Bus, Car, Bike, LucideIcon, Plus, Table, MapPin, MousePointer2, Activity } from "lucide-react";

export type TransitTab = "student" | "driver" | "bus" | "taxi" | "bicycle" | "logs";

interface TabConfig {
  id: TransitTab;
  label: string;
  Icon: LucideIcon;
  fields: { name: string; placeholder: string; backendKey: string; fullWidth?: boolean }[];
  columns: { label: string; key: string }[];
}

export const TABS: TabConfig[] = [
  { 
    id: "student", 
    label: "Student", 
    Icon: User,
    fields: [
      { name: "Full Name", placeholder: "e.g. John Doe", backendKey: "name" },
      { name: "Matric ID", placeholder: "A21JK0124", backendKey: "matric_id" },
      { name: "Email", placeholder: "john@university.edu", backendKey: "email", fullWidth: true },
    ],
    columns: [
      { label: "Name", key: "name" },
      { label: "Matric ID", key: "matric_id" },
      { label: "Email", key: "email" },
      { label: "Lat", key: "lat" },
      { label: "Lng", key: "lng" }
    ]
  },
  { 
    id: "driver", 
    label: "Driver", 
    Icon: IdCard,
    fields: [
      { name: "Full Name", placeholder: "e.g. John Doe", backendKey: "name" },
      { name: "Driver ID", placeholder: "DRV-12345", backendKey: "driver_id" },
      { name: "Status", placeholder: "Active", backendKey: "status", fullWidth: true },
    ],
    columns: [
      { label: "Name", key: "name" },
      { label: "Driver ID", key: "driver_id" },
      { label: "Status", key: "status" },
      { label: "Lat", key: "lat" },
      { label: "Lng", key: "lng" }
    ]
  },
  { 
    id: "bus", 
    label: "Bus", 
    Icon: Bus,
    fields: [
      { name: "Bus Name", placeholder: "e.g. Campus Express", backendKey: "name" },
      { name: "Color", placeholder: "Emerald Green", backendKey: "color" },
      { name: "Plate ID", placeholder: "BUS-101-UPM", backendKey: "plate_id" },
      { name: "Start", placeholder: "Main Library", backendKey: "start", fullWidth: true },
      { name: "Destination", placeholder: "Engineering Faculty", backendKey: "destination", fullWidth: true },
    ],
    columns: [
      { label: "Name", key: "name" },
      { label: "Plate", key: "plate_id" },
      { label: "Color", key: "color" },
      { label: "Start", key: "start" },
      { label: "End", key: "destination" },
      { label: "Lat", key: "lat" },
      { label: "Lng", key: "lng" }
    ]
  },
  { 
    id: "taxi", 
    label: "Taxi", 
    Icon: Car,
    fields: [
      { name: "Vehicle Name", placeholder: "Campus Taxi #4", backendKey: "name" },
      { name: "Color", placeholder: "White", backendKey: "color" },
      { name: "Plate ID", placeholder: "TAX-2024-XP", backendKey: "plate_id" },
      { name: "Start", placeholder: "Student Center", backendKey: "start", fullWidth: true },
      { name: "Destination", placeholder: "West Gate", backendKey: "destination", fullWidth: true },
    ],
    columns: [
      { label: "Name", key: "name" },
      { label: "Plate", key: "plate_id" },
      { label: "Color", key: "color" },
      { label: "Start", key: "start" },
      { label: "End", key: "destination" },
      { label: "Lat", key: "lat" },
      { label: "Lng", key: "lng" }
    ]
  },
  { 
    id: "bicycle", 
    label: "Bicycle", 
    Icon: Bike,
    fields: [
      { name: "Model Name", placeholder: "Eco-Ride V2", backendKey: "name" },
      { name: "Color", placeholder: "Silver", backendKey: "color" },
      { name: "Fleet ID", placeholder: "BIKE-042", backendKey: "fleet_id", fullWidth: true },
    ],
    columns: [
      { label: "Model", key: "name" },
      { label: "Fleet ID", key: "fleet_id" },
      { label: "Color", key: "color" },
      { label: "Lat", key: "lat" },
      { label: "Lng", key: "lng" }
    ]
  },
  { 
    id: "logs", 
    label: "Sys_Logs", 
    Icon: Activity,
    fields: [],
    columns: [
      { label: "Time", key: "time" },
      { label: "Layer", key: "layer" },
      { label: "Concept", key: "concept" },
      { label: "Details", key: "details" }
    ]
  },
];

interface LeftSidebarProps {
  isPicking: boolean;
  setIsPicking: (val: boolean) => void;
  formData: Record<string, string>;
  setFormData: (val: Record<string, string>) => void;
  activeTabId: TransitTab;
  setActiveTabId: (val: TransitTab) => void;
  allData: Record<TransitTab, any[]>;
}

export function LeftSidebar({ 
  isPicking, 
  setIsPicking, 
  formData, 
  setFormData, 
  activeTabId, 
  setActiveTabId,
  allData
}: LeftSidebarProps) {
  
  const activeTab = TABS.find((t) => t.id === activeTabId)!;
  const currentCategoryData = allData[activeTabId] || [];

  const handleInputChange = (backendKey: string, value: string) => {
    setFormData({ ...formData, [backendKey]: value });
  };

  return (
    <aside className="flex w-[600px] shrink-0 border-r border-zinc-200 bg-white overflow-hidden shadow-sm">
      <div className="w-10 flex flex-col items-center py-6 gap-6 bg-zinc-50 border-r border-zinc-100 shrink-0">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTabId(tab.id); setFormData({}); setIsPicking(false); }}
            aria-label={tab.label}
            className={`group relative flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 ${
              activeTabId === tab.id
                ? "bg-emerald-400 text-white shadow-md shadow-emerald-400/30 scale-105"
                : "bg-white text-zinc-400 border border-zinc-200 hover:border-emerald-200 hover:text-emerald-600 hover:shadow-sm"
            }`}
          >
            <tab.Icon size={16} strokeWidth={2.5} />
            <span className="absolute left-11 z-50 scale-0 group-hover:scale-100 transition-transform origin-left rounded-md bg-zinc-900 px-3 py-2 text-[10px] font-bold text-white shadow-xl whitespace-nowrap uppercase tracking-wider">
              {tab.label}
            </span>
            {activeTabId === tab.id && (
              <div className="absolute -left-1 h-5 w-1 rounded-r-full bg-emerald-400" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        <header className="px-6 py-4 border-b border-zinc-100 bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-emerald-50 rounded-md text-emerald-600">
              <activeTab.Icon size={16} />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-zinc-900 capitalize leading-none">
                {activeTab.label}s
              </h2>
              <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-tight mt-0.5">
                Connected to PostgreSQL
              </p>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col overflow-hidden">
          
          {activeTabId !== "logs" && (
            <section className="px-6 py-3 border-b border-zinc-50 bg-white shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <Plus size={12} className="text-emerald-600" />
                <h3 className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">
                  1. Fill Details <span className="text-emerald-500 font-bold ml-1">(Mandatory)</span>
                </h3>
              </div>
              
              <form className="grid grid-cols-2 gap-x-3 gap-y-2" onSubmit={(e) => e.preventDefault()}>
                {activeTab.fields.map((field) => (
                  <div key={field.backendKey} className={`flex flex-col gap-1 ${field.fullWidth ? 'col-span-2' : ''}`}>
                    <label className="text-[9px] font-bold text-zinc-400 ml-1">{field.name}</label>
                    <input 
                      type="text" 
                      required
                      value={formData[field.backendKey] || ""}
                      onChange={(e) => handleInputChange(field.backendKey, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-3 h-8 text-[11px] rounded-lg border border-zinc-100 bg-zinc-50/30 hover:border-emerald-200 focus:border-emerald-400 focus:ring-0 transition-all outline-none"
                    />
                  </div>
                ))}
                
                <div className="col-span-2 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={12} className="text-emerald-600" />
                    <h3 className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">
                      2. Save by Pinning on Map
                    </h3>
                  </div>
                  {(() => {
                    const isFormComplete = activeTab.fields.every(f => !!formData[f.backendKey]);
                    return (
                      <button
                        type="button"
                        disabled={!isFormComplete && !isPicking}
                        onClick={() => setIsPicking(!isPicking)}
                        className={`w-full h-16 flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed transition-all duration-200 ${
                          isPicking 
                            ? "bg-emerald-50 border-emerald-400 text-emerald-600 ring-4 ring-emerald-100 animate-pulse"
                            : isFormComplete
                              ? "bg-zinc-50 border-emerald-100 text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50/10"
                              : "bg-zinc-50 border-zinc-100 text-zinc-300 cursor-not-allowed opacity-50 shadow-inner"
                        }`}
                      >
                        {isPicking ? (
                          <>
                            <MousePointer2 size={18} className="animate-bounce" />
                            <span className="text-[11px] font-bold uppercase tracking-tight italic">Click map to finish & save</span>
                          </>
                        ) : (
                          <>
                            <MapPin size={18} />
                            <span className="text-[11px] font-bold uppercase tracking-tight">
                              {isFormComplete ? "Activate Pin-to-Save" : "Complete Details to Unlock Map"}
                            </span>
                          </>
                        )}
                      </button>
                    );
                  })()}
                </div>
              </form>
            </section>
          )}

          <section className="flex-1 flex flex-col min-h-0 bg-zinc-50/30">
            <div className="px-6 py-2 flex items-center justify-between border-b border-zinc-50 bg-white/50">
              <div className="flex items-center gap-2">
                <Table size={12} className="text-zinc-300" />
                <h3 className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">
                  List of {activeTab.label}s
                </h3>
              </div>
              <span className="text-[9px] bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-700 font-bold uppercase">
                {currentCategoryData.length} records
              </span>
            </div>

            <div className="flex-1 overflow-auto px-6 py-4">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 z-10 bg-zinc-50/95 backdrop-blur-sm">
                  <tr>
                    {activeTab.columns.map((col) => (
                      <th key={col.key} className="px-4 py-3 text-left text-[10px] font-black uppercase text-zinc-400 tracking-widest border-b border-zinc-100 min-w-[80px]">
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {currentCategoryData.length === 0 ? (
                    <tr>
                      <td colSpan={activeTab.columns.length} className="py-20 text-center">
                        <div className="flex flex-col items-center gap-3 opacity-30 grayscale">
                          <Table size={48} className="text-zinc-200" />
                          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                            No records found.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentCategoryData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-emerald-50/30 transition-colors">
                        {activeTab.columns.map((col) => (
                          <td key={col.key} className="px-4 py-3 text-[10px] font-medium text-zinc-600 whitespace-nowrap">
                            {typeof row[col.key] === "number" ? row[col.key].toFixed(4) : row[col.key]}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <footer className="p-4 border-t border-zinc-100 bg-white shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`h-1.5 w-1.5 rounded-full animate-pulse ${activeTabId === 'logs' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
              <span className={`text-[10px] font-bold uppercase tracking-tighter ${activeTabId === 'logs' ? 'text-amber-700' : 'text-emerald-700'}`}>
                {activeTabId === 'logs' ? 'Observing Distributed Traces' : 'Live Sink with PostgreSQL'}
              </span>
            </div>
          </div>
        </footer>
      </div>
    </aside>
  );
}
