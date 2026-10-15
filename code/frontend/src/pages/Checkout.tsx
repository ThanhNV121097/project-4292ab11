import { useState, type FormEvent } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { T } from "../editable";
import { useRecord, type Row } from "../data";
import { usePageMeta } from "../seo";
import { useSession } from "../lib/mock/session";
import { addBooking } from "../lib/mock/bookings";
import Section from "../components/Section";
import Icon from "../components/Icon";
import { formatVND } from "../lib/money";

interface TeeTimeRow extends Row {
  time: string;
}

export default function Checkout() {
  usePageMeta("checkout.title", "checkout.description");
  const { id } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const user = useSession();
  const { item } = useRecord<TeeTimeRow>("tee-times", id);

  const date = params.get("date") ?? "";
  const time = params.get("time") ?? item?.time ?? "";
  const holes = Number(params.get("holes") ?? 18) as 9 | 18;
  const players = Number(params.get("players") ?? 1);
  const total = Number(params.get("total") ?? 0);

  const [paying, setPaying] = useState(false);

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

  function pay(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPaying(true);
    window.setTimeout(() => {
      const booking = addBooking({ date, time, holes: holes as 9 | 18, players, total });
      navigate(`/confirmation/${booking.id}`);
    }, 900);
  }

  return (
    <Section>
      <div className="mx-auto max-w-page px-[var(--gutter)] py-14">
        <Link to={`/tee-time/${id}`} className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink"><Icon name="back" size={16} /><T k="teeTime.back" /></Link>
        <T k="checkout.eyebrow" as="p" className="mt-6 text-sm font-medium uppercase tracking-[0.08em] text-label" />
        <T k="checkout.title" as="h1" className="mt-3 text-[length:var(--size-h2)] leading-[1.05] max-w-[20ch]" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
          <form onSubmit={pay} className="flex flex-col gap-5">
            <label className="flex flex-col gap-2 text-sm">
              <span className="flex items-center gap-2 text-ink-soft"><Icon name="account" size={16} /><T k="checkout.nameLabel" /></span>
              <input required defaultValue={user.name} className="rounded border border-line bg-ground px-4 py-3 text-ink" />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="flex items-center gap-2 text-ink-soft"><Icon name="card" size={16} /><T k="checkout.cardLabel" /></span>
              <input required inputMode="numeric" placeholder="4242 4242 4242 4242" maxLength={19}
                className="rounded border border-line bg-ground px-4 py-3 text-ink" />
            </label>
            <div className="grid grid-cols-2 gap-5">
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-ink-soft"><T k="checkout.expiryLabel" /></span>
                <input required placeholder="MM/YY" maxLength={5} className="rounded border border-line bg-ground px-4 py-3 text-ink" />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-ink-soft"><T k="checkout.cvcLabel" /></span>
                <input required inputMode="numeric" placeholder="123" maxLength={4} className="rounded border border-line bg-ground px-4 py-3 text-ink" />
              </label>
            </div>
            <p className="flex items-center gap-2 text-sm text-ink-soft"><Icon name="secure" size={16} /><T k="checkout.methods" /></p>
            <p className="flex items-center gap-2 text-xs text-ink-soft"><Icon name="lock" size={14} /><T k="checkout.secureNote" /></p>
            <button type="submit" disabled={paying}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded bg-accent px-6 py-3 text-base text-accent-ink hover:opacity-90 disabled:opacity-60">
              {paying ? <T k="checkout.paying" /> : <T k="checkout.payCta" />}
            </button>
          </form>

          <aside className="rounded-lg border border-line bg-surface p-6 lg:self-start">
            <T k="checkout.summaryTitle" as="p" className="text-sm font-medium uppercase tracking-[0.06em] text-ink-soft" />
            <dl className="mt-4 flex flex-col gap-2 text-sm">
              <Row label="teeTime.dateLabel" value={date} />
              <Row label="teeTime.timeLabel" value={time} />
              <Row label="teeTime.holesLabel" value={`${holes} holes`} />
              <Row label="teeTime.playersLabel" value={String(players)} />
            </dl>
            <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
              <T k="teeTime.totalLabel" as="span" className="text-base font-medium" />
              <span className="text-xl font-medium tabular-nums">{formatVND(total)}</span>
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <T k={label} as="dt" className="text-ink-soft" />
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}
