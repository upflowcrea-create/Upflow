const ROW_A = ["MOTION DESIGN", "3D", "SOUND DESIGN", "VIDÉO DE PRÉSENTATION", "STORYTELLING"];
const ROW_B = ["VIDÉO EXPLICATIVE", "LIVE EVENT", "MULTI-FORMATS", "RÉPONSE EN 48H"];

function Row({ items, variant }: { items: string[]; variant: "gradient" | "ink" }) {
  return (
    <div className={`marquee__band marquee__band--${variant}`}>
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <div className="marquee__group" key={copy}>
            {items.map((item) => (
              <span className="marquee__item" key={item}>
                {item}
                <span className="marquee__star">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Two crossed, endlessly scrolling "tape" bands between sections. */
export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <Row items={ROW_B} variant="ink" />
      <Row items={ROW_A} variant="gradient" />
    </div>
  );
}
