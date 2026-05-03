import type { DistributionContent } from '@/types/distribution-content'

const normal: DistributionContent = {
  slug: 'normal',
  name: 'Normal',
  notation: 'N(\\mu, \\sigma^2)',
  type: 'continuous',
  description:
    'The Normal (or Gaussian) distribution is the most important distribution in statistics. It is symmetric and bell-shaped, fully described by its mean and variance. By the Central Limit Theorem, sums of many independent random variables tend toward a normal distribution regardless of the original distribution.',
  parameters: [
    {
      symbol: '\\mu',
      name: 'mean',
      range: '\\mu \\in (-\\infty, \\infty)',
      description: 'Location parameter; equals the mean, median, and mode.',
    },
    {
      symbol: '\\sigma^2',
      name: 'variance',
      range: '\\sigma^2 > 0',
      description: 'Scale parameter; controls the spread of the distribution.',
    },
  ],
  density: {
    kind: 'pdf',
    latex:
      'f(x;\\,\\mu,\\sigma^2) = \\dfrac{1}{\\sigma\\sqrt{2\\pi}}\\, e^{-\\dfrac{(x-\\mu)^2}{2\\sigma^2}}',
    support: 'x \\in (-\\infty,\\, \\infty)',
  },
  cdf: {
    latex: 'F(x;\\,\\mu,\\sigma^2) = \\Phi\\!\\left(\\dfrac{x - \\mu}{\\sigma}\\right)',
    support: 'x \\in (-\\infty,\\, \\infty)',
  },
  properties: [
    {
      name: 'Mean',
      latex: '\\mu',
    },
    {
      name: 'Variance',
      latex: '\\sigma^2',
    },
    {
      name: 'Standard Deviation',
      latex: '\\sigma',
    },
    {
      name: 'Mode',
      latex: '\\mu',
    },
    {
      name: 'Median',
      latex: '\\mu',
    },
    {
      name: 'MGF',
      latex: 'M(t) = e^{\\mu t + \\frac{1}{2}\\sigma^2 t^2}',
    },
    {
      name: 'Skewness',
      latex: '0',
    },
    {
      name: 'Excess Kurtosis',
      latex: '0',
    },
    {
      name: 'Entropy',
      latex: '\\dfrac{1}{2}\\ln(2\\pi e\\,\\sigma^2)',
    },
  ],
}

export default normal
