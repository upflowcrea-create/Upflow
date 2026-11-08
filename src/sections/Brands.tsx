import { BRANDS } from "../lib/config";

// "Ils m'ont confié leur vidéo": the brands UPFLOW made videos for, in an
// endless, slow band (the list is rendered twice so the loop is seamless;
// the copy is hidden from screen readers).
export function Brands() {
  return (
    <section className="brands" aria-label="Ils m'ont confié leur vidéo">
      <p className="brands__label">Ils m'ont confié leur vidéo</p>
      <div className="brands__track">
        {[0, 1].map((copy) => (
          <ul className="brands__list" key={copy} aria-hidden={copy === 1 || undefined}>
            {BRANDS.map((brand) => (
              <li key={brand.name} className="brands__item">
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className={`brands__logo${brand.tone === "dark" ? " brands__logo--dark" : ""}`}
                    loading="lazy"
                  />
                ) : (
                  brand.name
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
