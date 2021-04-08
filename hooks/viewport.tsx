import React from 'react';

interface ViewPort {
  width: number;
  height: number;
}

const viewportContext = React.createContext<ViewPort>({
  width: 0,
  height: 0,
});

export const ViewportProvider: React.FC = ({ children }) => {
  const [width, setWidth] = React.useState(999);
  const [height, setHeight] = React.useState(999);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  React.useEffect(() => {
    handleWindowResize();
  });

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
};

export const useViewport = (): ViewPort => {
  const { width, height } = React.useContext(viewportContext);
  return { width, height };
};

export default ViewportProvider;
