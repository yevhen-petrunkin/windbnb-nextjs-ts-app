"use client";

import { IClientOnlyProps } from "@/interfaces";

import { useState, useEffect } from "react";

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
