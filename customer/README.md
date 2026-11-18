# Boda 360 Telematics | Customer Portal

**Target Organization / User:** Commercial *boda-boda* operators, private motorcycle owners, and fleet managers in urban environments (Kampala, Uganda).  
**Lead Engineer:** Akim Ronald David (ISBAT University, Kampala, Uganda)

---

## 1. Overview & Purpose
The **Customer Portal** is a dedicated, field-ready web interface specifically designed for motorcycle owners to monitor their vehicles in real time, observe key battery and speed diagnostics, and execute instant remote engine cut-offs in the event of theft or unauthorized perimeter exit.

## 2. Directory Structure
```text
customer-portal/
├── index.html            # Main customer application UI
├── css/
│   └── styles.css        # Avionics dark telematics styling & responsive grid
├── js/
│   ├── app.js            # Standalone state machine, Leaflet map engine & API client
│   └── audioService.js   # Zero-dependency Web Audio procedural sound synthesizer
└── README.md             # Customer portal documentation
```

## 3. Key Capabilities & Screens

### A. Three-Zone Desktop Architecture (PRD Specification)
* **Zone 1: Left-Hand Navigation Sidebar (Dark #1E1F29):**
  * Current Position (Active View), Calendar History Playback, Route Analysis, Data Reports & Trips, and Configuration.
  * User session card with profile info and explicit Log Out button.
* **Zone 2: Central Map Workspace (Fluid Canvas):**
  * Light monochrome vector base tiles (CartoDB Positron / OSM Light).
  * Custom interactive vehicle markers with orientation arrows and high-visibility plate bubbles.
  * Active trailing polyline path tracing.
  * Floating Security Command Dock for remote engine cut-off and restoration.
* **Zone 3: Right-Hand Telemetry Sidebar (Light #F8FAFC):**
  * Search filter and sorting parameters (Sort by Name, Status, Speed, Distance).
  * Dynamic asset cards with color status dots (🟢 Active, 🟡 Idle, 🔴 Offline).
  * Selected vehicle performance payload gauges.
  * Dedicated "Create new PDF" and "Export Data" (CSV) triggers.

### B. International Multi-Country & Territory Engine
Allows motorcycle owners and fleet managers to operate and monitor vehicles in any country:
* **Predefined Operational Regions:**
  * 🇺🇬 **Uganda:** Kampala Central, Entebbe Coastal, Jinja City
  * 🇰🇪 **Kenya:** Nairobi Metropolitan, Mombasa Port
  * 🇹🇿 **Tanzania:** Dar es Salaam Coastal
  * 🇷🇼 **Rwanda:** Kigali City
  * 🇳🇬 **Nigeria:** Lagos State, Abuja FCT
  * 🇬🇭 **Ghana:** Greater Accra
  * 🇿🇦 **South Africa:** Johannesburg, Cape Town
  * 🇦🇪 **United Arab Emirates:** Dubai
  * 🇬🇧 **United Kingdom:** Greater London
* **Custom Operational Hub & Map-Click Mode:**
  * Enter any custom city, country, latitude, and longitude.
  * Interactive map picker: Click anywhere on the world map to anchor your operational base and deploy vehicle fleet telemetry.
  * Automatically recalibrates geofence perimeters, local registration plates, and cellular carriers.

### C. Remote Security Controls & Safe Engine Cut-Off
* **"CUT ENGINE" Action Button:** High-visibility action triggering a PIN confirmation dialog (`1234`).
* **Mechanical Audio Feedback:** 12V automotive relay mechanical snap audio via Web Audio API.
* **Cellular Dispatch Pipeline:** Visual 4-step dispatch animation (Auth -> MQTT -> Node -> Relay Confirmed).

## 4. How to Run
- **Direct in Browser:** Open `customer-portal/index.html` in any modern web browser.
- **Via Express Server:** Run `npm start` from the project root and navigate to `http://localhost:3000/customer`.
