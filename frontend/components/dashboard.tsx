"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/app/auth/auth-provider";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { LeftSidebar, TransitTab } from "./left-sidebar";
import { SyllabusNavigator } from "./syllabus-navigator";
import { EncapsulationWidget } from "./encapsulation-info";
import { generateSyllabusTraces } from "@/lib/simulation-engine";

const Map = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-zinc-50 text-zinc-400">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-emerald-600" />
    </div>
  ),
});

const API_BASE = "http://127.0.0.1:8000/api/v1";

export function Dashboard() {
  const { user } = useAuth();
  const supabase = getSupabaseBrowserClient();

  // State
  const [activeTabId, setActiveTabId] = useState<TransitTab>("student");
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [isPickingLocation, setIsPickingLocation] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [allData, setAllData] = useState<Record<TransitTab, any[]>>({
    student: [],
    driver: [],
    bus: [],
    taxi: [],
    bicycle: [],
    logs: [],
  });

  const addLog = useCallback((layer: number, concept: string, details: string) => {
    const newLog = {
      id: Date.now() + Math.random(),
      time: new Date().toLocaleTimeString(),
      layer: `L${layer}`,
      concept,
      details
    };
    setAllData(prev => ({
      ...prev,
      logs: [newLog, ...prev.logs].slice(0, 50) // Keep last 50
    }));
  }, []);

  // Fetch logic
  const fetchTab = useCallback(async (tabId: TransitTab) => {
    if (tabId === "logs") return;
    
    // --- Educational Logic: Active Simulation Effects ---
    if (selectedTopicId === "5.4") {
      // Pedagogy: Simulate Propagation & Transmission Delay
      await new Promise(r => setTimeout(r, 1200));
    }
    
    if (selectedTopicId === "2.17") {
      // Pedagogy: Simulate CSMA/CD Collision & Backoff
      addLog(2, "CSMA/CD", "Collision Detected! Entering Exponential Backoff...");
      await new Promise(r => setTimeout(r, 800));
      addLog(2, "BACKOFF", "Backoff timer expired. Re-attempting transmission...");
    }

    addLog(7, "API_REQ", `Fetching ${tabId} list from distributed cluster...`);
    addLog(6, "SERIALIZE", "JSON PDU created for GET request");
    addLog(4, "TCP_CONN", "Handshake with backend:127.0.0.1:8000");

    try {
      const pluralMap: Record<string, string> = {
        bus: "buses",
        taxi: "taxis",
        bicycle: "bicycles",
        student: "students",
        driver: "drivers"
      };
      const endpoint = `${API_BASE}/${pluralMap[tabId]}/`;
      
      const startTime = Date.now();
      const res = await fetch(endpoint);
      const rtt = Date.now() - startTime;

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      
      // --- Educational Logs: Phase 2 (Success) ---
      addLog(4, "TCP_ACK", `Received segments in ${rtt}ms`);
      addLog(6, "DESERIALIZE", `Unpacked ${data.length} records from Presentation Layer`);
      addLog(7, "APP_UPDATE", `UI synced with ${tabId} state`);

      setAllData(prev => ({ ...prev, [tabId]: data }));
    } catch (err) {
      addLog(7, "ERROR", `Network failure: ${err instanceof Error ? err.message : 'Unknown'}`);
      console.error(`Failed to fetch ${tabId}:`, err);
    }
  }, [addLog]);

  // Initial load
  useEffect(() => {
    ["student", "driver", "bus", "taxi", "bicycle"].forEach((tab) => {
      fetchTab(tab as TransitTab);
    });
  }, [fetchTab]);

  const handleAutoSave = useCallback(async (lat: number, lng: number) => {
    // --- Educational Logs: Simulation Engine Integration ---
    if (selectedTopicId) {
      const traces = generateSyllabusTraces(selectedTopicId);
      traces.forEach(t => addLog(t.layer, t.concept, t.details));
    }

    // --- Educational Logic: Active Simulation Effects ---
    if (selectedTopicId === "5.4") {
      await new Promise(r => setTimeout(r, 1200));
    }
    if (selectedTopicId === "2.17") {
      addLog(2, "CSMA/CD", "Collision Detected! Entering Exponential Backoff...");
      await new Promise(r => setTimeout(r, 800));
    }

    // --- Educational Logic: Saving Phase ---
    addLog(7, "UPSERT_REQ", `Instructing node to persist ${activeTabId} at [${lat.toFixed(4)}, ${lng.toFixed(4)}]`);
    addLog(6, "ENCODE", "Marshalling form data into Transfer Syntax (JSON)");
    addLog(4, "TCP_PUSH", "Streaming PDU to backend endpoint...");

    try {
      const pluralMap: Record<string, string> = {
        bus: "buses",
        taxi: "taxis",
        bicycle: "bicycles",
        student: "students",
        driver: "drivers"
      };
      const endpoint = `${API_BASE}/${pluralMap[activeTabId]}/`;
      const payload = { ...formData, lat, lng };
      
      const startTime = Date.now();
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const rtt = Date.now() - startTime;

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Database save failed");
      }

      const result = await res.json();
      
      // --- Educational Logs: Ack ---
      addLog(4, "TCP_ACK", `Response received (Round Trip Time: ${rtt}ms)`);
      addLog(7, "SYNC_OK", `Global state consistency maintained for ${activeTabId}`);

      // Cleanup
      setIsPickingLocation(false);
      setFormData({}); 
      fetchTab(activeTabId);
    } catch (error: any) {
      addLog(7, "FAULT", `Data flow interrupted: ${error.message}`);
      console.error("Failed to save:", error);
      alert(`Database Error: ${error.message}`);
    }
  }, [activeTabId, formData, fetchTab, addLog]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const userInitial = user?.email?.[0]?.toUpperCase() ?? "U";

  return (
    <div className="flex h-screen w-full flex-col bg-white overflow-hidden">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-100 px-4 sm:px-6 z-20 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow-lg shadow-emerald-500/20">
            {userInitial}
          </div>
          <div>
            <span className="block text-sm font-bold text-zinc-900 leading-none">
              Welcome back
            </span>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">
              {user?.email}
            </span>
          </div>
        </div>
        
        <button
          onClick={() => void handleSignOut()}
          className="inline-flex h-9 items-center justify-center rounded-full border border-zinc-200 bg-white px-5 text-xs font-bold text-zinc-700 transition-all hover:bg-zinc-50 active:scale-95"
        >
          Sign out
        </button>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar 
          isPicking={isPickingLocation} 
          setIsPicking={setIsPickingLocation} 
          formData={formData}
          setFormData={setFormData}
          activeTabId={activeTabId}
          setActiveTabId={setActiveTabId}
          allData={allData}
        />

        <main className="flex-1 relative bg-zinc-100 overflow-hidden flex">
          <div className="flex-1 relative">
            <Map 
              activeTabId={activeTabId}
              allData={allData}
              isPicking={isPickingLocation} 
              onPick={handleAutoSave}
            />
          </div>
          
          {activeTabId === "logs" && (
            <SyllabusNavigator 
              selectedTopicId={selectedTopicId}
              onSelectTopic={setSelectedTopicId}
            />
          )}

          <EncapsulationWidget 
            isVisible={activeTabId === "logs"} 
            activeTopicId={selectedTopicId} 
          />
        </main>
      </div>
    </div>
  );
}
