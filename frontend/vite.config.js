// https://vitejs.dev/config/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const EXPRESS_PORT = 8080

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
  build:{
    
    outDir: "build"
  }
})