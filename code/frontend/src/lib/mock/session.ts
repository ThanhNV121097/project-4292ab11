import { useSyncExternalStore } from "react";

/**
 * A signed-in golfer, mocked in the browser: sign-up and sign-in both just
 * remember a name and email in localStorage. Replaced by the real API once
 * the backend lands.
 */
export interface User {
  name: string;
  email: string;
}

const KEY = "glg:session";
const listeners = new Set<() => void>();

function load(): User | null {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "null") as User | null;
  } catch {
    return null;
  }
}

let user: User | null = load();

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(user));
  } catch {
    /* private mode: the session lasts for this tab only */
  }
  listeners.forEach((l) => l());
}

export function signIn(email: string): User {
  user = { name: email.split("@")[0], email };
  save();
  return user;
}

export function signUp(name: string, email: string): User {
  user = { name, email };
  save();
  return user;
}

export function signOut() {
  user = null;
  save();
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useSession(): User | null {
  return useSyncExternalStore(subscribe, () => user, () => user);
}
