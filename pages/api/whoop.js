function formatWhoopDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

async function whoopFetch(path, token) {
  const response = await fetch(`https://api.prod.whoop.com/developer/v1${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Whoop API error: ${response.status}`)
  }

  return response.json()
}

export default async function handler(_req, res) {
  const token = process.env.WHOOP_ACCESS_TOKEN

  if (!token) {
    return res.status(200).json({ configured: false })
  }

  try {
    const [recoveryData, cycleData, sleepData] = await Promise.all([
      whoopFetch('/recovery?limit=1', token),
      whoopFetch('/cycle?limit=1', token),
      whoopFetch('/activity/sleep?limit=1', token),
    ])

    const recovery = recoveryData.records?.[0]
    const cycle = cycleData.records?.[0]
    const sleep = sleepData.records?.[0]

    const sleepScore = recovery?.score?.sleep_performance_percentage ?? null
    const recoveryScore = recovery?.score?.recovery_score ?? null
    const strainScore = cycle?.score?.strain ?? null
    const sleepHours = sleep?.score?.stage_summary?.total_in_bed_time_milli
      ? (sleep.score.stage_summary.total_in_bed_time_milli / 3600000).toFixed(1)
      : null
    const hrv = recovery?.score?.hrv_rmssd_milli ?? null
    const rhr = recovery?.score?.resting_heart_rate ?? null

    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=900')

    return res.status(200).json({
      configured: true,
      date: formatWhoopDate(new Date(recovery?.created_at || Date.now())),
      sleep: sleepScore,
      sleepHours,
      recovery: recoveryScore,
      hrv: hrv ? Math.round(hrv) : null,
      rhr,
      strain: strainScore ? Number(strainScore.toFixed(1)) : null,
    })
  } catch (error) {
    return res.status(500).json({ configured: true, message: error.message })
  }
}
