
export const DaySelector = ({ selectedDay, setSelectedDay }) => {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ];

  return (
    <div>
      <h2>Select a Day</h2>

      <div className="days">
        {days.map((day) => (
          <button
            key={day}
            className={selectedDay === day ? "active" : ""}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};
