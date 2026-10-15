import { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { T, useList, useContent } from "./editable";
import { useSession, signOut } from "./lib/mock/session";
import Home from "./pages/Home";
import TeeTimeDetail from "./pages/TeeTimeDetail";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Bookings from "./pages/Bookings";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";
import Logo from "./components/Logo";
import MenuToggle from "./components/MenuToggle";
import MobileMenu from "./components/MobileMenu";
import ThemeToggle from "./components/ThemeToggle";
import ContactDock from "./components/ContactDock";
import Icon from "./components/Icon";
import SocialIcon from "./components/SocialIcon";

/**
 * The shared ground every page mounts into: header, footer, the mobile menu
 * and the floating contact dock. Pages live in src/pages/, one <Route> each.
 */
export default function App() {
  const links = useList<{ label: string; href: string }>("nav.links");
  const name = useContent("site.name");
  const [open, setOpen] = useState(false);
  const user = useSession();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ground text-ink font-body">
      <header className="sticky top-0 z-30 border-b border-line bg-ground/95 backdrop-blur">
        <div className="mx-auto flex h-[var(--header-h)] max-w-page items-center justify-between px-[var(--gutter)]">
          <Link to="/" aria-label={name} className="shrink-0"><Logo /></Link>
          <nav className="hidden items-center gap-7 text-sm lg:flex">
            {links.map((l, i) => <Link key={i} to={l.href}><T k={`nav.links.${i}.label`} as="span" /></Link>)}
            {user ? (
              <button type="button" onClick={() => { signOut(); navigate("/"); }} className="flex items-center gap-2 text-ink-soft hover:text-ink">
                <Icon name="logout" size={18} />
                {user.name}
              </button>
            ) : (
              <Link to="/sign-in" className="rounded bg-accent px-4 py-2 text-sm text-accent-ink hover:opacity-90">
                <T k="nav.cta.label" />
              </Link>
            )}
            <ThemeToggle />
          </nav>
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <MenuToggle open={open} onToggle={() => setOpen((o) => !o)} />
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)}>
        {links.map((l, i) => (
          <Link key={i} to={l.href} onClick={() => setOpen(false)} className="text-2xl">
            <T k={`nav.links.${i}.label`} as="span" />
          </Link>
        ))}
        {user ? (
          <button type="button" onClick={() => { signOut(); setOpen(false); navigate("/"); }} className="flex items-center gap-2 text-left text-2xl text-ink-soft">
            <Icon name="logout" size={22} /> {user.name}
          </button>
        ) : (
          <Link to="/sign-in" onClick={() => setOpen(false)} className="text-2xl text-accent">
            <T k="nav.cta.label" as="span" />
          </Link>
        )}
      </MobileMenu>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tee-time/:id" element={<TeeTimeDetail />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/confirmation/:id" element={<Confirmation />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-page flex-col gap-6 px-[var(--gutter)] py-12 text-sm text-ink-soft lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-2 shrink-0">
            <Logo />
          </div>
          <T k="footer.line" as="p" className="max-w-[32ch]" />
          <div className="flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-5">
            <a href="tel:02838991188" className="flex items-center gap-2 hover:text-ink"><Icon name="phone" size={16} /><T k="contact.phone" /></a>
            <a href="https://zalo.me/02838991188" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-ink"><SocialIcon network="zalo" size={16} /><T k="contact.zalo" /></a>
            <a href="mailto:teetime@greenlotusgolf.vn" className="flex items-center gap-2 hover:text-ink"><Icon name="mail" size={16} /><T k="contact.email" /></a>
            <span className="flex items-center gap-2"><Icon name="address" size={16} /><T k="contact.address" /></span>
            <span className="flex items-center gap-2"><Icon name="hours" size={16} /><T k="contact.hours" /></span>
          </div>
        </div>
      </footer>
      <ContactDock />
    </div>
  );
}
