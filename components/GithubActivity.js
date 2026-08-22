import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'

const GitHubCalendar = dynamic(() => import('react-github-calendar'), { ssr: false })

const explicitTheme = {
  light: ['#ffffff', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  dark: ['#000000', '#0e4429', '#006d32', '#26a641', '#39d353'],
}

const WEEKS = 53
const BLOCK_MARGIN = 3

export default function GithubActivity() {
  const { resolvedTheme } = useTheme()
  const username = siteMetadata.githubUsername || 'itsmooo'
  const containerRef = useRef(null)
  const [blockSize, setBlockSize] = useState(12)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateBlockSize = () => {
      const width = container.offsetWidth
      const size = Math.floor(width / WEEKS - BLOCK_MARGIN)
      setBlockSize(Math.min(Math.max(size, 10), 20))
    }

    updateBlockSize()

    const observer = new ResizeObserver(updateBlockSize)
    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="github-activity-wrapper w-full">
      <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Activity
      </h2>
      <div ref={containerRef} className="mt-4 w-full">
        <GitHubCalendar
          username={username}
          theme={explicitTheme}
          colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'}
          fontSize={12}
          blockSize={blockSize}
          blockMargin={BLOCK_MARGIN}
          showWeekdayLabels={false}
          showColorLegend
        />
      </div>
    </section>
  )
}
