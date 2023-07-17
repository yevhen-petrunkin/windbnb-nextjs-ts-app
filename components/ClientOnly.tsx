"use client";

import { useState, useEffect } from "react";
import { IClientOnlyProps } from "@/interfaces/interfaces";

const ClientOnly: React.FC<IClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;
