import type { DistributionContent } from '@/types/distribution-content'

const poisson: DistributionContent = {
  slug: 'poisson',
  name: 'Poisson',
  notation: 'Po(\\lambda)',
  type: 'discrete',
  description:
    'The Poisson distribution models the number of events occurring in a fixed interval of time or space, given a constant average rate and independent occurrences. It arises as the limiting case of the Binomial distribution when n is large and p is small with λ = np held constant.',
  parameters: [
    {
      symbol: '\\lambda',
      name: 'rate',
      range: '\\lambda > 0',
      description: 'The average number of events per interval.',
    },
  ],
  density: {
    kind: 'pmf',
    latex: 'P(X = k;\\, \\lambda) = \\dfrac{e^{-\\lambda}\\, \\lambda^k}{k!}',
    support: 'k \\in \\{0, 1, 2, \\ldots\\}',
  },
  properties: [
    {
      name: 'Mean',
      latex: '\\lambda',
    },
    {
      name: 'Variance',
      latex: '\\lambda',
    },
    {
      name: 'Standard Deviation',
      latex: '\\sqrt{\\lambda}',
    },
    {
      name: 'Mode',
      latex: '\\lfloor \\lambda \\rfloor \\text{ (also } \\lceil \\lambda \\rceil - 1 \\text{ when } \\lambda \\in \\mathbb{Z})',
    },
    {
      name: 'MGF',
      latex: 'M(t) = e^{\\lambda(e^t - 1)}',
    },
    {
      name: 'Skewness',
      latex: '\\dfrac{1}{\\sqrt{\\lambda}}',
    },
    {
      name: 'Excess Kurtosis',
      latex: '\\dfrac{1}{\\lambda}',
    },
    {
      name: 'Entropy',
      latex: '\\lambda\\bigl(1 - \\ln\\lambda\\bigr) + e^{-\\lambda}\\sum_{k=0}^{\\infty}\\dfrac{\\lambda^k \\ln(k!)}{k!}',
    },
  ],
}

export default poisson
