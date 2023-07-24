"use client";

import { IError } from "@/interfaces";

import { useEffect } from "react";

import EmptyState from "@/components/EmptyState";

const ErrorState: React.FC<IError> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Oops..." subtitle="Something went wrong." />;
};

export default ErrorState;
