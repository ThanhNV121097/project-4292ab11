import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { T, useContent } from "../editable";
import { useCollection, type Row } from "../data";
import { usePageMeta } from "../seo";
import Section from "../components/Section";
import Icon from "../components/Icon";
import { formatVND } from "../lib/money";

interface TeeTimeRow extends Row {
  time: string;
  weekdayFee: number;
  weekendFee: number;
  available: boolean;
}

const WEEKEND = [0, 6]; // Sunday, Saturday

export default function Home() {
  usePageMeta("home.title", "home.description");
  const today = useMemo(() => new Date(), []);
  const isWeekend = WEEKEND.includes(today.getDay());
  const { items, total, hasMore, loadMore, loading } = useCollection<TeeTimeRow>("tee-times", { pageSize: 8 });
  const reduced = useReducedMotion();
  const [holes, setHoles] = useState<9 | 18>(18);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-page items-center gap-10 px-[var(--gutter)] py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <T k="hero.eyebrow" as="p" className="text-sm font-medium uppercase tracking-[0.08em] text-label" />
            <T k="hero.headline" as="h1" className="mt-4 text-[length:var(--size-h1)] leading-[1.05] max-w-[16ch]" />
            <T k="hero.sub" as="p" className="mt-6 max-w-[42ch] text-lg text-ink-soft" />
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <T k="hero.cta.label" as="a" href="#tee-times" className="inline-flex items-center gap-2 rounded bg-accent px-6 py-3 text-base text-accent-ink hover:opacity-90" />
              <a href="tel:02838991188" className="inline-flex items-center gap-2 rounded border border-line px-6 py-3 text-base text-ink hover:bg-surface">
                <Icon name="phone" size={18} /> 028 3899 1188
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-lg lg:aspect-[5/4]"
          >
            <img src="/images/hero.jpg" alt="Fairway and green at sunrise" className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </section>

      <Section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-page gap-10 px-[var(--gutter)] py-16 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div className="order-2 aspect-[4/3] overflow-hidden rounded-lg lg:order-1">
            <img src="/images/course-fairway.jpg" alt="Sunlit fairway with a bunker" className="h-full w-full object-cover" />
          </div>
          <div className="order-1 lg:order-2">
            <T k="home.course.eyebrow" as="p" className="text-sm font-medium uppercase tracking-[0.08em] text-fairway" />
            <T k="home.course.headline" as="h2" className="mt-3 text-[length:var(--size-h2)] leading-[1.05] max-w-[18ch]" />
            <T k="home.course.body" as="p" className="mt-5 max-w-[46ch] text-base text-ink-soft" />
            <div className="mt-6 flex items-center gap-2 text-sm text-ink-soft">
              <Icon name="hours" size={18} /> <T k="contact.hours" />
            </div>
          </div>
        </div>
      </Section>

      <Section id="tee-times" className="border-t border-line">
        <div className="mx-auto max-w-page px-[var(--gutter)] py-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <T k="home.teeTimes.eyebrow" as="p" className="text-sm font-medium uppercase tracking-[0.08em] text-fairway" />
              <T k="home.teeTimes.headline" as="h2" className="mt-3 text-[length:var(--size-h2)] leading-[1.05]" />
              <T k="home.teeTimes.sub" as="p" className="mt-3 max-w-[48ch] text-base text-ink-soft" />
            </div>
            <div className="flex items-center gap-1 rounded-full border border-line p-1 text-sm">
              <button type="button" onClick={() => setHoles(9)} className={`rounded-full px-4 py-1.5 ${holes === 9 ? "bg-fairway text-fairway-ink" : "text-ink-soft"}`}>
                9 <T k="home.teeTimes.holesLabel" as="span" />
              </button>
              <button type="button" onClick={() => setHoles(18)} className={`rounded-full px-4 py-1.5 ${holes === 18 ? "bg-fairway text-fairway-ink" : "text-ink-soft"}`}>
                18 <T k="home.teeTimes.holesLabel" as="span" />
              </button>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-lg border border-line">
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-line bg-surface px-5 py-3 text-xs uppercase tracking-wide text-ink-soft sm:grid-cols-[1fr_1fr_auto]">
              <span>Time</span>
              <span className="text-right">{isWeekend ? <T k="home.teeTimes.weekendLabel" /> : <T k="home.teeTimes.weekdayLabel" />} fee</span>
              <span className="text-right">&nbsp;</span>
            </div>
            {loading && items.length === 0 ? (
              <p className="px-5 py-8 text-sm text-ink-soft">Loading today's tee times…</p>
            ) : items.length === 0 ? (
              <p className="px-5 py-8 text-sm text-ink-soft"><T k="home.teeTimes.empty" /></p>
            ) : (
              items.map((t) => {
                const fee = isWeekend ? t.weekendFee : t.weekdayFee;
                const feeForHoles = holes === 9 ? Math.round(fee * 0.6) : fee;
                return (
                  <div key={t.id} data-record={`tee-times:${t.id}`} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-line px-5 py-4 last:border-b-0 sm:grid-cols-[1fr_1fr_auto]">
                    <span className="font-medium">{t.time}</span>
                    <span className="text-right tabular-nums text-ink-soft">{formatVND(feeForHoles)} <span className="hidden sm:inline">/ player</span></span>
                    {t.available ? (
                      <Link to={`/tee-time/${t.id}?holes=${holes}`} className="justify-self-end rounded bg-accent px-4 py-2 text-sm text-accent-ink hover:opacity-90">
                        <T k="home.teeTimes.bookCta" />
                      </Link>
                    ) : (
                      <span className="justify-self-end rounded border border-line px-4 py-2 text-sm text-ink-soft"><T k="home.teeTimes.fullCta" /></span>
                    )}
                  </div>
                );
              })
            )}
          </div>
          {hasMore && (
            <button type="button" onClick={loadMore} className="mt-6 rounded border border-line px-5 py-2.5 text-sm text-ink hover:bg-surface">
              <T k="home.teeTimes.showMore" /> ({items.length}/{total})
            </button>
          )}
        </div>
      </Section>

      <Section className="border-t border-line bg-fairway text-fairway-ink">
        <div className="mx-auto max-w-page px-[var(--gutter)] py-16">
          <T k="home.promise.eyebrow" as="p" className="text-sm font-medium uppercase tracking-[0.08em] text-fairway-ink/70" />
          <div className="mt-8 grid gap-10 sm:grid-cols-3">
            {(useContent<{ icon: string; title: string; body: string }[]>("home.promise.items")).map((item, i) => (
              <div key={i}>
                <Icon name={item.icon as never} size={28} />
                <h3 className="mt-4 text-xl font-medium">{item.title}</h3>
                <p className="mt-2 text-sm text-fairway-ink/80">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
