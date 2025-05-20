// Configuración base para Module Federation con Vite
// Puedes personalizar los remotes y exposes según tus necesidades

export const federationConfig = {
  name: 'microfrontend-olb',
  filename: 'remoteEntry.js',
  exposes: {
    './Button': './src/components/atoms/Button/Button.tsx',
    // Agrega aquí más componentes o módulos a exponer
  },
  shared: ['react', 'react-dom', 'zustand', '@apollo/client'],
};
