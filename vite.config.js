import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const extType = info[info.length - 1]
          
          if (/\.(png|jpe?g|svg|gif|webp|avif)$/i.test(assetInfo.name)) {
            return `images/[name]-[hash][extname]`
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        
        manualChunks: {
          vendor: ['emailjs-com']
        }
      }
    },
    
    chunkSizeWarningLimit: 1000,
    target: 'es2015'
  },
  
  server: {
    port: 3000,
    open: true
  },
  
  preview: {
    port: 3000,
    strictPort: true
  }
})