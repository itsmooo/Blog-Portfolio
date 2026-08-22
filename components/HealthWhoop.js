function RingGauge({ value, max = 100, color, label, detail }) {
  const radius = 36
  const stroke = 7
  const normalized = max > 0 ? Math.min(Math.max(value / max, 0), 1) : 0
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - normalized)

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-24 w-24">
        <svg className="h-24 w-24 -rotate-90" viewBox="0 0 96 96">
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-gray-200 dark:text-gray-800"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-900 dark:text-gray-100">
          {value ?? '–'}
          {max === 100 && value != null ? '%' : ''}
        </div>
      </div>
      <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">{label}</p>
      {detail ? <p className="text-xs text-gray-500 dark:text-gray-400">{detail}</p> : null}
    </div>
  )
}

export default function HealthWhoop({ data }) {
  if (!data?.configured || data.recovery == null) {
    return null
  }

  return (
    <section className="w-full">
      <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Health <span className="text-gray-400">·</span> Whoop
      </h2>
      <div className="mt-6 grid grid-cols-3 gap-4">
        <RingGauge
          value={data.sleep}
          color="#ef4444"
          label="Sleep"
          detail={data.sleepHours ? `${data.sleepHours} hrs` : null}
        />
        <RingGauge
          value={data.recovery}
          color="#eab308"
          label="Recovery"
          detail={data.hrv && data.rhr ? `HRV ${data.hrv}ms · RHR ${data.rhr}` : null}
        />
        <RingGauge value={data.strain} max={21} color="#3b82f6" label="Strain" />
      </div>
      {data.date ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Stats from {data.date}</p>
      ) : null}
    </section>
  )
}
