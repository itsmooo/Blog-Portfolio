import Analytics from 'components/metrics/Analytics'
import GithubPersonal from '@/components/metrics/GithubPersonal'
import GitHub from '@/components/metrics/Github'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'

export default function Stats() {
  return (
    <>
      <PageSEO
        title={`Stats - ${siteMetadata.author}`}
        description="GitHub and blog statistics for Mohamed Adan"
      />
      <div className="mx-auto max-w-2xl overflow-hidden">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Stats
          </h1>
          <p className="text-md leading-7 text-gray-500 dark:text-gray-400">
            A quick snapshot of my GitHub activity and blog metrics.
          </p>
        </div>
        <div className="pt-2">
          <div className="flex w-full flex-col">
            <GithubPersonal />
            <GitHub />
          </div>
          <div className="grid w-full grid-cols-1 gap-4 py-2 sm:grid-cols-2">
            <Analytics />
          </div>
        </div>
        <div className="flex flex-col pt-10">
          <a
            className="text-md rounded-full border px-8 py-2 text-center font-normal text-gray-800 transition-colors hover:border-primary-500 hover:bg-primary-500 hover:text-white dark:text-gray-200"
            href={siteMetadata.github}
            target="_blank"
            rel="noreferrer noopener"
          >
            View my GitHub profile
          </a>
        </div>
      </div>
    </>
  )
}
