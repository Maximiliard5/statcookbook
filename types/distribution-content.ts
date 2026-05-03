export type DerivationStep = {
  description: string
  latex: string
  justification?: string
}

export type DistributionProperty = {
  name: string
  latex: string
  derivation?: DerivationStep[]
}

export type DistributionParameter = {
  symbol: string
  name: string
  range: string
  description: string
}

export type DistributionContent = {
  slug: string
  name: string
  notation: string
  type: 'discrete' | 'continuous'
  description: string
  parameters: DistributionParameter[]
  density: {
    kind: 'pmf' | 'pdf'
    latex: string
    support: string
  }
  cdf?: {
    latex: string
    support: string
  }
  properties: DistributionProperty[]
}
