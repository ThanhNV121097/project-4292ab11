import { useSyncExternalStore } from "react";

/**
 * A golfer's bookings, mocked in the browser: paying stores a booking in
 * localStorage. Replaced by the real API once the backend lands.
 */
export interface Booking {
  id: string;
  time: string;
  date: string;
  holes: 9 | 18;
  players: number;
  total: number;
  createdAt: string;
}

const KEY = "glg:bookings";
const listeners = new Set<() => void>();

function load(): Booking[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as Booking[];
  } catch {
    return [];
  }
}

let bookings: Booking[] = load();

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(bookings));
  } catch {
    /* private mode: bookings last for this tab only */
  }
  listeners.forEach((l) => l());
}

export function addBooking(b: Omit<Booking, "id" | "createdAt">): Booking {
  const booking: Booking = { ...b, id: Math.random().toString(36).slice(2, 10).toUpperCase(), createdAt: new Date().toISOString() };
  bookings = [booking, ...bookings];
  save();
  return booking;
}

export function getBooking(id: string | undefined): Booking | undefined {
  return bookings.find((b) => b.id === id);
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useBookings(): Booking[] {
  return useSyncExternalStore(subscribe, () => bookings, () => bookings);
}
