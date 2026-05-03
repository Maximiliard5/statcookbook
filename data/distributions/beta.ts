import type { DistributionContent } from '@/types/distribution-content'

const beta: DistributionContent = {
  slug: 'beta',
  name: 'Beta',
  notation: 'Beta(\\alpha,\\, \\beta)',
  type: 'continuous',
  description:
    'The Beta distribution is a flexible family of distributions on the interval (0, 1), making it well-suited for modelling probabilities or proportions. Its shape can be uniform, bell-shaped, U-shaped, or skewed depending on the parameter values. It plays a central role in Bayesian statistics as the conjugate prior for the Binomial and Bernoulli likelihoods.',
  parameters: [
    {
      symbol: '\\alpha',
      name: 'first shape parameter',
      range: '\\alpha > 0',
      description: 'Controls the shape; larger values push mass toward 1.',
    },
    {
      symbol: '\\beta',
      name: 'second shape parameter',
      range: '\\beta > 0',
      description: 'Controls the shape; larger values push mass toward 0.',
    },
  ],
  density: {
    kind: 'pdf',
    latex:
      'f(x;\\,\\alpha,\\beta) = \\dfrac{x^{\\alpha-1}(1-x)^{\\beta-1}}{B(\\alpha,\\beta)}',
    support: 'x \\in (0,\\, 1)',
  },
  properties: [
    {
      name: 'Mean',
      latex: '\\dfrac{\\alpha}{\\alpha + \\beta}',
    },
    {
      name: 'Variance',
      latex: '\\dfrac{\\alpha\\beta}{(\\alpha+\\beta)^2(\\alpha+\\beta+1)}',
    },
    {
      name: 'Mode',
      latex: '\\dfrac{\\alpha - 1}{\\alpha + \\beta - 2}, \\quad \\alpha,\\beta > 1',
    },
    {
      name: 'MGF',
      latex:
        'M(t) = 1 + \\sum_{k=1}^{\\infty} \\left(\\prod_{r=0}^{k-1}\\dfrac{\\alpha+r}{\\alpha+\\beta+r}\\right)\\dfrac{t^k}{k!}',
    },
    {
      name: 'Skewness',
      latex:
        '\\dfrac{2(\\beta - \\alpha)\\sqrt{\\alpha+\\beta+1}}{(\\alpha+\\beta+2)\\sqrt{\\alpha\\beta}}',
    },
    {
      name: 'Excess Kurtosis',
      latex:
        '\\dfrac{6\\left[(\\alpha-\\beta)^2(\\alpha+\\beta+1) - \\alpha\\beta(\\alpha+\\beta+2)\\right]}{\\alpha\\beta(\\alpha+\\beta+2)(\\alpha+\\beta+3)}',
    },
    {
      name: 'Entropy',
      latex:
        '\\ln B(\\alpha,\\beta) - (\\alpha-1)\\psi(\\alpha) - (\\beta-1)\\psi(\\beta) + (\\alpha+\\beta-2)\\psi(\\alpha+\\beta)',
    },
  ],
}

export default beta
