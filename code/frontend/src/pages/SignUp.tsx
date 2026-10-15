import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { T } from "../editable";
import { signUp } from "../lib/mock/session";
import { usePageMeta } from "../seo";
import Section from "../components/Section";

export default function SignUp() {
  usePageMeta("auth.signUp.title", "auth.signUp.description");
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signUp(name, email);
    navigate(params.get("from") ?? "/");
  }

  return (
    <Section>
      <div className="mx-auto max-w-[420px] px-[var(--gutter)] py-20">
        <T k="auth.signUp.eyebrow" as="p" className="text-sm font-medium uppercase tracking-[0.08em] text-fairway" />
        <T k="auth.signUp.headline" as="h1" className="mt-3 text-[length:var(--size-h2)] leading-[1.05]" />

        <form onSubmit={submit} className="mt-8 flex flex-col gap-5">
          <label className="flex flex-col gap-2 text-sm">
            <T k="auth.signUp.nameLabel" className="text-ink-soft" />
            <input required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name"
              className="rounded border border-line bg-ground px-4 py-3 text-ink" />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <T k="auth.signUp.emailLabel" className="text-ink-soft" />
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email"
              className="rounded border border-line bg-ground px-4 py-3 text-ink" />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <T k="auth.signUp.passwordLabel" className="text-ink-soft" />
            <input type="password" required autoComplete="new-password" className="rounded border border-line bg-ground px-4 py-3 text-ink" />
          </label>
          <button type="submit" className="mt-2 rounded bg-accent px-6 py-3 text-accent-ink hover:opacity-90">
            <T k="auth.signUp.cta" />
          </button>
        </form>

        <p className="mt-6 text-sm text-ink-soft">
          <T k="auth.signUp.switchPrompt" />{" "}
          <Link to="/sign-in" className="text-accent"><T k="auth.signUp.switchCta" /></Link>
        </p>
      </div>
    </Section>
  );
}
