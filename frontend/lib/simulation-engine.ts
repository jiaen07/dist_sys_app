export interface SyllabusTrace {
  layer: number;
  concept: string;
  details: string;
}

export type SyllabusChapter = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export const SYLLABUS_MAP: Record<string, SyllabusTrace[]> = {
  // --- 1. Foundations ---
  "1.3": [
    { layer: 7, concept: "SYNTAX", details: "JSON payload structure validated against Pydantic schema" },
    { layer: 7, concept: "SEMANTICS", details: "Interpreting 'GPS' coordinates as geographic telemetry" },
    { layer: 7, concept: "TIMING", details: "Checking message sequencing (Sequence #: 1204)" }
  ],
  "1.7": [
    { layer: 6, concept: "ENCAPSULATION", details: "L7 Data wrapped in Presentation Header (JSON Stream)" },
    { layer: 4, concept: "ENCAPSULATION", details: "L6 Stream fragmented into TCP segments" },
    { layer: 3, concept: "ENCAPSULATION", details: "L4 Segment wrapped in IP Packet header" }
  ],
  "1.10": [
    { layer: 7, concept: "PEER_TO_PEER", details: "Logical link established between Client.Node and Server.Node" },
    { layer: 1, concept: "PHYSICAL", details: "Physical data path active: Copper/Fiber Medium" }
  ],

  // --- 2. OSI Model (L1/L2 focus) ---
  "2.2": [
    { layer: 7, concept: "OSI_VS_ACTUAL", details: "Mapping theoretical OSI layers to practical TCP/IP stack" }
  ],
  "2.5": [
    { layer: 1, concept: "MANCHESTER", details: "Encoding bitstream: 1010 -> High-Low pulses visible" }
  ],
  "2.7": [
    { layer: 1, concept: "HALF_DUPLEX", details: "Waiting for transmission channel to be clear... (1 hop)" },
    { layer: 1, concept: "CTS_SIGNAL", details: "Clear-to-Send received from backend node" }
  ],
  "2.13": [
    { layer: 2, concept: "FRAMING", details: "Encapsulating: [PREAMBLE][DST_MAC][SRC_MAC][DATA][CRC]" },
    { layer: 2, concept: "MAC_ADDR", details: "Source: 00:0A:95:9D:68:16 | Dest: FF:FF:FF:FF:FF:FF" }
  ],
  "2.14": [
    { layer: 2, concept: "CRC_PROC", details: "Calculating Frame Check Sequence (Polynomial: 0x04C11DB7)" },
    { layer: 2, concept: "CRC_PASS", details: "Redundancy check match! Bit integrity confirmed" }
  ],
  "2.17": [
    { layer: 2, concept: "CSMA/CD", details: "Collision detected! Sensing carrier voltage surge..." },
    { layer: 2, concept: "BACKOFF", details: "Exponential backoff: waiting 16ms before retry" }
  ],
  "2.31": [
    { layer: 3, concept: "FRAGMENTATION", details: "Packet > MTU (1500). Dividing L3 Payload into fragments" }
  ],

  // --- 3. TCP/IP Model ---
  "3.4": [
    { layer: 4, concept: "TCP/IP_MAP", details: "L7-L5 mapped to Application Layer; L4 to Transport Layer" }
  ],

  // --- 4. Encapsulation ---
  "4.2": [
    { layer: 2, concept: "DECAPSULATION", details: "Stripping Ethernet Header; passing Packet to Network Layer" },
    { layer: 3, concept: "DECAPSULATION", details: "Stripping IP Header; passing Segment to Transport Layer" }
  ],

  // --- 5. Performance ---
  "5.4": [
    { layer: 1, concept: "T_PROP", details: "Propagation delay across physical cable: 1.2ms" },
    { layer: 1, concept: "T_TRANS", details: "Transmission delay (Serialization): 0.5ms" },
    { layer: 4, concept: "T_QUEUE", details: "Buffer wait time in server queue: 15ms" }
  ],
  "5.5": [
    { layer: 4, concept: "JITTER", details: "Measuring inter-arrival variance: 2.1ms (Stable)" }
  ],

  // --- 6. Transport ---
  "6.2": [
    { layer: 4, concept: "TCP_SYN", details: "Opening connection (Seq=0, Win=65535)" },
    { layer: 4, concept: "TCP_SAK", details: "Received SYN-ACK from backend process" },
    { layer: 4, concept: "TCP_ACK", details: "Handshake complete. Connection ESTABLISHED." }
  ],
  "6.5": [
    { layer: 4, concept: "FLOW_CTRL", details: "Adjusting Sliding Window size based on peer feedback (64KB)" }
  ],

  // --- 7. IP Addressing ---
  "7.2": [
    { layer: 3, concept: "SUBNETTING", details: "Applying mask 255.255.255.0 to determine local broadcast domain" }
  ],

  // --- 8. Error Control ---
  "8.2": [
    { layer: 2, concept: "CRC_ERR", details: "CRC Mismatch! Dropping corrupted frame at L2" }
  ],
  "8.3": [
    { layer: 2, concept: "HAM_CORR", details: "Single-bit error detected. Hamming code correction applied" }
  ],

  // --- 9. Serialization ---
  "9.3": [
    { layer: 6, concept: "ENDIAN_CNV", details: "Converting Host (Little-Endian) to Network (Big-Endian)" }
  ],
  "9.5": [
    { layer: 6, concept: "IDL_STUB", details: "Invoking gRPC stub for marshalling data to wire format" }
  ],

  // --- 10. Application ---
  "10.1": [
    { layer: 7, concept: "HTTPV3", details: "QUIC (UDP) stream initiated. Stream ID: 4" }
  ],

  // --- 11. Sockets ---
  "11.1": [
    { layer: 4, concept: "SOCKET_BIND", details: "Server: bind(AF_INET, 0.0.0.0:8000)" },
    { layer: 4, concept: "SOCKET_LISTEN", details: "Server: listen(backlog=128)..." },
    { layer: 4, concept: "SOCKET_ACCEPT", details: "Server: accept() -> Connection from 127.0.0.1:54321" }
  ],

  // --- 12. Security ---
  "12.1": [
    { layer: 6, concept: "TLS_HELLO", details: "Cipher suite negotiation: [TLS_AES_256_GCM_SHA384]" },
    { layer: 6, concept: "CHAIN_TRUST", details: "Verifying CA signature chain from Root Authority" }
  ],
  "12.3": [
    { layer: 2, concept: "ARP_SPOOF", details: "WARNING: Inconsistent ARP mapping for Gateway detected" }
  ],

  // --- 13. Performance Optim ---
  "13.1": [
    { layer: 4, concept: "BDP_CALC", details: "Bandwidth-Delay Product: 1Gbps * 45ms = 5.6MB pipe volume" }
  ],
  "13.3": [
    { layer: 7, concept: "ZERO_COPY", details: "DMA transfer initiated. Bypassing CPU copy for L7 payload" }
  ],

  // --- 14. Distributed ---
  "14.3": [
    { layer: 3, concept: "PARTITION", details: "WARNING: Network partition detected at Router node" },
    { layer: 7, concept: "CAP_CHOSEN", details: "Prioritizing Consistency (CP) - stalling request..." }
  ],
  "14.4": [
    { layer: 7, concept: "GOSSIP", details: "Peer exchange: Syncing state with node node-B" },
    { layer: 7, concept: "HEARTBEAT", details: "Liveness probe: Node 127.0.0.1 is UP" }
  ]
};

export function generateSyllabusTraces(topicId: string): SyllabusTrace[] {
  return SYLLABUS_MAP[topicId] || [
    { layer: 7, concept: "LAB_SIM", details: `Unit ${topicId}: Active simulation in progress...` }
  ];
}

export const CHAPTER_LIST = [
  { id: 1, title: "1. Foundations", sections: ["1.3", "1.7", "1.10"] },
  { id: 2, title: "2. OSI Model", sections: ["2.2", "2.5", "2.7", "2.13", "2.14", "2.17", "2.31"] },
  { id: 3, title: "3. TCP/IP Model", sections: ["3.4"] },
  { id: 4, title: "4. Encapsulation", sections: ["4.2"] },
  { id: 5, title: "5. Performance", sections: ["5.4", "5.5"] },
  { id: 6, title: "6. Transport Layer", sections: ["6.2", "6.3", "6.5"] },
  { id: 7, title: "7. IP Addressing", sections: ["7.2"] },
  { id: 8, title: "8. Error Control", sections: ["8.2", "8.3"] },
  { id: 9, title: "9. Formatting", sections: ["9.3", "9.5"] },
  { id: 10, title: "10. Application", sections: ["10.1"] },
  { id: 11, title: "11. Sockets", sections: ["11.1"] },
  { id: 12, title: "12. Security", sections: ["12.1", "12.3"] },
  { id: 13, title: "13. Optimization", sections: ["13.1", "13.3"] },
  { id: 14, title: "14. Dist. Systems", sections: ["14.3", "14.4"] }
];
