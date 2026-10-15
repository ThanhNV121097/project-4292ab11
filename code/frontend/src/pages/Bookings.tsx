import { Link } from "react-router-dom";
import { T } from "../editable";
import { useSession } from "../lib/mock/session";
import { useBookings } from "../lib/mock/bookings";
import { usePageMeta } from "../seo";
import Section from "../components/Section";
import Icon from "../components/Icon";
import { formatVND } from "../lib/money";

export default function Bookings() {
  usePageMeta("bookings.title", "bookings.description");
  const user = useSession();
  const bookings = useBookings();

  if (!user) {
    return (
      <Section>
        <div className="mx-auto max-w-page px-[var(--gutter)] py-16">
          <T k="teeTime.signInFirst" as="p" className="text-ink-soft" />
          <Link to="/sign-in" className="mt-4 inline-flex items-center gap-2 rounded bg-accent px-5 py-2.5 text-accent-ink hover:opacity-90">
            <Icon name="lock" size={16} /><T k="teeTime.signInCta" />
          </Link>
        </div>
      </Section>
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <Section>
      <div className="mx-auto max-w-page px-[var(--gutter)] py-14">
        <T k="bookings.eyebrow" as="p" className="text-sm font-medium uppercase tracking-[0.08em] text-fairway" />
        <T k="bookings.headline" as="h1" className="mt-3 text-[length:var(--size-h2)] leading-[1.05]" />

        {bookings.length === 0 ? (
          <div className="mt-8">
            <T k="bookings.empty" as="p" className="text-ink-soft" />
            <Link to="/" className="mt-4 inline-flex items-center gap-2 rounded bg-accent px-5 py-2.5 text-accent-ink hover:opacity-90">
              <T k="bookings.emptyCta" />
            </Link>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-lg border border-line">
            {bookings.map((b) => (
              <div key={b.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-line px-5 py-4 last:border-b-0">
                <div>
                  <p className="font-medium">{b.date} · {b.time}</p>
                  <p className="text-sm text-ink-soft">{b.holes} holes · {b.players} player{b.players > 1 ? "s" : ""}</p>
                </div>
                <span className="justify-self-end rounded-full border border-line px-3 py-1 text-xs text-ink-soft">
                  {b.date < today ? <T k="bookings.statusPast" /> : <T k="bookings.statusConfirmed" />}
                </span>
                <span className="justify-self-end font-medium tabular-nums">{formatVND(b.total)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
