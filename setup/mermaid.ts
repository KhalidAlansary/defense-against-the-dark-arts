import { defineMermaidSetup } from "@slidev/types";

// Zenith brand palette applied to all Mermaid diagrams in the deck.
// coral-edge primary, quantum-black surfaces, teal/blue/violet secondaries.
export default defineMermaidSetup(() => {
  return {
    theme: "base",
    themeVariables: {
      darkMode: true,
      background: "#0c0c0c",
      fontFamily: "Space Grotesk, system-ui, sans-serif",

      primaryColor: "#f9996c",
      primaryBorderColor: "#c2410c",
      primaryTextColor: "#0c0c0c",

      secondaryColor: "#95b9ba",
      tertiaryColor: "#799bb2",

      lineColor: "#fbae8c",
      // All diagram text is near-black so labels stay readable on the
      // light-coral node fills and light edge-label backgrounds.
      textColor: "#0c0c0c",
      nodeTextColor: "#0c0c0c",
      secondaryTextColor: "#0c0c0c",
      tertiaryTextColor: "#0c0c0c",
      titleColor: "#0c0c0c",

      // xychart / bar colors
      mainBkg: "#f9996c",
      nodeBorder: "#c2410c",
      clusterBkg: "rgba(249, 153, 108, 0.08)",
      clusterBorder: "rgba(249, 153, 108, 0.35)",
    },
  };
});
