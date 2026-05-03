import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getDistributionContent,
  getRelatedDistributions,
  CONTENT_SLUGS,
} from '@/lib/distributions'
import { KatexSpan } from '@/components/KatexSpan'
import { DensityFormula } from '@/components/distributions/DensityFormula'
import { KatexBlock } from '@/components/distributions/KatexBlock'
import { ParametersTable } from '@/components/distributions/ParametersTable'
import { PropertiesSection } from '@/components/distributions/PropertiesSection'
import { RelatedPanel } from '@/components/distributions/RelatedPanel'
import { ThemeToggle } from '@/components/ThemeToggle'

export async function generateStaticParams() {
  return CONTENT_SLUGS.map(slug => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const content = await getDistributionContent(slug)
  if (!content) return { title: 'Distribution Not Found' }
  return {
    title: `${content.name} Distribution — Stat Cookbook`,
    description: content.description.slice(0, 160),
  }
}

export default async function DistributionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const content = await getDistributionContent(slug)
  if (!content) notFound()

  const related = getRelatedDistributions(slug)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <header className="border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
        <nav className="flex items-center gap-2 text-sm">
          <Link
            href="/distributions/relationships"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            ← All distributions
          </Link>
        </nav>
        <ThemeToggle />
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12">
        <main className="min-w-0">
          {/* Hero */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {content.name}
              </h1>
              <span
                className={[
                  'text-xs px-2 py-0.5 rounded font-medium uppercase tracking-wide',
                  content.type === 'continuous'
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                    : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
                ].join(' ')}
              >
                {content.type}
              </span>
            </div>
            <div className="text-base text-gray-500 dark:text-gray-400 mb-4">
              <KatexSpan src={content.notation} />
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {content.description}
            </p>
          </div>

          {/* PDF / PMF */}
          <DensityFormula density={content.density} />

          {/* CDF */}
          {content.cdf && (
            <div className="mt-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 px-6 py-5">
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
                Cumulative Distribution Function
              </p>
              <div className="overflow-x-auto">
                <KatexBlock src={content.cdf.latex} />
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                Support: <KatexSpan src={content.cdf.support} />
              </p>
            </div>
          )}

          {/* Parameters */}
          <section className="mt-10">
            <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Parameters
            </h2>
            <ParametersTable parameters={content.parameters} />
          </section>

          {/* Properties */}
          <section className="mt-10">
            <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Properties
            </h2>
            <PropertiesSection properties={content.properties} />
          </section>
        </main>

        {/* Sidebar */}
        <aside className="lg:pt-2">
          <RelatedPanel related={related} />
        </aside>
      </div>
    </div>
  )
}
