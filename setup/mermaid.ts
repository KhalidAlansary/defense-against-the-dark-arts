import { defineMermaidSetup } from '@slidev/types'

// Zenith brand palette applied to all Mermaid diagrams in the deck.
// coral-edge primary, quantum-black surfaces, teal/blue/violet secondaries.
export default defineMermaidSetup(() => {
  return {
    theme: 'base',
    themeVariables: {
      darkMode: true,
      background: '#0c0c0c',
      fontFamily: 'Space Grotesk, system-ui, sans-serif',

      primaryColor: '#f9996c',
      primaryBorderColor: '#c2410c',
      primaryTextColor: '#0c0c0c',

      secondaryColor: '#95b9ba',
      tertiaryColor: '#799bb2',

      lineColor: '#fbae8c',
      textColor: '#ffffff',

      // xychart / bar colors
      mainBkg: '#f9996c',
      nodeBorder: '#c2410c',
      clusterBkg: 'rgba(249, 153, 108, 0.08)',
      clusterBorder: 'rgba(249, 153, 108, 0.35)',
    },
  }
})
