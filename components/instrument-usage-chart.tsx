'use client'

export function InstrumentUsageChart() {
  // In a real application, this data would come from an API or database
  const instrumentData = [
    { name: 'Guitar', percentage: 68 },
    { name: 'Bass', percentage: 14 },
    { name: 'Ukulele', percentage: 11 },
    { name: 'Banjo', percentage: 4 },
    { name: 'Mandolin', percentage: 3 },
  ]

  return (
    <div className="h-80 flex items-center justify-center" aria-label="Instrument usage chart">
      <div className="space-y-4 w-full max-w-md">
        {instrumentData.map((instrument) => (
          <div key={instrument.name} className="flex items-center">
            <div className="w-16 text-xs">{instrument.name}</div>
            <div className="flex-1 bg-zinc-800 h-4 rounded-full overflow-hidden">
              <div 
                className="bg-green-500 h-full rounded-full" 
                style={{ width: `${instrument.percentage}%` }}
                role="progressbar"
                aria-valuenow={instrument.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
            <div className="w-10 text-xs text-right">{instrument.percentage}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}