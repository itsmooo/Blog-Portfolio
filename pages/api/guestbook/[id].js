import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(404).json({ message: 'Not found.' })
  }

  const session = await getSession({ req })

  if (!session) {
    return res.status(403).send('Unauthorized')
  }

  return res.status(503).json({ message: 'Guestbook is not configured.' })
}
