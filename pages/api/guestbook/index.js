import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.json([])
  }

  if (req.method === 'POST') {
    const session = await getSession({ req })

    if (!session) {
      return res.status(403).send('Unauthorized')
    }

    return res.status(503).json({ message: 'Guestbook is not configured.' })
  }

  return res.status(405).send('Method not allowed.')
}
