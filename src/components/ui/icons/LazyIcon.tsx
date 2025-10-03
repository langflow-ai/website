import React, { Suspense, lazy } from "react";

interface LazyIconProps {
  name: string;
  fallback?: React.ReactNode;
  [key: string]: any;
}

const LazyIcon: React.FC<LazyIconProps> = ({ name, fallback, ...props }) => {
  const IconComponent = lazy(() => import(`./${name}`));
  
  return (
    <Suspense fallback={fallback || <div style={{ width: 24, height: 24 }} />}>
      <IconComponent {...props} />
    </Suspense>
  );
};

export default LazyIcon;
