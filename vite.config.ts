import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Porta exclusiva deste projeto (CozyPaws usa 5173). strictPort impede o Vite
// de cair silenciosamente em outra porta e colidir com outro site.
export default defineConfig({
  plugins: [react()],
  server: { port: 5310, strictPort: true },
  preview: { port: 5311, strictPort: true },
});
