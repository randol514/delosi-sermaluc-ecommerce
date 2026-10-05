"use client";

import { useEffect } from "react";

type AppErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AppError({ error, reset }: AppErrorProps) {
  useEffect(() => {
    console.error("Error inesperado en la aplicación:", error);
  }, [error]);

  return (
    <main role="alert">
      <h1>Algo salió mal</h1>
      <p>No pudimos cargar esta página.</p>
      <button type="button" onClick={reset}>
        Intentar de nuevo
      </button>
    </main>
  );
}
