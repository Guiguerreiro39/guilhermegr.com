"use client";

import { createContext, useContext, useState } from "react";

export const IsLoadingContext = createContext({
  isLoading: true,
  onLoadingComplete: () => {},
});

export const IsLoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const onLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <IsLoadingContext.Provider value={{ isLoading, onLoadingComplete }}>
      {children}
    </IsLoadingContext.Provider>
  );
};

export const useIsLoading = () => useContext(IsLoadingContext);
