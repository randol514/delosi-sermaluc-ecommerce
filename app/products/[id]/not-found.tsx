import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main>
      <h1>Producto no encontrado</h1>
      <p>No encontramos el producto solicitado.</p>
      <Link href="/">Volver al catálogo</Link>
    </main>
  );
}
