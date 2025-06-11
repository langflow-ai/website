declare module 'react-highlight' {
  import { FC } from 'react';
  
  interface HighlightProps {
    className?: string;
    children?: React.ReactNode;
  }

  const Highlight: FC<HighlightProps>;
  export default Highlight;
} 