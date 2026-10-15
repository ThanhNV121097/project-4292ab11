import { useMemo, useState, type ReactNode } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { T } from "../editable";
import { useRecord, type Row } from "../data";
import { usePageMeta } from "../seo";
import { useSession } from "../lib/mock/session";
import Section from "../components/Section";
import Icon from "../components/Icon";
import { formatVND } from "../lib/money";

interface TeeTimeRow extends Row {
  time: string;
  weekdayFee: number;
  weekendFee: number;
  available: boolean;
}

const WEEKEND = [0, 6];
const today = () => new Date().toISOString().slice(0, 10);

export default function TeeTimeDetail() {
  usePageMeta("teeTime.title", "teeTime.description");
  const { id } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const user = useSession();
  const { item } = useRecord<TeeTimeRow>("tee-times", id);

  const [date, setDate] = useState(today());
  const [holes, setHoles] = useState<9 | 18>(params.get("holes") === "9" ? 9 : 18);
  const [players, setPlayers] = useState(1);

  const isWeekend = useMemo(() => WEEKEND.includes(new Date(date + "T00:00:00").getDay()), [date]);

  if (!item) {
    return (
      <Section>
        <div className="mx-auto max-w-page px-[var(--gutter)] py-16">
          <p className="text-ink-soft">This tee time is no longer available.</p>
          <Link to="/" className="mt-4 inline-flex items-center gap-2 text-accent"><Icon name="back" size={16} /><T k="teeTime.back" /></Link>
        </div>
      </Section>
    );
  }

  const fee = isWeekend ? item.weekendFee : item.weekdayFee;
  const feeForHoles = holes === 9 ? Math.round(fee * 0.6) : fee;
  const total = feeForHoles * players;

  const continueToPay = () => {
    const q = new URLSearchParams({ date, time: item.time, holes: String(holes), players: String(players), total: String(total) });
    navigate(`/checkout/${id}?${q.toString()}`);
  };

  return (
    <Section>
      <div data-record={`tee-times:${item.id}`} className="mx-auto max-w-page px-[var(--gutter)] py-14">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink"><Icon name="back" size={16} /><T k="teeTime.back" /></Link>
        <T k="teeTime.eyebrow" as="p" className="mt-6 text-sm font-medium uppercase tracking-[0.08em] text-label" />
        <T k="teeTime.title" as="h1" className="mt-3 text-[length:var(--size-h2)] leading-[1.05] max-w-[20ch]" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
          <div className="flex flex-col gap-8">
            <Field label="teeTime.dateLabel" icon="date">
              <input type="date" value={date} min={today()} onChange={(e) => setDate(e.target.value)}
                className="rounded border border-line bg-ground px-4 py-3 text-ink" />
            </Field>

            <Field label="teeTime.timeLabel" icon="hours">
              <p className="rounded border border-line bg-surface px-4 py-3 text-ink">{item.time}</p>
            </Field>

            <Field label="teeTime.holesLabel" icon="package">
              <div className="flex items-center gap-1 rounded-full border border-line p-1 text-sm">
                {([9, 18] as const).map((h) => (
                  <button key={h} type="button" onClick={() => setHoles(h)}
                    className={`rounded-full px-5 py-2 ${holes === h ? "bg-fairway text-fairway-ink" : "text-ink-soft"}`}>
                    <T k={h === 9 ? "teeTime.holes9" : "teeTime.holes18"} />
                  </button>
                ))}
              </div>
            </Field>

            <Field label="teeTime.playersLabel" icon="people">
              <div className="flex items-center gap-4">
                <button type="button" aria-label="Fewer players" onClick={() => setPlayers((p) => Math.max(1, p - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink hover:bg-surface">
                  <Icon name="minus" size={16} />
                </button>
                <span className="w-6 text-center text-lg tabular-nums">{players}</span>
                <button type="button" aria-label="More players" onClick={() => setPlayers((p) => Math.min(4, p + 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink hover:bg-surface">
                  <Icon name="plus" size={16} />
                </button>
              </div>
            </Field>
          </div>

          <aside className="rounded-lg border border-line bg-surface p-6 lg:self-start">
            <p className="text-sm font-medium uppercase tracking-[0.06em] text-ink-soft">{isWeekend ? <T k="teeTime.weekendNote" /> : <T k="teeTime.weekdayNote" />}</p>
            <div className="mt-4 flex items-baseline justify-between text-sm">
              <span className="text-ink-soft">{formatVND(feeForHoles)} <T k="teeTime.perPlayer" as="span" /></span>
              <span className="tabular-nums text-ink-soft">× {players}</span>
            </div>
            <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
              <T k="teeTime.totalLabel" as="span" className="text-base font-medium" />
              <span className="text-xl font-medium tabular-nums">{formatVND(total)}</span>
            </div>

            {user ? (
              <button type="button" onClick={continueToPay}
                className="mt-6 w-full rounded bg-accent px-6 py-3 text-center text-base text-accent-ink hover:opacity-90">
                <T k="teeTime.cta" />
              </button>
            ) : (
              <div className="mt-6 rounded border border-line bg-ground p-4 text-sm">
                <T k="teeTime.signInFirst" as="p" className="text-ink-soft" />
                <Link to={`/sign-in?from=${encodeURIComponent(`/tee-time/${id}?holes=${holes}`)}`}
                  className="mt-3 inline-flex items-center gap-2 rounded bg-accent px-5 py-2.5 text-accent-ink hover:opacity-90">
                  <Icon name="lock" size={16} /><T k="teeTime.signInCta" />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </Section>
  );
}

function Field({ label, icon, children }: { label: string; icon: Parameters<typeof Icon>[0]["name"]; children: ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-medium text-ink-soft">
        <Icon name={icon} size={16} /> <T k={label} />
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
