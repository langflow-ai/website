import { useEffect, useState } from "react";
import Text from "@/components/ui/text";

export default function LoadingDots() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      setDots((d) => (d.length === 3 ? "" : d + "."));
    }, 300);
    return () => clearInterval(id);
  }, []);

  return (
    <Text size={200} tagName="span">
      Loading{dots}
    </Text>
  );
}
