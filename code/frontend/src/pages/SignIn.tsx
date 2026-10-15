import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { T } from "../editable";
import { signIn } from "../lib/mock/session";
import { usePageMeta } from "../seo";
import Section from "../components/Section";

export default function SignIn() {
  usePageMeta("auth.signIn.title", "auth.signIn.description");
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [email, setEmail] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signIn(email);
    navigate(params.get("from") ?? "/");
  }

  return (
    <Section>
      <div className="mx-auto max-w-[420px] px-[var(--gutter)] py-20">
        <T k="auth.signIn.eyebrow" as="p" className="text-sm font-medium uppercase tracking-[0.08em] text-fairway" />
        <T k="auth.signIn.headline" as="h1" className="mt-3 text-[length:var(--size-h2)] leading-[1.05]" />

        <form onSubmit={submit} className="mt-8 flex flex-col gap-5">
          <label className="flex flex-col gap-2 text-sm">
            <T k="auth.signIn.emailLabel" className="text-ink-soft" />
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email"
              className="rounded border border-line bg-ground px-4 py-3 text-ink" />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <T k="auth.signIn.passwordLabel" className="text-ink-soft" />
            <input type="password" required autoComplete="current-password" className="rounded border border-line bg-ground px-4 py-3 text-ink" />
          </label>
          <button type="submit" className="mt-2 rounded bg-accent px-6 py-3 text-accent-ink hover:opacity-90">
            <T k="auth.signIn.cta" />
          </button>
        </form>

        <p className="mt-6 text-sm text-ink-soft">
          <T k="auth.signIn.switchPrompt" />{" "}
          <Link to="/sign-up" className="text-accent"><T k="auth.signIn.switchCta" /></Link>
        </p>
      </div>
    </Section>
  );
}
