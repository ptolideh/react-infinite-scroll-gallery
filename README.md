# React Infinite Scroll + Pexel API Gallery

- Dynamically loads photos from Pexel API
- Implements infinite scroll using custom React Hooks
- Loads new photos from the API using inifinte scroll + loader

### 1. Add env variable

```
PEXEL_API_URL="https://api.pexels.com/v1/curated"
PEXEL_API_KEY="{your-pexel-api-key}"
VITE_API_URL="http://localhost:8080/api/pexels"
```

### 2. Run React and API server

This project uses express as proxy to communicate with Pexel

```
pnpm dev
pnpm dev:server
```
