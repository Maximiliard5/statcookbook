import type { DistributionContent } from '@/types/distribution-content'

const binomial: DistributionContent = {
  slug: 'binomial',
  name: 'Binomial',
  notation: 'Bin(n,\\, p)',
  type: 'discrete',
  description:
    'The Binomial distribution models the number of successes in a fixed number of independent Bernoulli trials, each with the same probability of success. It generalises the Bernoulli distribution (which is Bin(1, p)) and converges to the Poisson distribution as n → ∞ and p → 0 with np constant.',
  parameters: [
    {
      symbol: 'n',
      name: 'number of trials',
      range: 'n \\in \\{1, 2, 3, \\ldots\\}',
      description: 'The fixed number of independent Bernoulli trials.',
    },
    {
      symbol: 'p',
      name: 'success probability',
      range: '0 \\leq p \\leq 1',
      description: 'The probability of success on each trial.',
    },
  ],
  density: {
    kind: 'pmf',
    latex:
      'P(X = k;\\, n, p) = \\binom{n}{k} p^k (1-p)^{n-k}',
    support: 'k \\in \\{0, 1, 2, \\ldots, n\\}',
  },
  cdf: {
    latex: 'F(k;\\, n, p) = \\sum_{i=0}^{k} \\binom{n}{i} p^i (1-p)^{n-i}',
    support: 'k \\in \\{0, 1, 2, \\ldots, n\\}',
  },
  properties: [
    {
      name: 'Mean',
      latex: 'np',
    },
    {
      name: 'Variance',
      latex: 'np(1-p)',
    },
    {
      name: 'Standard Deviation',
      latex: '\\sqrt{np(1-p)}',
    },
    {
      name: 'Mode',
      latex: '\\lfloor (n+1)p \\rfloor \\text{ or } \\lfloor (n+1)p \\rfloor - 1',
    },
    {
      name: 'MGF',
      latex: 'M(t) = \\bigl(1 - p + p\\,e^t\\bigr)^n',
    },
    {
      name: 'Skewness',
      latex: '\\dfrac{1 - 2p}{\\sqrt{np(1-p)}}',
    },
    {
      name: 'Excess Kurtosis',
      latex: '\\dfrac{1 - 6p(1-p)}{np(1-p)}',
    },
  ],
}

export default binomial
