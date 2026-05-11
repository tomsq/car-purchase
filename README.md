# Car Simulation

A small Vue 3 + TypeScript app that compares the total cost of owning your current car versus switching to an operating lease (operativní leasing). You enter parameters for your owned car and one or more lease scenarios, and the app shows side-by-side cost breakdowns.

State is persisted to `localStorage`, so your inputs survive page reloads.

## Stack

- Vue 3 (`<script setup>`, Composition API)
- TypeScript
- Vite

## Requirements

- Node.js 18+ (Node 20+ recommended)
- npm

## Install

```bash
npm install
```

## Develop

```bash
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build

```bash
npm run build
```

Output is written to `dist/`.

## Preview production build

```bash
npm run preview
```

## Project layout

```
src/
  App.vue              # top-level layout, persistence wiring
  components/          # OwnedCarForm, ScenarioForm, CostColumn
  lib/
    compute.ts         # cost calculations
    defaults.ts        # initial values
    format.ts          # number/currency formatting
    storage.ts         # localStorage helpers
    types.ts           # shared types
```
