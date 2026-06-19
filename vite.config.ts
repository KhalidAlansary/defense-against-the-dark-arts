import { defineConfig } from "vite";

// Slidev merges this into its own Vite config.
// https://sli.dev/custom/config-vite
export default defineConfig({
  server: {
    // Allow Cloudflare quick-tunnel hosts (random *.trycloudflare.com
    // subdomain each launch) so teammates can open the remote-control URL.
    allowedHosts: [".trycloudflare.com"],
  },
});
