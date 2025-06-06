'use client'

export function PopularTuningsChart() {
  // In a real application, this data would come from an API or database
  const tuningData = [
    { name: 'Standard', percentage: 42 },
    { name: 'Drop D', percentage: 18 },
    { name: 'Half Step Down', percentage: 15 },
    { name: 'Full Step Down', percentage: 12 },
    { name: 'Open G', percentage: 8 },
    { name: 'Other', percentage: 5 },
  ]

  return (
    <div className="h-80 flex items-center justify-center" aria-label="Popular tunings chart">
      <div className="space-y-4 w-full max-w-md">
        {tuningData.map((tuning) => (
          <div key={tuning.name} className="flex items-center">
            <div className="w-28 text-xs">{tuning.name}</div>
            <div className="flex-1 bg-zinc-800 h-4 rounded-full overflow-hidden">
              <div 
                className="bg-green-500 h-full rounded-full" 
                style={{ width: `${tuning.percentage}%` }}
                role="progressbar"
                aria-valuenow={tuning.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
            <div className="w-10 text-xs text-right">{tuning.percentage}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}