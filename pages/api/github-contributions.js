import siteMetadata from '@/data/siteMetadata'

export default async function handler(_req, res) {
  const username = siteMetadata.githubUsername || 'itsmooo'

  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub contributions')
    }

    const data = await response.json()

    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=1800')

    return res.status(200).json({
      username,
      total: data.total?.lastYear || 0,
      contributions: data.contributions || [],
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
