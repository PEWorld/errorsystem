import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"
import fs from "fs"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      // Serves the /works folder at /works/* with range-request support
      // so videos can be seeked and play efficiently in the browser.
      name: "serve-works-folder",
      configureServer(server) {
        server.middlewares.use((req: any, res: any, next: any) => {
          if (!req.url?.startsWith("/works/")) return next()

          const fileName = decodeURIComponent(req.url.slice("/works/".length))
          const filePath = path.join(process.cwd(), "works", fileName)

          if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return next()

          const stat = fs.statSync(filePath)
          const fileSize = stat.size
          const range = req.headers["range"] as string | undefined

          if (range) {
            const [startStr, endStr] = range.replace(/bytes=/, "").split("-")
            const start = parseInt(startStr, 10)
            const end = endStr ? parseInt(endStr, 10) : fileSize - 1
            res.writeHead(206, {
              "Content-Range": `bytes ${start}-${end}/${fileSize}`,
              "Accept-Ranges": "bytes",
              "Content-Length": end - start + 1,
              "Content-Type": "video/mp4",
            })
            fs.createReadStream(filePath, { start, end }).pipe(res)
          } else {
            res.writeHead(200, {
              "Content-Length": fileSize,
              "Content-Type": "video/mp4",
              "Accept-Ranges": "bytes",
            })
            fs.createReadStream(filePath).pipe(res)
          }
        })
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
