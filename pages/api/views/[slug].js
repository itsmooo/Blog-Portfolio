export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ total: '0' })
  }

  if (req.method === 'POST') {
    return res.status(200).json({ total: '0' })
  }

  return res.status(405).json({ message: 'Method not allowed.' })
}
