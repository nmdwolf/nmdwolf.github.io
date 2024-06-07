---
layout: post
title:  "Normalizing flows for regression problems"
date:   2022-06-16
categories: talk
publish: true
ids:
  - Overview
  - Measure Theory
  - Flows
  - Regression Problems
  - Extras
  - References
---

<hr id = "Overview">
<div class = "nav-block"><div class = "side">Overview</div></div>

This talk, given as part of the Machine Learning Discussion Group of KERMIT, had three goals:
1. Giving an introduction to the formal (measure-theoretic) foundations of probability theory.
2. Explaining how to transform an arbitrary distribution into a normal distribution.
3. Applying the normalizing flow framework to regression problems.

<hr id = "MeasureTheory">
<div class = "nav-block"><div class = "side">Measure Theory</div></div>

In the past people noticed that, given the foundations of set theory, it was impossible to consistently assign a volume to all subsets of a Euclidean space $\mathbb{R}^d$ (see <a href="https://en.wikipedia.org/wiki/Non-measurable_set">this Wikipedia article</a>).
The solution was, instead of first choosing a measuring function (such as the volume) and applying this to arbitrary sets,
to first fix the sets that should be measurable and then consider all consistent measures on that collection.

To this end, consider an arbitrary space $\mathcal{X}$ and fix a collection of subsets $\Sigma\subseteq P(\mathcal{X})$.
If this collection satisfies the following conditions, it is called a <b>$\sigma$-algebra</b> and the subsets are said to be <b>measurable</b>:
* Totality: $\mathcal{X}\in\Sigma$.
* Complements of measurable sets are measurable: $A\in\Sigma\implies\mathcal{X}\backslash A\in\Sigma$.
* Countable unions of measurable sets are measurable: $(A\_n)\_{n\in\mathbb{N}}\subset\Sigma\implies\bigcup\_{i=1}^\infty A\_i\in\Sigma$.

These conditions can be understood in an intuitive way. The first condition is a kind of sanity check. The least we should be able to do is describe the object as a whole. If we cannot say anything about the whole system, why even bother looking at its components.
The second and third conditions are compatibility conditions stating that we should be able to combine information about parts of the system.

<div class="note">
<div class = "side">Note</div>

There exist two trivial examples: the <b>trivial $\sigma$-algebra</b> $\{\emptyset,\mathcal{X}\}$ and the <b>discrete $\sigma$-algebra</b> $P(\mathcal{X})$. These correspond to the situation where we know either nothing or everything about the system. As such they are a bit boring. A much more interesting class of examples is obtained when we have a notion of distance $d:\mathcal{X}\times\mathcal{X}\rightarrow\mathbb{R}^+$, such as the standard Euclidean distance on $\mathbb{R}^n$. The <a href="https://en.wikipedia.org/wiki/Borel_set">Borel $\sigma$-algebra</a> of a <a target = "_blank" href="https://en.wikipedia.org/wiki/Metric_space">metric space</a> is the smallest $\sigma$-algebra containing all open balls
  
$$B(x,r):=\{y\in\mathcal{X}\mid d(x,y) < r\}\,.$$
  
For example, on $\mathbb{R}$, the Borel sets are those "generated" by the open intervals $]a,b[$ for all $a<b\in\overline{\mathbb{R}}$. (Generated means that they are constructed using complements and countable unions.)
</div>

After choosing a measurable space $(\mathcal{X},\Sigma)$, we can define a <b>measure</b>. This a nonnegative set function $\mu:\Sigma\rightarrow\overline{\mathbb{R}}^+$ satisfying:
1. Emptiness: $\mu(\emptyset)=0$.
1. <b>$\sigma$-additivity</b>: $\mu\left(\bigsqcup_{i=1}^\infty A_i\right)=\sum_{i=1}^\infty\mu(A_i)$.

If $\mu(\mathcal{X})=1$, we call the measure a <b>probability measure</b>. It is not hard to see that every finite measure can be turned into a probability measure. On $\mathbb{R}^d$, the probability measures are usually defined through cumulative distribution functions or, in some cases, by probability density functions (through the <a target = "_blank" href="https://en.wikipedia.org/wiki/Radon%E2%80%93Nikodym_theorem">Radon&ndash;Nikodym theorem</a>). On finite sets, the most common measure is the "counting measure" or "uniform distribution":

$$\mu_\text{count}(A) := |A|\qquad\qquad\mu_\text{uni}(A):=\frac{|A|}{|\mathcal{X}|}.$$

Now that we have introduced the objects of interest, it is time to move to the morphisms (functions) of interest.
As with most mathematical objects, we should consider those functions that preserve the relevant structure.
A function $f:(\mathcal{X},\Sigma_\mathcal{X})\rightarrow(\mathcal{Y},\Sigma_\mathcal{Y})$ between measurable spaces
is said to be <b>measurable</b> if

$$A\in\Sigma_\mathcal{Y}\implies f^{-1}(A)\in\Sigma_\mathcal{X}\,.$$

Given this definition we can also easily see how to transport measures between spaces. The <b>pushforward</b> of a measure $\mu$ along $f$ is defined by

$$f_\ast\mu(A):=\mu\left(f^{-1}(A)\right)\,.$$

This begs the question of how the density functions of these two measures, if they exist, are related. The answer is given by the change-of-variables formula:

<div class="theorem">
    For every measure space $(\mathcal{X},\mu)$ and measurable function $f:\mathcal{X}\rightarrow\mathcal{Y}$, <a href="https://en.wikipedia.org/wiki/Lebesgue_integration">integrals</a> with respect to $f_\ast\mu$ can be calculated as follows:
    
    $$\int_{f^{-1}(\mathcal{Y})} g\circ f\,\mathrm{d}\mu = \int_{\mathcal{Y}}g\,\mathrm{d}f_\ast\mu\,.$$

    Moreover, if $X$ is a random variable on $\mathbb{R}^d$ with density function $\rho_X$, for every <a href="https://en.wikipedia.org/wiki/Diffeomorphism">diffeomorphism</a>
    $f:\mathbb{R}^d\rightarrow\mathbb{R}^d$ the transformed density satisfies: $$\rho_X(x) = \rho_{f(X)}\bigl(f(x)\bigr)\bigl|\det\bigl(J(x)\bigr)\bigr|\,,$$ where $J$ is the Jacobian of $f$.
</div>

Before we move to the next part and introduce normalizing flows, it is important to consider the convergence of measures.
A sequence of measures $(\mu_n)_{n\in\mathbb{N}}$ on $\mathcal{X}$ is said to <b>converge weakly</b> to a measure $\mu$ if

$$\lim_{n\rightarrow\infty}\int_\mathcal{X}g\,\mathrm{d}\mu_n=\int_\mathcal{X}g\,\mathrm{d}\mu$$

for all bounded, continuous functions $g:\mathcal{X}\rightarrow\mathbb{R}$. Note that for probability measures this simply means that the expectations converge. (This explains why this is a weak form of convergence.)
Now, because of the theorem above, if a sequence of measurable functions $(f_n)_{n\in\mathbb{N}}$ converges pointwise to a function $f:\mathcal{X}\rightarrow\mathcal{Y}$, the pushforwards converge weakly:

$$\forall x\in\mathcal{X}:\lim_{n\rightarrow\infty}f_n(x)=f(x)\implies f_{n,\ast}\mu\rightsquigarrow f_\ast\mu\,.$$

<hr id = "Flows">
<div class = "nav-block"><div class = "side">Flows</div></div>

A <b>flow</b> is a continuous function $\phi:\mathbb{R}\times\mathcal{X}\rightarrow\mathcal{X}:(t,x)\mapsto\phi_t(x)$ satisfying:
1. $\phi_0=𝟙_\mathcal{X}$,
1. $\phi_t\circ\phi_s=\phi_{t+s}$ for all $s,t\in\mathbb{R}$, and (as a consequence)
1. $\phi_t$ is invertible for all $t\in\mathbb{R}$ with $\phi_{-t}=(\phi_t)^{-1}$.

<div class="note">
<div class = "side">Note</div>

For the mathematically inclined reader: This means that under <i>currying</i> a flow is equivalent to a group morphism from the additive group $\mathbb{R}$ to the automorphism group $\mathrm{Aut}(\mathcal{X})$, i.e. the group of all invertible functions $\mathcal{X}\rightarrow\mathcal{X}$.
</div>

In practice, this is often approximated by a "discrete flow" $\phi:\mathbb{Z}\times\mathcal{X}\rightarrow\mathcal{X}$:

$$\phi_k:=\Phi^k$$

for some transformation $\phi_1\equiv\Phi:\mathcal{X}\rightarrow\mathcal{X}$ (the <i>time-1</i> map of the continuous flow).
As a further approximation, we can replace the iterated power structure by an arbitrary sequence of transformations:

$$\Psi:=\Phi_k\circ\ldots\Phi_2\circ\Phi_1\,,$$

with all $\Phi_i$ invertible. If all these transformations are diffeomorphisms, the change-of-variables formula becomes:

$$f_X(x) = f_{\Psi(X)}\bigl(\Psi(x)\bigr)\prod_{i=1}^k\left|\frac{\partial\Phi_i}{\partial\Phi_{i-1}}\bigl(\Phi_{i-1}(x)\bigr)\right|\,.$$

The most common transformations are the following ones (here it is assumed that $\mathcal{X}$ is a vector space):
* <b>Affine (or linear) flow</b>: $\Phi(x) := Ax+b$.
* <b>Planar flows</b>: $\Phi(x) := x + h(w\cdot x + \lambda)v$ for some diffeomorphism $h:\mathbb{R}\rightarrow\mathbb{R}$.
* <b>Coupling flows</b>: $\Phi(x) := \bigl(x^I,h(x^J;x^I)\bigr)$ for some diffeomorphism $h:\mathbb{R}^{\|J\|}\times\mathbb{R}^{\|I\|}\rightarrow\mathbb{R}^{\|J\|}$, where $x=(x^I,x^J)$ for some partition $I,J$ of $\\{1,\ldots,\dim(\mathcal{X})\\}$.

Although not very expressive, e.g. exponential families are mapped to exponential families, affine flows are simple to implement.
By contrast, the planar flows are expressive, but their inverse generally does not exist in closed form.

The most powerful transformation is the so-called <b>autoregressive (</b>or <b>triangular) flow</b>. In components it is given by

$$\Phi^\mu(x) := h_\mu\bigl(x^\mu;\theta_\mu(x^1,\ldots,x^{\mu-1})\bigr).$$

The structure of such a flow is shown in the figure below.

<center>
  <img src="{{site.baseurl}}/assets/figures/NF.jpg" alt="Autoregressive flow" style="width: 60%">
</center>

The reason for why autoregressive flows are so important is given by the following theorem
which implies the universality of the classes of autoregressive flows with increasing coupling functions (or any dense subset thereof)
for distributions without discrete or singular contributions:

<div class="theorem" text="Bogachev et al.">
  Every two absolutely continuous distributions on $\mathbb{R}^d$ are related by an increasing (in the first argument) triangular Borel function.
</div>

To obtain a <b>normalizing flow</b> (on $\mathbb{R}^d$) we now make the following crucial assumption:

$$\Psi(X)\sim\mathcal{N}(0,𝟙_{d\times d})\,.$$

(We could essentially use any fixed distribution, but normal distributions are much easier to work with.)
To generate new samples, we simply sample points from a multinormal distribution and pass them through the flow function.

<hr id = "RegressionProblems">
<div class = "nav-block"><div class = "side">Regression Problems</div></div>

As mentioned at the end of the previous section, for generative models the joint distribution of, for example, the pixels of a picture is transformed to a (multi)normal distribution:

$$\Psi:P(X)\Rightarrow\mathcal{N}\,.$$

However, for regression problems it is not the joint distribution that is transformed. It is the conditional distribution $Y\mid X$ that should be transformed.
This is achieved by making the flow parameters $\mathcal{X}$-dependent: $$\Psi_X:P(Y\mid X)\Rightarrow\mathcal{N}.$$
This means that instead of directly optimizing the flow parameters, we train a network that outputs these parameters given the features.<br><br>

In theory, for univariate absolutely continuous CDFs the following transformation suffices: $\Psi := G^{-1}\circ F$.
This first maps $F$ to the uniform distribution on $[0,1]$ and then, with the quantile function, the uniform distribution is mapped to $G$.
However, this requires the knowledge of both $F$ and $G^{-1}$ (in closed form if we want to implement this).
Since this is not possible, we replace the transformation by a sequence of simpler ones and apply variational optimization using the loglikelihood

$$\mathcal{L}(\mathcal{D}) = \sum_{(\mathbf{x},y)\in\mathcal{D}}\left(\log\Bigl(\mathcal{N}\bigl(\Psi(y\mid\mathbf{x})\bigr)\!\Bigr) + \sum_{i=1}^k\log\dot{\Phi}_i\bigl(\Phi_{i-1}(y\mid\mathbf{x})\bigr)\!\right)\,,$$

where:
* $\Psi(\,\cdot\mid X):\mathbb{R}\rightarrow\mathbb{R}$ is the total transformation $P(Y\mid X)\rightarrow\mathcal{N}$.
* Each $\Phi_i$ is modeled by a monotone network: \\[\Phi_i(y\mid\mathbf{x}) := \int_0^y\bigl(f_i(u,\mathbf{x})+1\bigr)\,\mathrm{d}u + \text{cnst}\\] with $f_i:\mathbb{R}\times\mathcal{X}\rightarrow\mathbb{R}$ an unconstrained neural network with final ELU activation.

<hr id = "Extras">
<div class = "nav-block"><div class = "side">Extras</div></div>

Instead of discretizing the flow $\phi:\mathbb{R}\times\mathbb{R}^d\rightarrow\mathbb{R}^d$, we can use the fact that flows are usually the solutions of an ordinary differential equation (ODE). For example, consider

$$\Phi_{(k)}:=\mathbb{1}_{d\times d} + \tfrac{1}{k}\xi\qquad\text{with}\qquad\xi\in M_d(\mathbb{R})\,.$$

The powers $\Phi_{(k)}^k$ converge to the exponential map $\exp(\xi)$, which is the (time-1 map of the) solution of the ODE

$$\dot{x}(t) = \xi\triangleright x(t)\,,$$

where $\triangleright$ indicates the action of $M_d(\mathbb{R})$ on $\mathbb{R}^d$. This observation leads to modelling normalizing flows as <i>neural ODEs</i>. Another approach is to model the flows using stochastic differential equations instead of ODEs. For a vanishing diffusion term, this recovers the ODE approach.

The goal of training NFs is to find a measurable function $\Psi$ such that $\Psi_\ast P=\mathcal{N}$, where $P$ is the data generating distribution. This problem is actually the same as the one considered in <a target = "_blank" href="https://en.wikipedia.org/wiki/Transportation_theory_(mathematics)">optimal transport</a>:

$$\text{minimize }\int_\mathcal{X}c\bigl(x,\Psi(x)\bigr)\,\mathrm{d}\mu(x)\qquad\text{with}\qquad\Psi_\ast\mu=\nu\,.$$

Here, the challenge is to find the minimal cost for transporting products from producers, distributed according to $\mu$, to consumers, distributed according to $\nu$.

<hr id = "References">
<div class = "nav-block"><div class = "side">References</div></div>

* Kobyzev, I., Prince, S. J., & Brubaker, M. A. (2020). Normalizing flows: An introduction and review of current methods. IEEE transactions on pattern analysis and machine intelligence, 43(11), 3964-3979.
* Bogachev, V. I., Kolesnikov, A. V., & Medvedev, K. V. (2005). Triangular transformations of measures. Sbornik: Mathematics, 196(3), 309-335.