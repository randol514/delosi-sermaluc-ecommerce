import { Button } from "@/shared/components/Button";
import "./not-found-page.sass";

export default function NotFound() {
  return (
    <section className="notfound-page notfound-page--notfound">
      <div className="notfound-page__container site-container">
        <div className="notfound-page__content">
          <div className="notfound-page__title">
            <h1 className="notfound-page__title-text">404</h1>
          </div>
          <div className="notfound-page__text">
            <p>Esta página no existe</p>
          </div>
          <div className="notfound-page__buttons">
            <Button href="/">Volver al inicio</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
