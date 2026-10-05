"use client";

type ProductsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ProductsError({ reset }: ProductsErrorProps) {
  return (
    <main role="alert">
      <h2>No se pudo cargar el contenido.</h2>
      <button type="button" onClick={reset}>
        Intentar de nuevo
      </button>
    </main>
  );
}
