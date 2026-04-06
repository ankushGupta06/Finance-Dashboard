# Zorvyn Finance Dashboard

A responsive personal finance dashboard built with React, TypeScript, Vite, and Recharts.

## Overview

This project simulates a frontend-only finance product where users can:

- view an overall financial summary
- explore transaction history
- understand spending patterns through charts and insights
- switch between `viewer` and `admin` roles
- add transactions in admin mode
- export transactions as CSV
- use the app in light and dark mode

The project uses local mock data under `src/data` and focuses on frontend structure, interaction quality, and presentation.

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Recharts
- Tailwind CSS v4
- Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open the local development URL shown by Vite, usually:

```bash
http://localhost:5173
```

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Features

### Dashboard Overview

- summary cards for total balance, monthly income, and monthly expense
- time-based expense trend chart
- categorical spending breakdown chart
- linked accounts panel
- recent activity and smart snapshot cards

### Transactions

- transaction list with date, amount, category, and type
- search
- category filtering
- sorting:
  - latest first
  - oldest first
  - amount high to low
  - amount low to high
- pagination
- CSV export
- admin-only add transaction modal

### Role-Based UI

- frontend role simulation using `viewer` and `admin`
- role switching from the header dropdown
- UI behavior changes based on role:
  - admin can add transactions
  - viewer sees upgrade/premium promo sections

### Insights

- highest spending category
- monthly spending comparison using transaction data
- top-level savings summary
- basic helpful observations derived from the mock dataset

### UX Enhancements

- responsive layout
- light/dark theme toggle
- alerts/toasts for actions
- animated transitions and card interactions

## Mock API 

Transactions are handled through a simulated frontend mock API layer.
This abstraction mimics real backend behavior and keeps UI logic decoupled from data handling.

The mock API supports:

fetch transactions
add transaction
delete transaction (if implemented)
filter and sort support
pagination-ready structure
simulated async behavior

This allows easy migration to a real backend later.

## Data Persistence

The application persists selected UI, Transactions and user interaction state using browser storage.

Persisted data includes:

theme (light / dark)
user role (viewer / admin)
transactions added in admin mode
UI preferences

Persistence is implemented using localStorage, ensuring:

state survives page refresh
no backend required
consistent user experience

## State Management

The app uses a lightweight mixed approach:

- Context for shared UI state:
  - theme
  - role
  - alerts
- local component state for:
  - filters
  - sorting
  - pagination
  - modals
  - dashboard card interaction states

This keeps the code simple while still separating app-wide concerns from page-specific behavior.

## Project Structure

```text
src/
  assets/
  components/
  context/
  data/
  pages/
```

## Assumptions

- this is a frontend-only evaluation project
- data is mocked locally for demonstration
- role-based behavior is simulated in the UI only
- some interactions are intentionally temporary and reset on refresh

## Known Limitations

- no backend persistence for transactions
- no real authentication or secure RBAC
- some sections still use curated mock content for presentation
