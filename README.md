# React Infinite Scroll + Pexel API Gallery

- Dynamically loads photos from Pexel API
  - `api/server.ts`
  - `api/pexel-api-client.ts`
- Implements infinite scroll using custom React Hooks
  - `hooks/useScrollPosition.tsx`
  - `hooks/useScrollEnd.tsx`
- Loads new photos from the API using inifinte scroll + loader
  - `components | App.tsx`
  - `components | ArtifactPhoto.tsx`

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
