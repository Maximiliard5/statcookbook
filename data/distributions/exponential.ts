import type { DistributionContent } from '@/types/distribution-content'

const exponential: DistributionContent = {
  slug: 'exponential',
  name: 'Exponential',
  notation: 'Exp(\\beta)',
  type: 'continuous',
  description:
    'The Exponential distribution models the waiting time between events in a Poisson process. It is the only continuous distribution with the memoryless property: given that no event has occurred by time t, the remaining waiting time has the same distribution. It is a special case of the Gamma distribution with shape parameter α = 1.',
  parameters: [
    {
      symbol: '\\beta',
      name: 'scale',
      range: '\\beta > 0',
      description: 'The mean waiting time between events (scale parameter). The rate is λ = 1/β.',
    },
  ],
  density: {
    kind: 'pdf',
    latex: 'f(x;\\,\\beta) = \\dfrac{1}{\\beta}\\, e^{-x/\\beta}',
    support: 'x \\geq 0',
  },
  cdf: {
    latex: 'F(x;\\,\\beta) = 1 - e^{-x/\\beta}',
    support: 'x \\geq 0',
  },
  properties: [
    {
      name: 'Mean',
      latex: '\\beta',
    },
    {
      name: 'Variance',
      latex: '\\beta^2',
    },
    {
      name: 'Standard Deviation',
      latex: '\\beta',
    },
    {
      name: 'Mode',
      latex: '0',
    },
    {
      name: 'Median',
      latex: '\\beta \\ln 2',
    },
    {
      name: 'MGF',
      latex: 'M(t) = \\dfrac{1}{1 - \\beta t}, \\quad t < \\dfrac{1}{\\beta}',
    },
    {
      name: 'Skewness',
      latex: '2',
    },
    {
      name: 'Excess Kurtosis',
      latex: '6',
    },
    {
      name: 'Entropy',
      latex: '1 + \\ln\\beta',
    },
  ],
}

export default exponential
