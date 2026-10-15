import { Link, useParams } from "react-router-dom";
import { T } from "../editable";
import { getBooking } from "../lib/mock/bookings";
import { usePageMeta } from "../seo";
import Section from "../components/Section";
import Icon from "../components/Icon";
import { formatVND } from "../lib/money";

export default function Confirmation() {
  usePageMeta("confirmation.title", "confirmation.description");
  const { id } = useParams();
  const booking = getBooking(id);

  return (
    <Section>
      <div className="mx-auto max-w-page px-[var(--gutter)] py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-fairway text-fairway-ink">
          <Icon name="done" size={32} />
        </div>
        <T k="confirmation.eyebrow" as="p" className="mt-6 text-sm font-medium uppercase tracking-[0.08em] text-label" />
        <T k="confirmation.headline" as="h1" className="mt-3 text-[length:var(--size-h2)] leading-[1.05]" />
        <T k="confirmation.sub" as="p" className="mx-auto mt-4 max-w-[46ch] text-base text-ink-soft" />

        {booking && (
          <div className="mx-auto mt-10 max-w-sm rounded-lg border border-line bg-surface p-6 text-left">
            <div className="flex items-baseline justify-between text-sm">
              <T k="confirmation.refLabel" as="span" className="text-ink-soft" />
              <span className="font-medium tabular-nums">{booking.id}</span>
            </div>
            <dl className="mt-4 flex flex-col gap-2 text-sm">
              <div className="flex items-baseline justify-between"><dt className="text-ink-soft">Date</dt><dd className="tabular-nums">{booking.date}</dd></div>
              <div className="flex items-baseline justify-between"><dt className="text-ink-soft">Time</dt><dd className="tabular-nums">{booking.time}</dd></div>
              <div className="flex items-baseline justify-between"><dt className="text-ink-soft">Holes</dt><dd className="tabular-nums">{booking.holes}</dd></div>
              <div className="flex items-baseline justify-between"><dt className="text-ink-soft">Players</dt><dd className="tabular-nums">{booking.players}</dd></div>
            </dl>
            <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
              <span className="font-medium">Total paid</span>
              <span className="text-lg font-medium tabular-nums">{formatVND(booking.total)}</span>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/bookings" className="rounded bg-accent px-6 py-3 text-accent-ink hover:opacity-90"><T k="confirmation.viewBookings" /></Link>
          <Link to="/" className="rounded border border-line px-6 py-3 text-ink hover:bg-surface"><T k="confirmation.bookAnother" /></Link>
        </div>
      </div>
    </Section>
  );
}
