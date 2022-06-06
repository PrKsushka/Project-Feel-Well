import React, { useEffect, useState } from 'react';

const useLoader: () => [boolean, any] = () => {
  const [isLoading, setIsLoading] = useState(true);
  function activeLoader(param: boolean) {
    setIsLoading(param);
  }
  useEffect(() => {
    const timeOut = setTimeout(() => activeLoader(false), 1500);
    return () => clearTimeout(timeOut);
  });
  return [isLoading, activeLoader];
};
export default useLoader;
