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
        target : "https://study-notion-backend-ngon.onrender.com/", 

      } , 
      "/api/v1" : { 
        target : "https://study-notion-backend-ngon.onrender.com/",
      }
    }
  },
  build:{
    
    outDir: "build"
  }
})