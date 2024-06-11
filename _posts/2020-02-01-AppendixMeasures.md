---
layout: post
title:  "Appendix: Measure Theory"
date:   2020-02-01
categories: post
publish: true

ids:
    - Measurability
    - Probability Measures
    - Integration
    - Densities
    - Conditional Probabilities
    - Law Of Large Numbers
    - References
    - Footnotes

defs:
    - Counting Measure
    - Kolmogorov Axioms
    - Atom
    - Null Set
    - Almost Surely
    - Dirac Measure
    - Preimage
    - Sigma Algebra
    - Measurable Function
    - Pushforward
    - Random Variable
    - Simple Function
    - Lebesgue Integral
    - Integrable Function
    - Absolute Continuity
    - Conditional Probability
    - Markov Kernel
---

Although we often do not really care about the formalities of a framework in practice, from a theoretical point of view it is important to carefully treat all objects. For this reason, this appendix will (briefly) cover the main notions and results that will be used throughout the posts on probability theory and related subjects.

<hr id = "Measurability">
<div class = "nav-block"><div class = "side">Measurability</div></div>

In the beginning of the previous century, people realized that probability theory could be formally founded in the same mathematical theory that was being used to formalize notions of area and volume: 'measure theory'. The problem with assigning a volume to all subsets of a Euclidean space $\mathbb{R}^n$ was that, given the axioms of set theory, mathematicians could not consistently define such an operation. No matter how crazy this might sound, there is no way to consistently define a notion of volume for all subsets of Euclidean space, i.e. there is no way to 'measure' all these sets. A famous example is given by the <a href = "https://en.wikipedia.org/wiki/Vitali_set" target = "_blank" rel = "noopener nofollow">Vitali sets</a>.[^1]<br><br>

[^1]: The existence of nonmeasurable sets crucially depends on the <a href = "https://en.wikipedia.org/wiki/Axiom_of_choice" target = "_blank" rel = "noopener nofollow">axiom of choice</a>, one of the most important, yet controversial axioms of set theory. As a consequence, they do not exist in <a href = "https://en.wikipedia.org/wiki/Constructivism_(philosophy_of_mathematics)" target = "_blank" rel = "noopener nofollow">constructive mathematics</a>.

The relation between measuring sets and assigning probabilities should, after all, not come as a surprise. Consider, for example, the set $[n]$ of the first $n\in\mathbb{N}$ integers. What is the probability that a point, uniformly sampled from $[n]$, lies in a subset $S\subseteq[n]$? This is simply the size (or cardinality) of the subset divided by $n$:

$$\mathrm{Prob}(S) = \frac{|S|}{|[n]|} = \frac{|S|}{n}\,.$$

As such, calculating this probability is equivalent to determining the size of $S$, i.e. 'measuring' $S$. This uniform probability distribution corresponds to what is also called the <b id = "CountingMeasure">counting measure</b>, since it simply counts the number of elements in a set (a formalization of the notion of measure will be introduced further below):

$$\mu_\text{count}(A) := |A|\,.$$

Sadly, in the case of infinite sets, the axiom of choice makes our lives slightly more miserable. For example, as Wikipedia so beautifully explains, the <a href = "https://en.wikipedia.org/wiki/Banach%E2%80%93Tarski_paradox" target = "_blank" rel = "noopener nofollow">Banach&ndash;Tarski paradox</a> shows that there is no way to consistently define a notion of volume in three dimensions unless one of the following five concessions is made:
* The volume of a set changes when it is rotated.
* The volume of the union of two disjoint sets is different from the sum of their individual volumes.
* Some sets are deemed 'nonmeasurable', and we need to check whether a set is `measurable' before being able to talk about its volume.
* The axioms of ZFC (<a href = "https://en.wikipedia.org/wiki/Zermelo%E2%80%93Fraenkel_set_theory" target = "_blank" rel = "noopener nofollow">Zermelo&ndash;Fraenkel set theory</a> with the axiom of choice) have to be altered.
* The volume of $[0,1]^3$ is either 0 or $+\infty$.

In the case of measure theory, the third option is chosen, i.e. the whole procedure is simply turned around. Instead of starting from a measure and finding out that not all sets are measurable, we start with a collection of sets that we would like to be measurable and study all measures consistent with this collection. This leads to the following notion.

<div class = "def" id = "SigmaAlgebra">
A <b>$\sigma$-algebra</b> is a collection $\Sigma\subseteq2^\mathcal{X}$ of subsets such that:
<div markdown = "1">
  1. <b>Triviality</b>: The empty set is measurable: $\emptyset\in\Sigma$.
  1. <b>Complements</b>: Complements of measurable sets are measurable: \\[A\in\Sigma\implies A^c\in\Sigma\,.\\]
  1. <b>Countable unions</b>: Countable (disjoint) unions of measurable sets are measurable: \\[(A_n)\_{n\in\mathbb{N}}\subseteq\Sigma\implies\bigsqcup\_{i=1}^{+\infty}A\_i\in\Sigma\,.\\]
</div>
The elements of a $\sigma$-algebra are called <b>measurable sets</b> and the pair $(\mathcal{X},\Sigma)$ is called a <b>measurable space</b>. (If the choice of $\sigma$-algebra is irrelevant, we will simply write $\mathcal{X}$.)
</div>

Before continuing the discussion about measure theory, let us first see why these conditions make sense. The triviality condition should be clear. If any set should be measurable, then let it at least be the empty one. It has no internal structure and it contains no elements, so measuring it should be trivial. The second condition is also quite straightforward. If we can measure $\mathcal{X}$ and a subset of it, then we should also be able to measure the complement. The fact that we can measure $\mathcal{X}$ itself is just a simple consequence of the first two conditions. For the third condition, we can argue that if every set $A_n$ can be measured and the results can be enumerated, we can iteratively combine the results to measure the union. However, what if someone asks how to measure intersections of measurable sets? The solution is given by a basic result from set theory that relates these operations. <b id = "DeMorgan">De Morgan's laws</b> state that

$$\mathcal{X}\backslash\bigcup_{n=1}^{+\infty}A_n = \bigcap_{n=1}^{+\infty}\mathcal{X}\backslash A_n$$

and

$$\mathcal{X}\backslash\bigcap_{n=1}^{+\infty}A_n = \bigcup_{n=1}^{+\infty}\mathcal{X}\backslash A_n\,.$$

Using one of these equalities, together with the second condition on $\sigma$-algebras, the intersection of measurable sets can be rewritten as a union of measurable sets and, hence, this intersection is itself measurable by virtue of the third condition above. Now that we have seen the definition of measurable sets, it might also be a good idea to consider some examples to get a feeling of what $\sigma$-algebras might entail.<br><br>

Two trivial examples of $\sigma$-algebras can be defined on any set $\mathcal{X}$, no matter the size or structure. These are the <b>trivial</b> (or <b>codiscrete</b>) $\sigma$-algebra

$$\Sigma_\mathrm{codisc}(\mathcal{X}) := \\{\emptyset,\mathcal{X}\\}$$

and the <b>discrete</b> $\sigma$-algebra

$$\Sigma_\mathrm{disc}(X) := 2^{\mathcal{X}}\,.$$

The first example can be interpreted as the situation where we are trying to measure the objects in a sealed box. The individual elements cannot be measured, only the box as a whole can be measured. The second example is the situation where we have perfect control over or knowledge about the whole set.<br><br>

To obtain more interesting examples, we could pass to $\mathbb{R}^n$. However, just for fun (and because it is sometimes also of interest in practice), we can pass to an even more general setting, namely that of <i>topological spaces</i>. Formally introducing these objects would lead us too far astray, so let it suffice to say that these allow to formalize what it means for a set to be 'open', 'closed', 'compact', etc. The definition of a <i>topology</i> is stated in terms of unions and intersections of sets and, hence, this structure always induces that of a measurable space.

<div class = "def" id = "BorelSigmaAlgebra">
    Consider a <i>topological space</i> $\mathcal{X}$. The Borel $\sigma$-algebra on $\mathcal{X}$ is the smallest $\sigma$-algebra containing all open sets of $\mathcal{X}$.
<div markdown="1">
* The Borel algebra on $\mathbb{R}$ is generated by the open intervals $]a,b[$ for all $a,b\in\mathbb{R}$. This is the common choice on all Euclidean spaces $\mathbb{R}^n$ and is often implicitly assumed.
* The trivial and discrete $\sigma$-algebras are induced by (and coincide with) the <i>trivial</i> and <i>discrete topologies</i>, respectively.
</div>
</div>

As usual, the prototypical example is the real line $\mathbb{R}$. In this setting, we know that every open set can be written as a (countable) union of open intervals. So, the Borel $\sigma$-algebra on $\mathbb{R}$ is the one 'generated' (in the sense of applying the operations defining a $\sigma$-algebra) by the open intervals. However, an open set is always the complement of closed set[^2], so we also obtain that the Borel $\sigma$-algebra of $\mathbb{R}$ and, in fact, of any topological space also contains all closed sets.

<div class = "note">
    <div class = "side">Note</div>
    The trivial and discrete $\sigma$-algebras are actually the Borel $\sigma$-algebras of <i>codiscrete</i> and <i>discrete topologies</i>, respectively.
</div>

[^2]: This is how closed sets are defined in general topological spaces.

As a last example, we consider the multisets in a measurable space. For the construction of (transductive) conformal predictors, we need to have a measurable structure on multisets. (Casual readers might prefer to skip this example.) Consider a measurable space $(\mathcal{X},\Sigma)$. The set $\mathcal{X}^\*$ can also be turned into a measurable space as follows. For every $n\in\mathbb{N}$, the product $\sigma$-algebra on $\mathcal{X}^n$ is defined to be the smallest $\sigma$-algebra such that all Cartesian products $\prod_{i=1}^nA_i$, where $A_i\in\Sigma$ for all $i\leq n$, are measurable.[^3] Given these measurable spaces $(\mathcal{X}^n,\Sigma_n)$, we then take the (countable) disjoint union. The $\sigma$-algebra $\Sigma_\*$ on $\mathcal{X}^*$ is defined such that[^4]

$$B\in\Sigma_*\iff B\cap\mathcal{X}^n\in\Sigma_n$$

for all $B\subseteq\mathcal{X}^*$.

[^3]: This is the smallest $\sigma$-algebra for which the projections $\pi_i:\mathcal{X}^n\rightarrow\mathcal{X}$ are measurable (see further on).
[^4]: This is the largest $\sigma$-algebra for which the inclusions $\iota_n:\mathcal{X}^n\hookrightarrow\mathcal{X}^*$ are measurable.

<hr id = "ProbabilityMeasures">
<div class = "nav-block"><div class = "side">Probability Measures</div></div>

Now that the notion of a measurable space has been introduced, it is time to move on. The first step as a true mathematician would be to ask which functions preserve the structure of a measurable space. However, to avoid having to immediately delve into the technicalities of set theory, it is better to first introduce the notion of a measure, which will serve as a motivation for further concepts.

<div class = "def" id = "Measure" text = "Measure">
    Let $(\mathcal{X},\Sigma)$ be a measurable space. A measure on $(\mathcal{X},\Sigma)$ is a set function $\mu:\Sigma\rightarrow\overline{\mathbb{R}}$ satisfying the <b id = "KolmogorovAxioms">Kolmogorov axioms</b>:
<div markdown = "1">
1. <b>Nonnegativity</b>: $\mu(A)\geq0$ for all $A\in\Sigma$.
1. <b>Emptiness</b>: $\mu(\emptyset)=0$.
1. <b>Countable additivity</b> (or <b>$\sigma$-additivity</b>): If $(A\_n)\_{n\in\mathbb{N}}\subset\Sigma$ are disjoint, then \\[\mu\left(\bigsqcup_{n=0}^{+\infty}A_n\right)=\sum_{n=0}^{+\infty}\mu(A_n)\,.\\]
</div>
    The triple $(\mathcal{X},\Sigma,\mu)$ is called a <b>measure space</b>. If $\mu(\mathcal{X})=1$, the measure is called a <b>probability measure</b> or <b>(probability) distribution</b>. It should be clear that any measure space for which $\mu(\mathcal{X})<+\infty$ can be turned into a probability space by a suitable normalization (these are also said to be <b>finite</b>). If a measure space is not finite, but admits a countable cover by finite measures space, it is said to be <b>$\sigma$-finite</b>. The set of all probability measures on a set $\mathcal{X}$ will be denoted by $\mathbb{P}(\mathcal{X})$.
</div>

Requiring nonnegativity is simply a matter of convenience. There exist generalizations to so-called <i>signed measures</i>, but for most practical purposes, especially those of probability theory, the nonnegative ones suffice. The motivation for the third condition is the same as the one for the definition of $\sigma$-algebras. We want to be able to measure complex sets by decomposing them into smaller parts. This condition also has a more important consequence, namelya ll measures are monotonic functions:

$$A\subseteq B\implies\mu(A)\leq\mu(B)\,.$$

At last, we come to the emptiness condition. For ordinary set functions $\kappa:\Sigma\rightarrow\mathbb{R}$, the $\sigma$-additivity condition would allow us to perform the following deduction:

$$\kappa(\emptyset)=\kappa(\emptyset\cup\emptyset)=2\kappa(\emptyset)\implies\kappa(\emptyset)=0\,.$$

However, a measure is allowed to take on the value $+\infty$, which makes this argument invalid. The second condition is simply there to exclude the highly degenerate possibility where the measure is identically $+\infty$.<br><br>

As in the previous subsection, before introducing even more exotic concepts, we first give some examples of (probability) measures. The first one is simply the volume or \textbf{Lebesgue measure} on $\mathbb{R}^n$. It formalizes the way we measure the volume of everyday objects. On intervals, it is defined as follows (the choice of open, half-open or closed intervals does not matter):

$$\lambda\bigl(]a,b]\bigr) := b-a\,.$$

To measure arbitrary Borel subsets of $\mathbb{R}$, we consider covers by such intervals and define the Lebesgue measure of a subset to be the infimum of the measures of its covers. Similarly, for higher-dimensional Euclidean spaces, we first define the Lebesgue measure of hyperrectangles $\mathbf{I}:=I_1\times I_2\times\cdots I_n$ as the product of the lengths of the intervals:

$$\lambda(\mathbf{I}) := \lambda(I_1)\cdots\lambda(I_n)\,,$$

and again define the Lebesgue measure of arbitrary Borel subsets as the infimum of the measures of covers by such hyperrectangles. This procedure can be generalized to arbitrary ($\sigma$-finite) measure spaces to obtain a <b>(tensor) product</b> of measure spaces. The formulas above have the interpretation of the length of an interval (or volumne of a box). But what if instead of simply taking the values of the endpoints, we first apply a function $F:\mathbb{R}\rightarrow\mathbb{R}$? In this case, the expression becomes:

$$\lambda_F\bigl(]a,b]\bigr) := F(b)-F(a)\,.$$

To make this formula well-defined, we need $F$ to be right-continuous, i.e.

$$\lim_{\varepsilon\rightarrow0^+}F(x+\varepsilon) = F(x)$$

for all $x\in\mathbb{R}$. Moreover, to obtain a nonnegative and monotonic measure, we also need to require that $F$ is itself nonnegative and monotonic. But wait a minute! Do these equations not remind us of a well-known object from probability theory? Indeed, all <b>cumulative distribution functions</b> (CDFs) are exactly of this form. In the context of measure theory, these are called <b>Lebesgue&ndash;Stieltjes measures.
    
<div class = "note">
    <div class = "side">Note</div>
    Functions that are right-continuous and that admit all left limits are also said to be càdlàg (abbreviation of the French expression "<i>continue à droite, limite à gauche</i>"). It can be shown that càdlàg functions $F:\mathbb{R}\rightarrow[0,1]$ satisfying

    $$\lim_{x\rightarrow-\infty}F(x)=0\qquad\text{and}\qquad\lim_{x\rightarrow\infty}F(x)=1$$

    are equivalent to cumulative distribution functions on $\mathbb{R}$.
</div>

The fact that CDFs only need to be right-continuous, allows them to have jump discontinuities, i.e. isolated points where the value of the function suddenly changes in a discontinuous way. The measure of a singleton can be shown to be determined by exactly that jump:

$$\lambda_F(\\{x_0\\}) = F(x_0) - \lim_{\varepsilon\rightarrow0^+}F(x_0-\varepsilon)\,.$$

Singletons with nonzero measure are examples of <b id = "Atom">atoms</b>, sets with nonzero measure for which every proper subset has vanishing measure. (By classical arguments from calculus, it can be shown that all atoms of a Lebesgue&ndash;Stieltjes measure are necessarily singletons.) The Lebesgue measure does not have any atoms since it is induced by the identity function. More generally, for continuous CDFs, all singletons are <b id = "NullSet">null sets</b>, i.e. sets with measure zero. Null sets are in some sense the subsets that we can forget about when talking about a property in probabilistic terms. If a property holds everywhere, except for some null set, it is said to hold <b>almost everywhere</b> (<b>a.e.</b>) in measure theory or <b id = "AlmostSurely">almost surely</b> (<b>a.s.</b>) in probability theory.<br><br>

Now that the notion of an atom has been introduced, it is time to move to another class of examples, namely the <b>discrete probability measures</b>. Discrete probability measures are <b>atomic</b> in the sense that any measurable set of nonzero measure contains an atom. More specifically, discrete measures are of the form

$$\mu = \sum_{i=1}^{+\infty}\lambda_i\delta_{x_i}\,,$$

where all $\lambda_i\in\mathbb{R}^+$ and

$$
    \delta_{x_i}(A) := \mathbb{1}_A(x_i) =
    \begin{cases}
        1&\text{if } x_i\in A,\\
        0&\text{if } x_i\not\in A
    \end{cases}
$$

are so-called <b id = "DiracMeasure">Dirac measures</b>. Common examples of such measures are the Poisson and binomial distributions. By the normalization property of probability measures, every distribution on the (discrete) finite space $[k]$ can be represented as an element of the $(k-1)$-<b>simplex</b>

$$\Delta^{k-1} := \left\{x\in\mathbb{R}^k\,\middle\vert\,\sum_{i=1}^kx^i=1\right\}$$

in the following way:

$$\mu = \sum_{i=1}^kx^i\mathbb{1}_i\,.$$

As promised, there is one last important notion to be introduced, namely the functions between measurable spaces. To this end, consider two measurable spaces $(\mathcal{X},\Sigma_{\mathcal{X}})$ and $(\mathcal{Y},\Sigma_{\mathcal{Y}})$. Given a function $f:\mathcal{X}\rightarrow\mathcal{Y}$, it might be tempting to induce a $\sigma$-algebra on $\mathcal{Y}$ generated by the images $\\{f(A)\mid A\in\Sigma_{\mathcal{X}}\\}$. However, a set-theoretic problem arises at this point. To make this construction work, functions should preserve the operations defining a $\sigma$-algebra and, although empty sets and unions are preserved, complements are not: $f(A\backslash B)\neq f(A)\backslash f(B)$. This has as a consequence that we cannot 'pull back' measures from $\mathcal{Y}$ to $\mathcal{X}$ by the would-be definition

$$f^*\mu(A) := \mu\bigl(f(A)\bigr)\,.$$

Luckily, there is another possibility. The image might not preserve all required operations, but the preimage does, i.e. $f^\*\Sigma_{\mathcal{Y}}:=\\{f^{-1}(A)\mid A\in\Sigma_{\mathcal{Y}}\\}$ is a $\sigma$-algebra, where the <b id = "Preimage">preimage</b> is defined as follows:

$$f^{-1}(A) := \{x\in\mathcal{X}\mid f(x)\in A\}\,.$$

So, instead of pushing forward measurable sets and pulling back measures, we should work the other way around. This leads to the following definition.

<div class = "def" id = "MeasurableFunction" text = "Measurable function">
    Consider a function

    $$f:(\mathcal{X},\Sigma_{\mathcal{X}})\rightarrow(\mathcal{Y},\Sigma_{\mathcal{Y}})$$
    
    between measurable spaces. This function is itself said to be measurable if and only if the pullback $\sigma$-algebra $f^*\Sigma_{\mathcal{Y}}$ is a sub-$\sigma$-algebra of $\Sigma_{\mathcal{X}}$, i.e. if

    $$f^{-1}(A)\in\Sigma_{\mathcal{X}}\qquad\text{for all}\qquad A\in\Sigma_{\mathcal{Y}}\,.$$
</div>

Equipped with the measurable functions, we can now also transport measures between spaces.
<div class = "def" id = "Pushforward" text = "Pushforward">
    The pushforward of a measure $\mu$ on $\mathcal{X}$ along a measurable function $f:\mathcal{X}\rightarrow\mathcal{Y}$ is defined by

    $$f_\ast\mu(A) := \mu\bigl(f^{-1}(A)\bigr)\,.$$

    This is well defined, since by definition of measurability, $f^{-1}(A)$ is measurable in $\mathcal{X}$.
</div>

For completeness' sake, it is also worth mentioning that what is called a <b id = "RandomVariable">random variable</b> in probability theory, is simply a measurable function from a probability space into an arbitrary measurable space (e.g. $\mathbb{R}$ in the case of univariate regression). The distribution of a random variable $X:(\Omega,\Sigma,P)\rightarrow(\mathcal{X},\Sigma)$ is then defined as the pushforward of $P$ along this random variable:

$$P_X := X_\ast P\,.$$

<hr id = "Integration">
<div class = "nav-block"><div class = "side">Integration</div></div>

One of the most powerful benefits of measure theory is that it allows for a solid theory of integration that can even be applied to situations where the ordinary Riemann integral breaks down. We will not delve too deep into this subject, but some core ideas and notions are of importance to us. The idea behind Lebesgue integration is to approximate functions by so-called simple functions (this is the approach introduced by Daniell).

<div class = "def" id = "SimpleFunction" text = "Simple function">
    A function $f:\mathcal{X}\rightarrow\mathbb{R}^+$ of the form

    $$f(x) = \sum_{i=1}^na_i\mathbb{1}_{A_i}(x)$$

    for positive numbers $a_1,\ldots,a_n\in\mathbb{R}^+$ and disjoint (measurable) subsets $A_1,\ldots,A_n\in\Sigma_{\mathcal{X}}$. The <b id = "LebesgueIntegral">Lebesgue integral</b> of the simple function $f$ with respect to a measure $\mu$ on $(\mathcal{X},\Sigma_{\mathcal{X}})$ is defined as

    $$\int_{\mathcal{X}}f\, d\mu := \sum_{i=1}^na_i\mu(A_i)\,.$$
</div>

To define the integral for general measurable functions, we should show that any nonnegative measurable function can be approximated (pointwisely) by a sequence of simple functions and define the integral as the supremum of the integrals over all simple functions bounded from above by it.

<div class = "def" id = "IntegrableFunction" text = "Integrable function">
    A measurable function $f:\mathcal{X}\rightarrow\mathbb{R}$ is said to be (Lebesgue-)integrable with respect to a measure $\mu$ on $\mathcal{X}$ if both

    $$\int_{\mathcal{X}}f^+\,d\mu<+\infty$$

    and

    $$\int_{\mathcal{X}}f^-\,d\mu<+\infty$$

    hold, where $f^+:=\max(f,0)$ and $f^-:=\max(0,-f)$. If $f$ is integrable, its <b>(Lebesgue-)integral</b> is defined as

    $$\int_{\mathcal{X}}f\,d\mu := \int_{\mathcal{X}}f^+\,d\mu - \int_{\mathcal{X}}f^-\,d\mu\,.$$

    If only one of the two conditions holds, $f$ is said to be <b>quasiintegrable</b>.
</div>

<div class = "note">
    <div class = "side">Note</div>
    A crucial difference exists with the Riemannian case, where these conditions would imply <i>absolute integrability</i>, i.e.

    $$\int_{\mathcal{X}}|f|\,d\mu<+\infty\,.$$

    With Lebesgue integrals, positive and negative infinity cannot cancel each other out (even in the limiting sense). Measurable functions are integrable if and only if they are absolutely integrable. However, on a bounded interval, every Riemann-integrable function is also (Lebesgue-)integrable and the integrals coincide. Moreover, if the improper Riemann integral of a nonnegative function exists, it equals the Lebesgue integral of that function.<span markdown = "1">[^5]</span>
</div>

[^5]: The nonnegativity condition is crucial in this statement. There exist improper Riemann integrals for which there exists no Lebesgue counterpart.

We give a simple example of a situation where Riemann integration does not suffice. A theorem by Lebesgue says that a bounded function is Riemann-integrable exactly when its set of discontinuities is a null set, i.e. when it is almost everywhere continuous. The reason for this is that the Lebesgue measure is nonatomic: $\lambda(\\{x\\})=0$ for all $x\in\mathbb{R}$. We can change the value of a function at any countable collection of points without changing the value of its integral. However, many measures, such as the discrete probability distributions, are atomic, the simplest one being the <a href = "#DiracMeasure">Dirac measure</a> as introduced above. The integral with respect to this measure is particularly straightforward to calculate:

$$\int_{\mathbb{R}}f\,d\delta_x = f(x)\,.$$

This is one of the formulas that a physics student learns to accept without proper formal reasoning and where physicists have found all kinds of informal arguments and approximation methods because most refuse to accept any other integral besides the Riemann integral.<br><br>

<hr id = "Densities">
<div class = "nav-block"><div class = "side">Densities</div></div>

On many occasions, especially in probability theory, measures are given by summing a sequence or integrating a function. For example, the standard normal distribution admits such a \textbf{probability density function} (PDF):

$$\Phi(x) = \int_{-\infty}^x\frac{1}{\sqrt{2\pi}}\exp\left(-t^2/2\right)\,d t\,.$$

This situation is an example of a more general concept.
<div class = "def" id = "AbsoluteContinuity" text = "Absolute continuity">
    A measure $\nu$ on a measurable space $(\mathcal{X},\Sigma)$ is said to be absolutely continuous with respect to a measure $\mu$ on $(\mathcal{X},\Sigma)$ if

    $$\mu(A)=0\implies\nu(A)=0$$

    for all $A\in\Sigma$. This is often denoted by $\mu\gg\nu$.
</div>

The following very important result, the <b>Radon&ndash;Nikodym theorem</b>, states that absolutely continuous measures admit density functions. If $\mu$ and $\nu$ are ($\sigma$-)finite measures on a measurable space $(\mathcal{X},\Sigma)$ such that $\nu$ is absolutely continuous with respect to $\mu$, there exists a $\mu$-a.e. unique measurable function $f:\mathcal{X}\rightarrow[0,+\infty[$ such that

$$\nu(A) = \int_Af\,d\mu$$

for all $A\in\Sigma$. The function $f$ is called the <b>Radon&ndash;Nikodym derivative</b> and is sometimes denoted by $\frac{d\nu}{d\mu}$ in analogy to the ordinary derivative from calculus. This generalized notion of density function also allows us to treat <b>probability mass functions</b> (PMFs) on equal footing with their continuous counterparts. PMFs are simply the Radon&ndash;Nikodym derivatives of discrete probability measures with respect to the counting measure (on, for example, $\mathbb{Z}$), while PDFs are the derivatives with respect to the Lebesgue measure.<br><br>

Now, let $f:(\mathcal{X},\Sigma_{\mathcal{X}})\rightarrow(\mathcal{Y},\Sigma_{\mathcal{Y}})$ be a measurable function and consider a measure $\mu$ on $\mathcal{X}$. The following equality holds for all integrable functions $g:\mathcal{Y}\rightarrow\mathbb{R}$:

$$\int_{f^{-1}(\mathcal{Y})}(g\circ f)\,d\mu=\int_{\mathcal{Y}}g\,d(f_\ast\mu)\,.$$

This change-of-variables formula for absolutely continuous measures on $\mathbb{R}$ with Radon&ndash;Nikodym derivative $f_X:\mathbb{R}\rightarrow\mathbb{R}$ implies

$$f_{g_*X}(y) = f_X\left(g^{-1}(y)\right)\left|\frac{dg^{-1}}{dy}(y)\right|=\frac{f_X\left(g^{-1}(y)\right)}{\left|g'\bigl(g^{-1}(y)\bigr)\right|}$$

when $g:\mathbb{R}\rightarrow\mathbb{R}$ is invertible and

$$f_{g_*X}(y) = \sum_{x\in g^{-1}(y)}\frac{f_X(x)}{\left|g'(x)\right|}$$

in general. Recall for example the <a href = "#DiracMeasure">Dirac measure</a>. Under a pushforward along the function $f:\mathbb{R}\rightarrow\mathbb{R}$, it transforms as

$$\delta\bigl(f(x)\bigr) = \sum_{y\in f^{-1}(0)}\frac{\delta(x-y)}{\left|f'(y)\right|}\,.$$

Another consequence of the change-of-variables formula is the infamous <b>law of the unconscious statistician</b>. Let $g:\mathcal{X}\rightarrow\mathbb{R}$ be an integrable function and $X$ a random variable on $\mathcal{X}$.

$$\mathrm{E}\left[g(X)\right] = \int_{\mathcal{X}}g\,dP_X$$

<hr id = "ConditionalProbabilities">
<div class = "nav-block"><div class = "side">Conditional Probabilities</div></div>

Without going into too much detail, some things have to be said about the notion of conditional probabilities.
<div class = "def" id = "ConditionalProbability" text = "Conditional probability">
    Let $(\Omega,\Sigma,P)$ be a probability space. The conditional probability with respect to an event $A\in\Sigma$ is defined as follows:

    $$P(B\mid A) := \frac{P(A\cap B)}{P(A)}\,.$$

    Note that this formula is only well defined when $A$ is not $P$-null. A (partial) solution exists when it is possible to find sequences $(A_n)_{n\in\mathbb{N}}$ of measurable sets of strictly positive probability converging to $A$. In this case, we could define

    $$P(B\mid A) := \lim_{n\rightarrow\infty}P(B\mid A_n)\,.$$

    However, it can be shown that this does not lead to a well-defined probability distribution, since the resulting value will depend on the choice of sequence (cf. the <a href = "https://en.wikipedia.org/wiki/Borel%E2%80%93Kolmogorov_paradox" target = "_blank" rel = "noopener nofollow">Borel&ndash;Kolmogorov paradox</a>).
</div>

Whenever conditional probabilities exist, this definition immediately implies one of the most famous theorems in probability theory, <b id = "Bayes">Bayes' theorem<b>:

$$P(A\mid B)P(B) = P(B\mid A)P(A)$$

One way to express conditional probabilities, which closely follows our intuition, is by modelling them as parametrized probability distributions.
<div class = "def" text = "Markov kernel" id = "MarkovKernel">
    Consider two measurable spaces $(\mathcal{X},\Sigma_\mathcal{X})$ and $(\mathcal{Y},\Sigma_\mathcal{Y})$. A <b>Markov kernel</b> $\mathcal{X}\rightarrow\mathcal{Y}$ is a function $f:\Sigma_\mathcal{Y}\times\mathcal{X}\rightarrow[0,1]$ such that:

<div markdown = "1">

1. For every $A\in\Sigma_\mathcal{Y}$: $x\mapsto f(A\mid x)$ is measurable.
1. For every $x\in\mathcal{X}$: $A\mapsto f(A\mid x)$ is a probability measure.

</div>
    
    More concisely, a Markov kernel is a measurable function $\mathcal{X}\rightarrow\mathbb{P}(\mathcal{Y})$. If the second condition is relaxed to only requiring $f(\cdot\mid x)$ to be a measure, the notion of a <b>transition kernel</b> is obtained.
</div>

<!-- \subsection{Quantiles}

    \newdef{Quantiles}{\index{quantile}\index{Galois connection}\label{appendix:quantiles}
        To every cumulative distribution $F:\overline{\mathbb{R}}\rightarrow[0,1]$ we can assign a quantile function $Q:[0,1]\rightarrow\overline{\mathbb{R}}$. This function can be defined in two (equivalent) ways:
        \begin{itemize}
            \item As a lower bound:
            \begin{gather}
                \label{appendix:quantile}
                Q(\alpha) := \inf\bigl\\{x\in\overline{\mathbb{R}}\bigm\vert\alpha\leq F(x)\bigr\\}\,,
            \end{gather}
            \item or through a \textit{Galois connection}:
            \begin{gather}
                \label{appendix:galois}
                Q(\alpha)\leq x\iff\alpha\leq F(x)\,.
            \end{gather}
        \end{itemize}
        When $F$ is invertible, the quantile function is easily seen to be its inverse: $Q=F^{-1}$.

        For every $\alpha\in[0,1]$, we can also define the empirical quantile functions
        \begin{gather}
            \label{appendix:set_quantile}
            q_\alpha:\mathbb{R}^*\rightarrow\mathbb{R}
        \end{gather}
        that assign to every (multi)subset $S$ of $\mathbb{R}$ the value $Q_S(\alpha)$, where $Q_S$ is the quantile function of the empirical distribution of $S$. For a given sorted data set $\\{x_1,\ldots,x_n\\}$, the quantile function associated to the empirical distribution $\widehat{F}_n$ satisfies the following simple rule:
        \begin{gather}
            \label{appendix:empirical_quantile}
            \widehat{Q}_n(\alpha) := q_\alpha\bigl(\\{x_1,\ldots,x_n\\}\bigr) = x_{(\lceil n\alpha \rceil)}\,.
        \end{gather}
    }

\vfill

    \begin{example}[Median]\index{median}\label{appendix:median}
        The $0.5$-quantile of a cumulative distribution function $F$ is, by definition, given by the point smallest $x\in\mathbb{R}$ such that $F(x)\geq0.5$. This also means that it is the smallest real number such that at least 50\% of the points sampled from $F$ would be smaller than or equal to $x$.
    \end{example}

    Since conformal prediction relies heavily on the use of sample quantiles, the properties of this estimator are of relevance as well. Here, we only consider the most important one.
    \newdef{Consistency}{\index{consistency}\index{convergence}
        Consider a parameter $\theta\in\Theta$ of a distribution $P\in\mathbb{P}(\mathcal{X})$. An estimator $(T_n:\mathcal{X}^n\rightarrow\Theta)_{n\in\mathbb{N}}$ is said to be consistent for $\theta$ if $T_n$ \textbf{converges in probability} to $\theta$:
        \begin{gather}
            \lim_{n\rightarrow\infty}P_\theta^n\bigl(|T_n(X)-\theta|\geq\varepsilon\bigr) = 0
        \end{gather}
        for every $\varepsilon>0$.
    }

    \begin{property}[Sample quantiles]\label{appendix:quantile_consistency}
        Let $F$ be a cumulative distribution function and choose $\alpha\in[0,1]$. If $Q(\alpha)$ is unique in the sense that
        \begin{gather}
            F\bigl(Q(\alpha)+\varepsilon\bigr)>F\bigl(Q(\alpha)\bigr)
        \end{gather}
        for all $\varepsilon>0$, then the sample quantile $\widehat{Q}_n(\alpha)$ is a consistent estimator~\citep{zielinski_uniform_1998}. Moreover, if $F$ admits a density function $f$ in a neighbourhood around $Q(\alpha)$, the following result holds:
        \begin{gather*}
            \sqrt{n}\left(\widehat{Q}_n(\alpha)-Q(\alpha)\right)\overset{d}{\longrightarrow}\mathcal{N}\,\left(0, \frac{\alpha(1-\alpha)}{\left[f(Q(\alpha))\right]^2}\right)\,.
        \end{gather*}
    \end{property} -->

<hr id = "LawOfLargeNumbers">
<div class = "nav-block"><div class = "side">Law of Large Numbers</div></div>

Let $(X\_n)\_{n\in\mathbb{N}}$ be a sequence of i.i.d. random variables with expectation $\mu$.[^6]

$$\lim_{n\rightarrow\infty}\frac{1}{n}\sum_{i=0}^nX_i=\mu\qquad\text{a.s.}$$

[^6]: This is actually the <b>strong law of large numbers</b>, also known as <b>Kolmogorov's law</b>. The <i>weak law</i> (or <i>Kinchin's law</i>) states that this convergence holds in distribution.

Consider a sequence of i.i.d. random variables $(X\_n)\_{n\in\mathbb{N}}$ with distribution $P\in\mathbb{P}(\mathcal{X})$ and, for any $n\in\mathbb{N}$ and $x\in\mathcal{X}$, consider the random variable $\mathbb{1}_{]-\infty,x]}(X_n)$. Since

$$\mathrm{E}\left[\mathbb{1}_{]-\infty,x]}(X_n)\right] = P(X_n\leq x)\,,$$

the law of large numbers implies that

$$\lim_{n\rightarrow\infty}\frac{1}{n}\sum_{i=0}^n\mathbb{1}_{]-\infty,x]}(X_i)=P(X\leq x)\qquad\text{a.s.}$$

The average on the left-hand side is the empirical distribution function $\widehat{F}$. Hence, by the law of large numbers, the empirical distribution function converges to the true distribution function almost surely. In a similar way, for every $P$-integrable function $f:\mathcal{X}\rightarrow\mathcal{Y}$, the average over a large number of i.i.d. draws converges to the expectation value almost surely:

$$\lim_{n\rightarrow\infty}\frac{1}{n}\sum_{i=0}^nf(X_i)=\mathrm{E}_P[f]\qquad\text{a.s.}$$

This is the idea behind <i>Monte Carlo methods</i>!

<hr id = "References">
<div class = "nav-block"><div class = "side">References</div></div>

* Capiński, M., & Kopp, P. E. (2004). Measure, Integral and Probability (Vol. 14). Springer.

<br><br><br>

<hr id = "Footnotes">
<div class = "nav-block"><div class = "side">Footnotes</div></div>