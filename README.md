# Crypto Dashboard

A cryptocurrency dashboard built with React, TypeScript, and Tailwind CSS. 
Track cryptocurrency prices, view detailed coin information, and explore historical market data with interactive charts.

## Features

### Core Functionality
- **Real-time(ish) Cryptocurrency Data** - Live prices, market caps, and trading volumes from CoinGecko API
- **Infinite Scrolling** - Seamlessly browse through hundreds of cryptocurrencies
- **Detailed Coin Pages** - Information including statistics, descriptions, and external links
- **Historical Charts** - Interactive price, market cap, and volume charts with multiple time ranges (24h to max)
- **Multi-currency Support** - View prices in 150+ fiat currencies
- **Dark Mode** - Full dark mode support with system preference detection

### User Experience
- **Auto-hiding Header** - Smart header that hides when scrolling down and reappears when scrolling up
- **Expandable Descriptions** - Collapsible coin descriptions with "Read more" functionality
- **Custom Dropdowns** - Styled dropdown components matching the app's design language
- **Smooth Animations** - Simple transitions and animations throughout the app
- **Error Handling** - Error states with retry functionality

### Technical Highlights
- **State Management** - Redux Toolkit for global UI state (currency, theme) caching
- **Server State** - React Query for efficient data fetching, caching, and pagination
- **Type Safety** - Full TypeScript implementation with strict typing
- **Code Quality** - Clean component architecture with separation of concerns

## Tech Stack

- **React 19.2.0** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Redux Toolkit** - Global state management
- **React Query** - Server state and caching
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization
- **Vite** - Fast build tool and dev server

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AJamesB/Crypto-Dashboard.git
cd Crypto-Dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (optional):
```env
VITE_COINGECKO_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser to `http://localhost:5173`

## Configuration

### API Key
The app uses CoinGecko's API with a demo key included. For production use or higher rate limits, get your own API key from [CoinGecko](https://www.coingecko.com/en/api) and add it to your `.env` file.

### Build Configuration
The app is configured for GitHub Pages deployment with the base path `/Crypto-Dashboard`. To deploy elsewhere, update the `base` in `vite.config.ts` and the `basename` in `App.tsx`.
