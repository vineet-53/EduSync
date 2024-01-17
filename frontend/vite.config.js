import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
import dotenv from "dotenv"
dotenv.config( {
  path : '../backend/.env' || '../.env'
})
export default defineConfig({
  server : { 
    proxy : { 
      '/api' : `http://localhost:${process.env.PORT}`
    }
  },
  plugins: [react()],
})
