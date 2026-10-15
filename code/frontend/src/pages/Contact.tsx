import { T } from "../editable";
import { usePageMeta } from "../seo";
import Section from "../components/Section";
import Icon from "../components/Icon";
import ContactForm from "../components/ContactForm";
import MapEmbed from "../components/MapEmbed";

export default function Contact() {
  usePageMeta("contact.title", "contact.description");

  return (
    <Section>
      <div className="mx-auto max-w-page px-[var(--gutter)] py-14">
        <T k="contact.eyebrow" as="p" className="text-sm font-medium uppercase tracking-[0.08em] text-fairway" />
        <T k="contact.headline" as="h1" className="mt-3 text-[length:var(--size-h2)] leading-[1.05] max-w-[20ch]" />
        <T k="contact.sub" as="p" className="mt-4 max-w-[48ch] text-base text-ink-soft" />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <ul className="flex flex-col gap-4 text-base">
              <li className="flex items-center gap-3">
                <Icon name="phone" size={18} />
                <a href="tel:02838991188" className="hover:text-accent"><T k="contact.phone" /></a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="chat" size={18} />
                <a href="https://zalo.me/02838991188" target="_blank" rel="noreferrer" className="hover:text-accent">Zalo: <T k="contact.zalo" /></a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="mail" size={18} />
                <a href="mailto:teetime@greenlotusgolf.vn" className="hover:text-accent"><T k="contact.email" /></a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="address" size={18} />
                <T k="contact.address" />
              </li>
              <li className="flex items-center gap-3">
                <Icon name="hours" size={18} />
                <T k="contact.hours" />
              </li>
            </ul>
            <MapEmbed className="h-72" />
          </div>

          <ContactForm fields={[{ key: "date", type: "date" }, { key: "players", type: "number" }]} />
        </div>
      </div>
    </Section>
  );
}
