/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React from "react";

// Função para carregar o componente dinamicamente
const loadVisualizer = async () => {
  try {
    // Tenta importar de forma segura
    const module = await import("react-audio-visualize");
    return module.LiveAudioVisualizer;
  } catch (error) {
    console.error("Error loading LiveAudioVisualizer:", error);
    // Retorna um componente vazio em caso de erro
    return () => null;
  }
};

// Componente wrapper que carrega o visualizador sob demanda
const DynamicLiveAudioVisualizer = (props) => {
  const [Component, setComponent] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;

    const load = async () => {
      const VisualizerComponent = await loadVisualizer();
      if (isMounted) {
        setComponent(() => VisualizerComponent);
        setLoading(false);
      }
    };

    void load();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading || !Component) {
    return null; // ou um placeholder
  }

  return <Component {...props} />;
};

export default DynamicLiveAudioVisualizer;
