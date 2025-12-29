# Sumeru Axis - 须弥山轴

A React Three Fiber visualization of the **Sumeru Axis** based on the Buddhist concept of "Three Thousand Realms in a Single Thought" (一念三千).

## Concept

The visualization represents:
- **Central Axis**: Mt. Sumeru (须弥山) as the geometric center point
- **3000 Particles**: Representing all possible states
  - 10 Realms × 10 Mutual Possession × 3 Realms of Existence × 10 Suchness = 3000
- **Dynamic Flow**: Particles flow outward from the center and fade after 3 seconds (based on the principle of impermanence - 无常)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The scene will open in your browser at `http://localhost:3000`

## Controls

- **Mouse Drag**: Rotate the camera around the scene
- **Scroll**: Zoom in/out
- **Pan**: Hold middle mouse button (or right-click) to pan

## Components

- `SumeruAxis.jsx`: Main 3D scene component with the central axis and particle system
- `SumeruScene.jsx`: Canvas wrapper with controls and UI overlays
- `main.jsx`: React entry point

## Technical Stack

- React Three Fiber (R3F)
- Three.js
- @react-three/drei (for helpers like OrbitControls)

## Philosophy

This visualization is based on the Tiantai Buddhist concept where:
- Each moment of thought contains all 3000 possible states
- The central axis (Sumeru) represents the fundamental point of consciousness
- Particles represent the dynamic, ever-changing nature of existence
- The fade effect embodies the principle of impermanence (无常)


