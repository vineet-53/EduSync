import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const EXPRESS_PORT = 8080
export default defineConfig({
  server : {
    proxy : { 
      "/api" : { 
        target : "http://localhost:" + EXPRESS_PORT, 

      } , 
      "/api/v1" : { 
        target : "http://localhost:" + EXPRESS_PORT,
      }
    }
  },
  plugins: [react()],
})
