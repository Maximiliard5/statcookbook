export type DistributionNodeData = {
  id: string
  name: string
  notation: string
  type: 'discrete' | 'continuous'
  group: string
  slug: string | null
}

export type RelationshipType = 'special-case' | 'limiting' | 'transformation' | 'bayesian'

export type RelationshipEdgeData = {
  id: string
  source: string
  target: string
  label: string
  relationshipType: RelationshipType
  property?: string
}

export const distributionNodes: DistributionNodeData[] = [
  // ── Discrete: Bernoulli family ──────────────────────────────────────────
  { id: 'bernoulli',          name: 'Bernoulli',          notation: 'Bern(p)',             type: 'discrete',   group: 'bernoulli-family',          slug: 'bernoulli' },
  { id: 'binomial',           name: 'Binomial',           notation: 'Bin(n, p)',            type: 'discrete',   group: 'bernoulli-family',          slug: 'binomial' },
  { id: 'beta-binomial',      name: 'Beta-Binomial',      notation: 'BetaBin(n, β, δ)',     type: 'discrete',   group: 'bernoulli-family',          slug: null },

  // ── Discrete: Geometric family ──────────────────────────────────────────
  { id: 'geometric',          name: 'Geometric',          notation: 'Geo(p)',               type: 'discrete',   group: 'geometric-family',          slug: 'geometric' },
  { id: 'negative-binomial',  name: 'Negative Binomial',  notation: 'NBin(r, p)',           type: 'discrete',   group: 'geometric-family',          slug: 'negative-binomial' },
  { id: 'pascal',             name: 'Pascal',             notation: 'Pascal(n, p)',         type: 'discrete',   group: 'geometric-family',          slug: null },
  { id: 'beta-pascal',        name: 'Beta-Pascal',        notation: 'BetaPascal(r, p)',     type: 'discrete',   group: 'geometric-family',          slug: null },

  // ── Discrete: Poisson family ────────────────────────────────────────────
  { id: 'poisson',            name: 'Poisson',            notation: 'Po(λ)',                type: 'discrete',   group: 'poisson-family',            slug: 'poisson' },
  { id: 'gamma-poisson',      name: 'Gamma-Poisson',      notation: 'GammaPoisson(β, δ)',   type: 'discrete',   group: 'poisson-family',            slug: null },

  // ── Discrete: Hypergeometric family ────────────────────────────────────
  { id: 'hypergeometric',          name: 'Hypergeometric',         notation: 'Hyp(n₁, n₂, n₃)',      type: 'discrete', group: 'hypergeometric-family', slug: null },
  { id: 'negative-hypergeometric', name: 'Neg. Hypergeometric',    notation: 'NegHyp(r₁, r₂, n₃)',   type: 'discrete', group: 'hypergeometric-family', slug: null },

  // ── Discrete: Uniform family ────────────────────────────────────────────
  { id: 'discrete-uniform',   name: 'Discrete Uniform',   notation: 'Unif{a,…,b}',         type: 'discrete',   group: 'uniform-family',            slug: null },
  { id: 'rectangular',        name: 'Rectangular',        notation: 'Rect(a)',              type: 'discrete',   group: 'uniform-family',            slug: null },

  // ── Discrete: Misc ──────────────────────────────────────────────────────
  { id: 'logarithmic',        name: 'Logarithmic',        notation: 'Log(p)',               type: 'discrete',   group: 'misc-discrete',             slug: null },
  { id: 'power-series',       name: 'Power Series',       notation: 'PowerSeries(a, A(a))', type: 'discrete',   group: 'misc-discrete',             slug: null },
  { id: 'zipf',               name: 'Zipf',               notation: 'Zipf(s, v)',           type: 'discrete',   group: 'misc-discrete',             slug: null },
  { id: 'zeta',               name: 'Zeta',               notation: 'Zeta(s)',              type: 'discrete',   group: 'misc-discrete',             slug: null },
  { id: 'discrete-weibull',   name: 'Discrete Weibull',   notation: 'DiscreteWeibull(β, p)', type: 'discrete',  group: 'misc-discrete',             slug: null },

  // ── Continuous: Normal family ────────────────────────────────────────────
  { id: 'normal',             name: 'Normal',             notation: 'N(μ, σ²)',             type: 'continuous', group: 'normal-family',             slug: 'normal' },
  { id: 'standard-normal',    name: 'Standard Normal',    notation: 'N(0, 1)',              type: 'continuous', group: 'normal-family',             slug: null },
  { id: 'log-normal',         name: 'Log-Normal',         notation: 'LN(μ, σ²)',            type: 'continuous', group: 'normal-family',             slug: 'log-normal' },
  { id: 'gamma-normal',       name: 'Gamma-Normal',       notation: 'GammaNormal(μ, σ, β)', type: 'continuous', group: 'normal-family',             slug: null },
  { id: 't',                  name: "Student's t",        notation: 't(ν)',                 type: 'continuous', group: 'normal-family',             slug: 't' },
  { id: 'cauchy',             name: 'Cauchy',             notation: 'Cauchy(c, S)',         type: 'continuous', group: 'normal-family',             slug: null },
  { id: 'standard-cauchy',    name: 'Standard Cauchy',    notation: 'Cauchy(0, 1)',         type: 'continuous', group: 'normal-family',             slug: null },

  // ── Continuous: Chi family ───────────────────────────────────────────────
  { id: 'chi-square',         name: 'Chi-Square',         notation: 'χ²(k)',                type: 'continuous', group: 'chi-family',                slug: 'chi-square' },
  { id: 'chi',                name: 'Chi',                notation: 'χ(n)',                 type: 'continuous', group: 'chi-family',                slug: null },
  { id: 'noncentral-chi-square', name: 'Noncentral χ²',   notation: 'χ²(k, λ)',            type: 'continuous', group: 'chi-family',                slug: null },

  // ── Continuous: F family ─────────────────────────────────────────────────
  { id: 'f',                  name: 'F',                  notation: 'F(d₁, d₂)',            type: 'continuous', group: 'f-family',                  slug: 'f' },
  { id: 'noncentral-f',       name: 'Noncentral F',       notation: 'F(v₁, v₂, δ)',         type: 'continuous', group: 'f-family',                  slug: null },
  { id: 'doubly-noncentral-f', name: 'Doubly Noncentral F', notation: 'F(v₁, v₂, δ₁, γ)', type: 'continuous', group: 'f-family',                  slug: null },
  { id: 'noncentral-t',       name: 'Noncentral t',       notation: 't(ν, δ)',              type: 'continuous', group: 'f-family',                  slug: null },
  { id: 'doubly-noncentral-t', name: 'Doubly Noncentral t', notation: 't(ν, δ₁, δ₂)',      type: 'continuous', group: 'f-family',                  slug: null },

  // ── Continuous: Gamma family ─────────────────────────────────────────────
  { id: 'exponential',        name: 'Exponential',        notation: 'Exp(β)',               type: 'continuous', group: 'gamma-family',              slug: 'exponential' },
  { id: 'gamma',              name: 'Gamma',              notation: 'Gamma(α, β)',           type: 'continuous', group: 'gamma-family',              slug: 'gamma' },
  { id: 'erlang',             name: 'Erlang',             notation: 'Erlang(n, β)',          type: 'continuous', group: 'gamma-family',              slug: null },
  { id: 'log-gamma',          name: 'Log-Gamma',          notation: 'LogGamma(α, β)',        type: 'continuous', group: 'gamma-family',              slug: null },
  { id: 'inverted-gamma',     name: 'Inverted Gamma',     notation: 'InvGamma(α, β)',        type: 'continuous', group: 'gamma-family',              slug: null },
  { id: 'nakagami',           name: 'Nakagami',           notation: 'Nakagami(m, Ω)',        type: 'continuous', group: 'gamma-family',              slug: null },

  // ── Continuous: Beta family ──────────────────────────────────────────────
  { id: 'beta',               name: 'Beta',               notation: 'Beta(α, β)',            type: 'continuous', group: 'beta-family',               slug: 'beta' },
  { id: 'arcsine',            name: 'Arcsine',            notation: 'Arcsine',               type: 'continuous', group: 'beta-family',               slug: null },
  { id: 'noncentral-beta',    name: 'Noncentral Beta',    notation: 'Beta(β₁, γ, δ)',        type: 'continuous', group: 'beta-family',               slug: null },

  // ── Continuous: Uniform family ───────────────────────────────────────────
  { id: 'uniform',            name: 'Uniform',            notation: 'Unif(a, b)',            type: 'continuous', group: 'uniform-family',            slug: 'uniform' },

  // ── Continuous: Weibull family ───────────────────────────────────────────
  { id: 'weibull',            name: 'Weibull',            notation: 'Weibull(λ, k)',         type: 'continuous', group: 'weibull-family',            slug: 'weibull' },
  { id: 'standard-weibull',   name: 'Standard Weibull',   notation: 'Weibull(1, k)',         type: 'continuous', group: 'weibull-family',            slug: null },
  { id: 'rayleigh',           name: 'Rayleigh',           notation: 'Rayleigh(σ)',           type: 'continuous', group: 'weibull-family',            slug: null },
  { id: 'exponential-power',  name: 'Exponential Power',  notation: 'ExpPower(λ, δ)',        type: 'continuous', group: 'weibull-family',            slug: null },

  // ── Continuous: Extreme value family ────────────────────────────────────
  { id: 'extreme-value',      name: 'Extreme Value',      notation: 'EV(γ, δ)',             type: 'continuous', group: 'extreme-family',            slug: null },
  { id: 'generalized-pareto', name: 'Generalized Pareto', notation: 'GenPareto(δ, s, v)',   type: 'continuous', group: 'extreme-family',            slug: null },

  // ── Continuous: Pareto family ────────────────────────────────────────────
  { id: 'pareto',             name: 'Pareto',             notation: 'Pareto(α, β)',          type: 'continuous', group: 'pareto-family',             slug: 'pareto' },
  { id: 'lomax',              name: 'Lomax',              notation: 'Lomax(λ, k)',           type: 'continuous', group: 'pareto-family',             slug: null },

  // ── Continuous: Logistic family ──────────────────────────────────────────
  { id: 'logistic',           name: 'Logistic',           notation: 'Logistic(δ, s)',        type: 'continuous', group: 'logistic-family',           slug: null },
  { id: 'log-logistic',       name: 'Log-Logistic',       notation: 'LogLogistic(λ, k)',     type: 'continuous', group: 'logistic-family',           slug: null },

  // ── Continuous: Symmetric family ────────────────────────────────────────
  { id: 'laplace',            name: 'Laplace',            notation: 'Laplace(μ, β)',         type: 'continuous', group: 'symmetric-family',          slug: null },
  { id: 'hyperbolic-secant',  name: 'Hyperbolic-Secant',  notation: 'HypSec',               type: 'continuous', group: 'symmetric-family',          slug: null },
  { id: 'arctangent',         name: 'Arctangent',         notation: 'Arctan(a, b)',          type: 'continuous', group: 'symmetric-family',          slug: null },

  // ── Continuous: Inverse Gaussian family ─────────────────────────────────
  { id: 'inverse-gaussian',   name: 'Inverse Gaussian',   notation: 'IG(μ, λ)',             type: 'continuous', group: 'inverse-gaussian-family',   slug: null },
  { id: 'standard-wald',      name: 'Standard Wald',      notation: 'Wald',                 type: 'continuous', group: 'inverse-gaussian-family',   slug: null },

  // ── Continuous: Survival / Reliability ──────────────────────────────────
  { id: 'hyperexponential',   name: 'Hyperexponential',   notation: 'HyperExp(δ)',          type: 'continuous', group: 'misc-continuous',           slug: null },
  { id: 'idb',                name: 'IDB',                notation: 'IDB(δ, γ, β)',         type: 'continuous', group: 'misc-continuous',           slug: null },
  { id: 'gompertz',           name: 'Gompertz',           notation: 'Gompertz(δ, v)',       type: 'continuous', group: 'misc-continuous',           slug: null },
  { id: 'makeham',            name: 'Makeham',            notation: 'Makeham(δ, s, v)',     type: 'continuous', group: 'misc-continuous',           slug: null },
  { id: 'minimax',            name: 'Minimax',            notation: 'Minimax(β, γ)',        type: 'continuous', group: 'misc-continuous',           slug: null },
  { id: 'muth',               name: 'Muth',               notation: 'Muth(v)',              type: 'continuous', group: 'misc-continuous',           slug: null },

  // ── Continuous: Power / Misc ─────────────────────────────────────────────
  { id: 'power',              name: 'Power',              notation: 'Power(c, β)',           type: 'continuous', group: 'misc-continuous',           slug: null },
  { id: 'standard-power',     name: 'Standard Power',     notation: 'StdPower(β)',           type: 'continuous', group: 'misc-continuous',           slug: null },
  { id: 'von-mises',          name: 'von Mises',          notation: 'vonMises(μ, k)',        type: 'continuous', group: 'misc-continuous',           slug: null },
  { id: 'kolmogorov-smirnov', name: 'Kolmogorov-Smirnov', notation: 'KS(n, x)',            type: 'continuous', group: 'misc-continuous',           slug: null },
  { id: 'triangle',           name: 'Triangular',         notation: 'Triangle(a, v)',        type: 'continuous', group: 'misc-continuous',           slug: null },
  { id: 'tsp',                name: 'TSP',                notation: 'TSP(c, b, m, n)',      type: 'continuous', group: 'misc-continuous',           slug: null },
]

export const relationshipEdges: RelationshipEdgeData[] = [
  // ── Special cases ──────────────────────────────────────────────────────────
  { id: 'e-bern-bin',        source: 'bernoulli',        target: 'binomial',           label: 'sum of n',         relationshipType: 'special-case',  property: 'C' },
  { id: 'e-bin-bern',        source: 'binomial',         target: 'bernoulli',          label: 'n=1',              relationshipType: 'special-case' },
  { id: 'e-nbin-geo',        source: 'negative-binomial', target: 'geometric',         label: 'r=1',              relationshipType: 'special-case' },
  { id: 'e-pascal-nbin',     source: 'pascal',           target: 'negative-binomial',  label: 'same (r=n)',       relationshipType: 'special-case' },
  { id: 'e-gam-exp',         source: 'gamma',            target: 'exponential',        label: 'α=1',              relationshipType: 'special-case' },
  { id: 'e-gam-erlang',      source: 'gamma',            target: 'erlang',             label: 'α∈ℕ',             relationshipType: 'special-case' },
  { id: 'e-erlang-gam',      source: 'erlang',           target: 'gamma',              label: 'special case',     relationshipType: 'special-case' },
  { id: 'e-chi2-exp',        source: 'chi-square',       target: 'exponential',        label: 'k=2',              relationshipType: 'special-case' },
  { id: 'e-beta-unif',       source: 'beta',             target: 'uniform',            label: 'α=β=1',            relationshipType: 'special-case' },
  { id: 'e-beta-arc',        source: 'beta',             target: 'arcsine',            label: 'α=β=½',            relationshipType: 'special-case' },
  { id: 'e-t-cauchy',        source: 't',                target: 'cauchy',             label: 'ν=1',              relationshipType: 'special-case' },
  { id: 'e-t-stdcauchy',     source: 't',                target: 'standard-cauchy',    label: 'ν=1, μ=0',         relationshipType: 'special-case' },
  { id: 'e-weib-exp',        source: 'weibull',          target: 'exponential',        label: 'k=1',              relationshipType: 'special-case' },
  { id: 'e-weib-ray',        source: 'weibull',          target: 'rayleigh',           label: 'k=2',              relationshipType: 'special-case' },
  { id: 'e-stdnorm-norm',    source: 'standard-normal',  target: 'normal',             label: 'μ+σZ',             relationshipType: 'special-case',  property: 'F' },
  { id: 'e-pareto-lomax',    source: 'pareto',           target: 'lomax',              label: 'X−xₘ',            relationshipType: 'special-case' },
  { id: 'e-ig-wald',         source: 'inverse-gaussian', target: 'standard-wald',      label: 'μ=1',              relationshipType: 'special-case' },
  { id: 'e-zeta-zipf',       source: 'zeta',             target: 'zipf',               label: 'v=1',              relationshipType: 'special-case' },
  { id: 'e-nchi2-chi2',      source: 'noncentral-chi-square', target: 'chi-square',    label: 'λ=0',              relationshipType: 'special-case' },
  { id: 'e-nf-f',            source: 'noncentral-f',     target: 'f',                  label: 'δ=0',              relationshipType: 'special-case' },
  { id: 'e-nt-t',            source: 'noncentral-t',     target: 't',                  label: 'δ=0',              relationshipType: 'special-case' },
  { id: 'e-dnf-nf',          source: 'doubly-noncentral-f', target: 'noncentral-f',    label: 'γ=0',              relationshipType: 'special-case' },
  { id: 'e-dnt-nt',          source: 'doubly-noncentral-t', target: 'noncentral-t',    label: 'δ₂=0',            relationshipType: 'special-case' },
  { id: 'e-stdweib-weib',    source: 'standard-weibull', target: 'weibull',            label: 'λ=1',              relationshipType: 'special-case' },
  { id: 'e-stdcauchy-cauchy', source: 'standard-cauchy', target: 'cauchy',             label: 'c=0, S=1',         relationshipType: 'special-case' },
  { id: 'e-stdpow-beta',     source: 'standard-power',   target: 'beta',               label: 'Beta(β, 1)',       relationshipType: 'special-case' },
  { id: 'e-bpas-nbin',       source: 'beta-pascal',      target: 'negative-binomial',  label: 'β,δ→∞',           relationshipType: 'special-case' },
  { id: 'e-bbin-bin',        source: 'beta-binomial',    target: 'binomial',           label: 'β,δ→∞',           relationshipType: 'special-case' },
  { id: 'e-gpois-nbin',      source: 'gamma-poisson',    target: 'negative-binomial',  label: 'mixing',           relationshipType: 'special-case' },
  { id: 'e-rect-dunif',      source: 'rectangular',      target: 'discrete-uniform',   label: 'special case',     relationshipType: 'special-case' },
  { id: 'e-gam-chi2',        source: 'gamma',            target: 'chi-square',         label: 'α=k/2, β=2',       relationshipType: 'special-case' },
  { id: 'e-hyperexp-exp',    source: 'hyperexponential', target: 'exponential',        label: 'n=1',              relationshipType: 'special-case' },

  // ── Limiting distributions ─────────────────────────────────────────────────
  { id: 'e-bin-pois',        source: 'binomial',         target: 'poisson',            label: 'n→∞, p small',    relationshipType: 'limiting' },
  { id: 'e-bin-norm',        source: 'binomial',         target: 'normal',             label: 'n→∞, CLT',        relationshipType: 'limiting' },
  { id: 'e-pois-norm',       source: 'poisson',          target: 'normal',             label: 'λ→∞',             relationshipType: 'limiting' },
  { id: 'e-gam-norm',        source: 'gamma',            target: 'normal',             label: 'α→∞',             relationshipType: 'limiting' },
  { id: 'e-chi2-norm',       source: 'chi-square',       target: 'normal',             label: 'k→∞',             relationshipType: 'limiting' },
  { id: 'e-t-norm',          source: 't',                target: 'normal',             label: 'ν→∞',             relationshipType: 'limiting' },
  { id: 'e-f-chi2',          source: 'f',                target: 'chi-square',         label: 'd₂→∞, ×d₁',       relationshipType: 'limiting' },
  { id: 'e-nbin-pois',       source: 'negative-binomial', target: 'poisson',           label: 'r→∞',             relationshipType: 'limiting' },
  { id: 'e-beta-norm',       source: 'beta',             target: 'normal',             label: 'α,β→∞',           relationshipType: 'limiting' },
  { id: 'e-hyp-bin',         source: 'hypergeometric',   target: 'binomial',           label: 'N→∞',             relationshipType: 'limiting' },
  { id: 'e-nhyp-nbin',       source: 'negative-hypergeometric', target: 'negative-binomial', label: 'N→∞',       relationshipType: 'limiting' },
  { id: 'e-ig-norm',         source: 'inverse-gaussian', target: 'normal',             label: 'λ→∞',             relationshipType: 'limiting' },
  { id: 'e-gpois-pois',      source: 'gamma-poisson',    target: 'poisson',            label: 'β→∞',             relationshipType: 'limiting' },
  { id: 'e-gomp-exp',        source: 'gompertz',         target: 'exponential',        label: 'δ→0',             relationshipType: 'limiting' },

  // ── Transformations ────────────────────────────────────────────────────────
  { id: 'e-norm-lnorm',      source: 'normal',           target: 'log-normal',         label: 'eˣ',              relationshipType: 'transformation', property: 'V' },
  { id: 'e-lnorm-norm',      source: 'log-normal',       target: 'normal',             label: 'log X',            relationshipType: 'transformation' },
  { id: 'e-stdnorm-chi2',    source: 'standard-normal',  target: 'chi-square',         label: 'Σ Zᵢ²',           relationshipType: 'transformation', property: 'C' },
  { id: 'e-chi2-chi',        source: 'chi-square',       target: 'chi',                label: '√X',              relationshipType: 'transformation' },
  { id: 'e-chi2-f',          source: 'chi-square',       target: 'f',                  label: '(χ²/d₁)÷(χ²/d₂)', relationshipType: 'transformation' },
  { id: 'e-t-f',             source: 't',                target: 'f',                  label: 'X²: t²=F(1,ν)',   relationshipType: 'transformation' },
  { id: 'e-exp-gam',         source: 'exponential',      target: 'gamma',              label: 'Σ Xᵢ (n=α)',      relationshipType: 'transformation', property: 'C' },
  { id: 'e-geo-nbin',        source: 'geometric',        target: 'negative-binomial',  label: 'Σ Xᵢ (r)',        relationshipType: 'transformation', property: 'C' },
  { id: 'e-exp-weib',        source: 'exponential',      target: 'weibull',            label: 'X^(1/k)',          relationshipType: 'transformation', property: 'V' },
  { id: 'e-unif-exp',        source: 'uniform',          target: 'exponential',        label: '−log U',           relationshipType: 'transformation', property: 'V' },
  { id: 'e-gam-beta',        source: 'gamma',            target: 'beta',               label: 'X/(X+Y)',          relationshipType: 'transformation', property: 'V' },
  { id: 'e-ev-weib',         source: 'extreme-value',    target: 'weibull',            label: 'e^{−X}',           relationshipType: 'transformation' },
  { id: 'e-weib-ev',         source: 'weibull',          target: 'extreme-value',      label: '−log X',           relationshipType: 'transformation' },
  { id: 'e-logist-llogist',  source: 'logistic',         target: 'log-logistic',       label: 'eˣ',              relationshipType: 'transformation' },
  { id: 'e-llogist-logist',  source: 'log-logistic',     target: 'logistic',           label: 'log X',            relationshipType: 'transformation' },
  { id: 'e-pareto-exp',      source: 'pareto',           target: 'exponential',        label: 'log(X/xₘ)',        relationshipType: 'transformation' },
  { id: 'e-ray-chi2',        source: 'rayleigh',         target: 'chi-square',         label: 'X²/σ², k=2',       relationshipType: 'transformation' },
  { id: 'e-norm-stdnorm',    source: 'normal',           target: 'standard-normal',    label: '(X−μ)/σ',          relationshipType: 'transformation', property: 'F' },
  { id: 'e-chi-norm',        source: 'chi',              target: 'normal',             label: '|Z|',              relationshipType: 'transformation' },
  { id: 'e-gam-loggam',      source: 'gamma',            target: 'log-gamma',          label: 'log X',            relationshipType: 'transformation' },
  { id: 'e-gam-invgam',      source: 'gamma',            target: 'inverted-gamma',     label: '1/X',              relationshipType: 'transformation', property: 'I' },
  { id: 'e-exp-lap',         source: 'exponential',      target: 'laplace',            label: 'X₁−X₂',           relationshipType: 'transformation' },
  { id: 'e-unif-pow',        source: 'uniform',          target: 'power',              label: 'X^(1/c)',          relationshipType: 'transformation' },
  { id: 'e-pseries-bin',     source: 'power-series',     target: 'binomial',           label: 'special',          relationshipType: 'transformation' },
  { id: 'e-pseries-pois',    source: 'power-series',     target: 'poisson',            label: 'special',          relationshipType: 'transformation' },
  { id: 'e-pseries-geo',     source: 'power-series',     target: 'geometric',          label: 'special',          relationshipType: 'transformation' },
  { id: 'e-pseries-log',     source: 'power-series',     target: 'logarithmic',        label: 'special',          relationshipType: 'transformation' },
  { id: 'e-log-nbin',        source: 'logarithmic',      target: 'negative-binomial',  label: 'Σ Xᵢ',            relationshipType: 'transformation', property: 'C' },
  { id: 'e-mak-gomp',        source: 'makeham',          target: 'gompertz',           label: 'δ=0',              relationshipType: 'transformation' },
  { id: 'e-gam-nak',         source: 'gamma',            target: 'nakagami',           label: '√(mX/Ω)',          relationshipType: 'transformation' },
  { id: 'e-pareto-lnorm',    source: 'pareto',           target: 'log-normal',         label: 'log X ~ Normal',   relationshipType: 'transformation' },
  { id: 'e-arc-cauchy',      source: 'arctangent',       target: 'cauchy',             label: 'related',          relationshipType: 'transformation' },
  { id: 'e-stdcauchy-arc',   source: 'standard-cauchy',  target: 'arctangent',         label: 'π arctan(X)',       relationshipType: 'transformation' },
  { id: 'e-hypsec-logist',   source: 'hyperbolic-secant', target: 'logistic',          label: 'related',          relationshipType: 'transformation' },
  { id: 'e-ray-nak',         source: 'rayleigh',         target: 'nakagami',           label: 'm=½',              relationshipType: 'transformation' },
  { id: 'e-minimax-beta',    source: 'minimax',          target: 'beta',               label: 'related',          relationshipType: 'transformation' },
  { id: 'e-weib-ep',         source: 'weibull',          target: 'exponential-power',  label: 'related',          relationshipType: 'transformation' },
  { id: 'e-norm-chi2-nc',    source: 'normal',           target: 'noncentral-chi-square', label: 'non-zero μ',    relationshipType: 'transformation' },
  { id: 'e-chi2-nf',         source: 'chi-square',       target: 'noncentral-f',       label: 'non-central',      relationshipType: 'transformation' },
  { id: 'e-beta-nbin-bay',   source: 'beta',             target: 'beta-binomial',      label: 'prior',            relationshipType: 'bayesian' },
  { id: 'e-bpas-bay',        source: 'beta',             target: 'beta-pascal',        label: 'prior',            relationshipType: 'bayesian' },

  // ── Bayesian ────────────────────────────────────────────────────────────────
  { id: 'e-beta-bin-bay',    source: 'beta',             target: 'binomial',           label: 'conjugate prior',  relationshipType: 'bayesian' },
  { id: 'e-gam-pois-bay',    source: 'gamma',            target: 'poisson',            label: 'conjugate prior',  relationshipType: 'bayesian' },
  { id: 'e-gamnorm-norm-bay', source: 'gamma-normal',    target: 'normal',             label: 'mixture',          relationshipType: 'bayesian' },
  { id: 'e-invgam-norm-bay', source: 'inverted-gamma',   target: 'normal',             label: 'conjugate σ²',     relationshipType: 'bayesian' },
  { id: 'e-gam-gpois-bay',   source: 'gamma',            target: 'gamma-poisson',      label: 'mixing prior',     relationshipType: 'bayesian' },
]
