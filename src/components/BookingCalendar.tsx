import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];
const MONTH_NAMES = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];
export const TIME_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

function startOfDay(d: Date) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

function buildMonthGrid(viewDate: Date) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const firstWeekday = (firstOfMonth.getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

type Props = {
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectDate: (d: Date) => void;
  onSelectTime: (t: string) => void;
};

export function BookingCalendar({ selectedDate, selectedTime, onSelectDate, onSelectTime }: Props) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const cells = useMemo(() => buildMonthGrid(viewDate), [viewDate]);

  const isPast = (d: Date) => d < today;
  const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;
  const isSelected = (d: Date) => !!selectedDate && startOfDay(d).getTime() === startOfDay(selectedDate).getTime();

  const atCurrentMonth = viewDate.getFullYear() === today.getFullYear() && viewDate.getMonth() === today.getMonth();

  return (
    <div className="booking-calendar">
      <div className="booking-calendar__header">
        <button
          type="button"
          onClick={() => setViewDate((v) => new Date(v.getFullYear(), v.getMonth() - 1, 1))}
          disabled={atCurrentMonth}
          aria-label="Mois précédent"
        >
          <ChevronLeft size={18} />
        </button>
        <span>
          {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
        </span>
        <button
          type="button"
          onClick={() => setViewDate((v) => new Date(v.getFullYear(), v.getMonth() + 1, 1))}
          aria-label="Mois suivant"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="booking-calendar__weekdays">
        {WEEKDAYS.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>

      <div className="booking-calendar__grid">
        {cells.map((d, i) =>
          d ? (
            <button
              type="button"
              key={i}
              disabled={isPast(d) || isWeekend(d)}
              className={`booking-calendar__day ${isSelected(d) ? "is-selected" : ""}`}
              onClick={() => onSelectDate(d)}
            >
              {d.getDate()}
            </button>
          ) : (
            <span key={i} aria-hidden="true" />
          ),
        )}
      </div>

      {selectedDate && (
        <div className="booking-calendar__slots">
          {TIME_SLOTS.map((t) => (
            <button
              type="button"
              key={t}
              className={`booking-calendar__slot ${selectedTime === t ? "is-selected" : ""}`}
              onClick={() => onSelectTime(t)}
            >
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
