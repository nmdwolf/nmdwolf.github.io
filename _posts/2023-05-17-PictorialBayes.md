---
layout: post
title:  "Pictorial Bayes"
date:   2023-05-17
categories: talk
publish: true
ids:
    - Overview
    - Probability
    - Diagrams
    - FiniteSets
    - Abstract Nonsense
    - Higher Dimensions
    - References
defs:
    - Category
    - Functor
    - Natural Transformation
    - Rigidity
    - Braiding
    - Monad
    - Measure
    - Measurable
    - Causality
    - Deterministic
    - Coupling
    - Conditional
    - Terminal
    - Modifier
    - Markov
    - Kleisli
    - Monoidal
---

This post contains the content of a talk, titled "Drawing pictures with Nico", that I gave for the Statistics Discussion Group at the Faculty of Bioscience Engineering (UGent). I have reworked parts of the talk and elaborated on many concepts. Moreover, I have added an 'optional' part at the end which puts everything within a much more abstract setting.

<hr id = "Overview">
<div class = "nav-block"><div class = "side">Overview</div></div>

The structure of the talk was as follows:
1. Short introduction on <i>probability theory</i>,
1. Diagrammatic methods for <i>Markov categories</i>,
1. <i>Rigidity</i> for finite sets,
1. Contexts as <i>categories</i>, and
1. Geometric ideas for higher mathematics.

<hr id = "Probability">
<div class = "nav-block"><div class = "side">Probability</div></div>

In most (applied) courses on probability theory and statistics, the definition of a probability distribution is given for either the case of finite sets or Euclidean spaces, without explicitly referencing the underlying structure. Moreover, many subtleties and possible problems are ignored. For a more complete introduction, see the appendix on <a href = "{% post_url 2020-02-01-AppendixMeasures %}">measure theory</a>.<br><br>

The first part of the talk consisted of a formal treatment by first considering the notion of event, and only then, introducing the collection of distributions compatible with these events. For an arbitrary set $\mathcal{X}$, a good choice of events, called <b>measurable subsets</b>, is given by the notion of <a href = "{% post_url 2020-02-01-AppendixMeasures %}#SigmaAlgebra">$\sigma$-algebras</a>.<br><br>

There exist two trivial examples:
* The trivial $\sigma$-algebra: $\Sigma_\text{trivial}:=\\{\emptyset,\mathcal{X}\\}$, and
* The discrete $\sigma$-algebra: $\Sigma_\text{disc}:=2^\mathcal{X}$.

The latter is, for example, the one used in the definition of discrete distributions. Note that these collections can be defined on any set, they do not use any structure on $\mathcal{X}$. On these $\sigma$-algebras, we can then define the notion of <a href = "{% post_url 2020-02-01-AppendixMeasures %}#Measure">(probability) measure</a> (or distribution). An important probability measure for this talk is the <a href = "{% post_url 2020-02-01-AppendixMeasures %}#DiracMeasure">Dirac measure</a>:

$$
    \delta_x(A) := \mathbb{1}_A(x) =
    \begin{cases}
        0&\text{if }x\not\in A\,,\\
        1&\text{if }x\in A\,.
    \end{cases}
$$

As with most mathematical structures, we like to consider functions that preserve the given structure. For measurable spaces, the correct notion is that of a <a href = "{% post_url 2020-02-01-AppendixMeasures %}#MeasurableFunction">measurable function</a>. The reason for using the preimage has to do with the definition of events. Disjoint unions are not preserved under (direct) images.<br><br>

<div class = "note">
    <div class = "side">Note</div>
    Equip the set of probability measures $\mathbb{P}(\mathcal{X})$ with the measurable structure <i>generated</i> by the evaluation functionals
    
    $$\mathrm{ev}_A:\mathbb{P}(\mathcal{X})\rightarrow\mathbb{R}:P\mapsto P(A)$$
    
    for all events $A\in\Sigma$. Since every measurable function $f:(\mathcal{X},\Sigma_\mathcal{X})\rightarrow(\mathcal{Y},\Sigma_\mathcal{Y})$ sends probability measures to probability measures:

    $$f_*:\mathbb{P}(\mathcal{X})\rightarrow\mathbb{P}(\mathcal{Y}):P\mapsto P\circ f^{-1}\,,$$

    the operation $\mathbb{P}$, which sends measurable spaces to sets of probability measures and functions to pushforwards, obtains the structure of a <i>monad</i>, the <b>Giry monad</b>.
</div>

<div class = "def" text = "Markov kernel">
    Consider two measurable spaces $(\mathcal{X},\Sigma_\mathcal{X})$ and $(\mathcal{Y},\Sigma_\mathcal{Y})$. A <b>Markov kernel</b> $\mathcal{X}\rightarrow\mathcal{Y}$ is a function $f:\Sigma_\mathcal{Y}\times\mathcal{X}\rightarrow[0,1]$ such that:

<div markdown = "1">

1. For every $A\in\Sigma_\mathcal{Y}$: $x\mapsto f(A\mid x)$ is measurable.
1. For every $x\in\mathcal{X}$: $A\mapsto f(A\mid x)$ is a probability measure.

</div>
    
    More concisely, a Markov kernel is a measurable function $\mathcal{X}\rightarrow\mathbb{P}(\mathcal{Y})$. If the second condition is relaxed to only requiring $f(\cdot\mid x)$ to be a measure, the notion of a <b>transition kernel</b> is obtained.
</div>

Some examples of kernels are:
1. Random walk: $p(i\mid j) := p\delta_{i,j+1} + (1-p)\delta_{i,j-1}$
    <center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/RandomWalk.webp" style = "width: 60%" class = "boxed">
    </center>
1. Identity function: $\mathbb{1}(i\mid j) := \delta_{i,j}$
    <center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Identity.webp" style = "width: 40%" class = "boxed">
    </center>
1. Measurable function: $f(i\mid j) := \delta_{i,f(j)}$
    <center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Measurable.webp" style = "width: 40%" class = "boxed">
    </center>

Integration (against a probability measure) will not be introduced in detail (even though it was necessary for this talk). Suffice it to say that it reduces to summation in the case of point masses (and discrete distributions) and to ordinary (Riemann) integrals in the case of density functions.

<hr id = "Diagrams">
<div class = "nav-block"><div class = "side">Diagrams</div></div>

The basic ingredients of any diagram are lines (or arrows):
<center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Arrow.webp" style = "width: 20%">
</center>
The convention in this post is that diagrams have to be read from <u>left to right</u>. The interpretation of arrows depends on the context:
* Set theory: functions $X\rightarrow Y$,
* Linear algebra: linear maps $X\rightarrow Y$, or
* Probability theory: Markov kernels $X\rightarrow\mathbb{P}(Y)$.

Probability measures, also called <b>states</b> in this setting, are arrows out of the one-element set $\mathbf{I}:=\\{\ast\\}$:
<center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/State.webp" style = "width: 15%">
</center>
Joint states are simply indicated by multiple outgoing lines:
<center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/JointState.webp" style = "width: 15%">
</center>

Given the above information, the context for a diagrammatic calculus can be fixed. The following notations will be used in the remainder:
* <b>Set</b>: Sets and ordinary functions,
* <b>Vect</b> (technically <b>FinVect</b>): (Finite-dimensional) vector spaces and linear maps,
* <b>Meas</b>: Measurable spaces and measurable functions,
* $\mathbf{Stoch}$: Probability spaces and Markov kernels,
* $\mathbf{BorelStoch}$: Borel probability spaces and Markov kernels, or
* $\mathbf{FinStoch}$: Finite probability spaces and Markov Kernels.

Concatenation of lines or arrows is, in general, given by a suitable notion of composition:
<center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Composition.webp" style = "width: 25%">
</center>
The interpretation, again, depends on the context:
* <b>Set</b>, <b>Vect</b> & <b>Meas</b>: function composition $g\circ f$, or
* $\mathbf{Stoch}$: <b>Chapman&ndash;Kolmogorov equation</b>
    \\[(g\circ f)(A\mid x) :=\int_\mathcal{Y}g(A\mid y)\,df(y\mid x)\,.\\]

Lines or arrows can also be combined in different ways:
* Parallel functions: $f\otimes g:\mathcal{X}\otimes\mathcal{X}'\rightarrow\mathcal{Y}'\otimes\mathcal{Y}'$
    <center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Parallel.webp" style = "width: 25%">
    </center>
* 'Braided' functions: $x\otimes x'\mapsto g(x')\otimes f(x)$
    <center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Braiding.webp" style = "width: 30%">
    </center>

Every measurable space $(\mathcal{X},\Sigma_{\mathcal{X}})$ admits two `structure morphisms':
* The <b>deletion map</b>: $\mathrm{del}_\mathcal{X}(x) := 1$
    <center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Dot.webp" style = "width: 15%">
    </center>
    which corresponds to integrating out a variable: $\displaystyle\int_\mathcal{Y}df(y\mid x)$
    <center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Integral.webp" style = "width: 25%">
    </center>
* The <b>copy map</b>: $\mathrm{copy}_\mathcal{X}(A\times B\mid x) := \delta_x(A)\delta_x(B)$
    <center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Comultiplication.webp" style = "width: 15%">
    </center>
    which corresponds to transporting a distribution on $\mathcal{X}$ to one on its diagonal embedding in $\mathcal{X}\otimes\mathcal{X}$.

These morphisms endow a probability space with the structure of an <i id = "Comonoid">(internal) comonoid</i>:
<center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Assoc1.webp" style = "width: 20%">
    =
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Assoc2.webp" style = "width: 20%">
</center>
and
<center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Dot1.webp" style = "width: 10%">
    =
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Line.webp" style = "width: 10%">
    =
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Dot2.webp" style = "width: 10%">
</center>

The idea behind comonoids can be understood by turning these diagrams around (i.e. 'inverting time'). The first equation is then simply the associativity of a multiplication map and the second equation is the unit law. (Sets with a multiplication map with these properties are also called <b>monoids</b>.) Such 'dual' definitions are a common occurrence in abstract parts of mathematics. It is a nice intuition to have!

Probability spaces are even <i>(co)commutative comonoids</i>:
<center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/BraidedComulti.webp" style = "width: 20%">
    =
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Comulti.webp" style = "width: 10%">
</center>
More generally, contexts $\mathbf{C}$ where the structure morphisms $\mathrm{del}$ and $\mathrm{copy}$ exist and satisfy the (co)commutative comonoid conditions are called <b>Markov categories</b> or <b>copy-discard (CD) categories</b>.<br><br>

Every set admits a unique comonoid structure with respect to the Cartesian product (which can also be thought of as a tensor product for which the unit is the one-element set $\mathbf{I}$):
* Delete morphism: unique function to $\mathbf{I}$.
* Copy morphism: diagonal embedding $x\mapsto(x,x)$.
Vector spaces do not admit this diagonal comonoid structure. Can you see why? (In physics, this gives rise to the <i>no-cloning theorem</i>!)

Using the above diagrammatic rules, various notions from probability theory can be represented. Some examples will be covered below.
<div class = "def" text = "Deterministic morphism" id = "Deterministic">
    A deterministic function should always give the same result for a fixed input. Diagrammatically this corresponds to:
    <center>
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Det1.webp" style = "width: 15%">
        =
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Det2.webp" style = "width: 15%">
    </center>
    An interesting question becomes: Are all deterministic functions in $\mathbf{Stoch}$ given by measurable functions? The answer is no in general! There are pathological counterexamples. However, the statement is true for $\mathbf{BorelStoch}$ and $\mathbf{FinStoch}$.
</div>

<div class = "def" text = "Causality" id = "Causality">
    If for all functions $f,g$ and $h_1,h_2$, the relation
    <center>
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Causal1.webp" style = "width: 25%">
        =
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Causal2.webp" style = "width: 25%">
    </center>
    implies
    <center>
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Causal3.webp" style = "width: 25%">
        =
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Causal4.webp" style = "width: 25%">
    </center>
    then the context $\mathbf{C}$ is said to be causal.
</div>

<div class = "def" text = "Conditional" id = "Conditional">
    The definition of conditional distributions in $\mathbf{Stoch}$ reads as
    $$P(A,B) = \int_A P(B\mid x)\,dP(x)\,.$$
    Diagrammatically, for any context $\mathbf{C}$, this becomes:
    <center>
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Joint.webp" style = "width: 10%">
        =
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Conditional.webp" style = "width: 20%">
    </center>
    The existence of conditionals is a subtle point. In $\mathbf{Stoch}$, conditionals coincide with the notion of <i>regular conditional distributions</i>. However, these do not exist for all joint distributions. When restricting to $\mathbf{BorelStoch}$ or $\mathbf{FinStoch}$, the situation is better behaved: all conditionals exist.<br><br>
    When working with states (or functions) of higher arity, e.g. a joint state on three variables, conditioning can be done in different ways. By 'simple' diagrammatic manipulations, the following property can be proven whenever $\mathbf{C}$ has all conditionals:
    <center>
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Iterated1.webp" style = "width: 30%">
        =
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Iterated2.webp" style = "width: 30%">
    </center>
    Just for fun, this is left as an exercise to the reader ;-) <br><br>
    Note that the definition of conditionals is not reserved to states $\mathbf{I}\rightarrow\mathcal{X}\otimes\mathcal{Y}$. It can be generalized to arbitrary functions $\mathcal{Z}\rightarrow\mathcal{X}\otimes\mathcal{Y}$:
    <center>
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Joint-f.webp" style = "width: 10%">
        =
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Conditional-f.webp" style = "width: 30%">
    </center>
</div>

<div class = "def" text = "Almost surely">
    Two functions $f,g:\mathcal{Y}\rightarrow\mathcal{Z}$ are said to be <b>$p$-almost surely equal</b>, for a function $p:\mathcal{X}\rightarrow\mathcal{Y}$, if
    $$f\circ p=g\circ p\,.$$
    Diagrammatically this becomes:
    <center>
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/AS1.webp" style = "width: 20%">
        =
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/AS2.webp" style = "width: 20%">
    </center>
</div>

<div class = "def" text = "Couplings" id = "Coupling">
    Let $\mathbf{C}$ be a causal context admitting all conditionals. Define a context <b>Stoch(C)</b> for which a <b>probability space</b> in $\mathbf{C}$ is a pair $(\mathcal{X},\psi)$ such that $\mathcal{X}$ is an object in $\mathbf{C}$ and $\psi:\textbf{I}\rightarrow\mathcal{X}$ a state, and for which a <b>kernel</b> $(\mathcal{X},\psi_X)\rightarrow(\mathcal{Y},\psi_Y)$ is a function $f:\mathcal{X}\rightarrow\mathcal{Y}$ in $\mathbf{C}$ such that $\psi_X$-almost surely $f\circ\psi_X=\psi_Y$. If $\textbf{C}=\textbf{Stoch}$, then <b>Stoch(C)</b> is given by the context of 'couplings' (or <i>copulas</i>), i.e. that of probability spaces and joint distributions that restrict to two given marginals.
</div>

<hr id = "FiniteSets">
<div class = "nav-block"><div class = "side">Finite Sets</div></div>

From here on, attention will be restricted to finite sets, i.e. we work in $\mathbf{FinStoch}$ (unless stated otherwise). These will be equipped with the discrete $\sigma$-algebra. In this case, (probability) measures are defined by their values at points and can be written as vectors. Moreover, kernels can be expressed as matrices. To allow for some more diagrammatic freedom, functions are generalized from Markov kernels to transition kernels, where the latter need only take values in the set of measures (which can be unnormalized).<br><br>

Every object $(\mathcal{X},\Sigma_{\mathcal{X}})$ admits the structure of an <i>(internal) monoid</i>:
* Unit map: $\varepsilon_\mathcal{X}(x) := 1$
    <center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/toD.webp" style = "width: 15%">
    </center>
* Multiplication map: $\mu_\mathcal{X}(x\mid i,j) := \delta_{i,x}\delta_{j,x}$
    <center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Multiplication.webp" style = "width: 15%">
    </center>

As before, this structure is commutative with respect to the (trivial) braiding. As noted in the previous section, the definition of a comonoid was dual to that of a monoid. This is clear when comparing the explicit formulas for the comultiplication and counit to the expressions above. The multiplication $\mu$ and unit $\varepsilon$, consequently, also satisfy the associativity condition and unit law. Finite probability space not only carry the structure of a monoid and comonoid, they are even compatible in an elegant way. Such objects are called <b>Frobenius monoids</b>:
<center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Frobenius1.webp" style = "width: 15%">
    =
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Frobenius2.webp" style = "width: 15%">
    =
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Frobenius3.webp" style = "width: 15%">
</center>

<div class = "def" text = "Modifier" id = "Modifier">
    The multiplication map allows us to turn states into arrows:
    <center>
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Modifier.webp" style = "width: 15%">
        =
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/ModifierExplicit.webp" style = "width: 15%">
    </center>
    The state can then be recovered through the unit map:
    <center>
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/State0.webp" style = "width: 10%">
        =
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/ModifierDot.webp" style = "width: 10%">
    </center>
    An <b>inverse modifier</b> is simply a functional inverse to a modifier:
    <center>
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Inverse1.webp" style = "width: 25%">
        =
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Line.webp" style = "width: 10%">
        =
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Inverse2.webp" style = "width: 25%">
    </center>
    These are given as follows:
    $$X^{-1}(i\mid j) = \frac{1}{X(i\mid j)} = \frac{\delta_{i,j}}{P_X(i)}\,.$$
    Further below, inverse modifiers will be used to express conditionals more explicitly.
</div>

Using the different structures on a finite probability space $(\mathcal{X},\Sigma_{\mathcal{X}})$, even more diagrammatic objects can be obtained:
* <b>Cups</b>:
    <center>
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/CupDot.webp" style = "width: 15%">
        =
        $\mathrm{coev}_\mathcal{X}(x,x') = \delta_{x,x'}$
    </center>
* <b>Caps</b>:
    <center>
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/CapDot.webp" style = "width: 15%">
        =
        $\mathrm{ev}_\mathcal{X}(x,x') = \delta_{x,x'}$
    </center>

The cup and cap give rise to a so-called <i>rigid</i> structure (see further below) because they satisfy the <b>triangle identities</b> or <b>yanking conditions</b>:
<center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Yanking1.webp" style = "width: 10%">
    =
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Line.webp" style = "width: 10%">
    =
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Yanking2.webp" style = "width: 10%">
</center>
The reason for the term 'yanking condition' stems from the fact that the bends in the lines can be 'yanked out'.<br><br>

Although the diagonal comultiplication does not exist for vector spaces, a rigid structure exists on finite-dimensional vector spaces. For a vector space $V$, choose a basis $\\{e_i\\}\_{i\leq\dim(V)}$ and denote its dual basis by $\\{e^i\\}\_{i\leq\dim(V)}$.
* Cup: $\mathrm{coev}\_V(\lambda) := \sum_{i=1}^{\dim(V)}\lambda e^i\otimes e\_i$.
* Cap: $\mathrm{ev}_V(e_j\otimes e^i) := e^i(e\_j) = \delta^i_j$.

As an example of diagrammatic calculus, the 'bubble diagram' gives the dimension of the vector space (more generally, the trace of a linear map):
<center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Bubble.webp" style = "width: 10%">
    =
    $\sum_{i=1}^{\dim(V)} e^i(e_i) = \sum_{i=1}^{\dim(V)}\delta^i_i = \dim(V)\,.$
</center>
These constructions, and their extensions to <i>superspaces</i>, are also of importance in theoretical physics! (I might write more about this in a future post.)<br><br>

Using the cup and cap, we can also express the transposition of linear maps:
<center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Map.webp" style = "width: 15%">
    =
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Transpose.webp" style = "width: 10%">
</center>
Again, the proof is left as an exercise to the reader. It can easily be obtained using the expressions introduced above ;-)
<br><br>
The cups and caps of finite probability spaces can be altered using the (inverse) modifiers:
<center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/ModCup.webp" style = "width: 5%">
    =
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/CupX.webp" style = "width: 10%">
</center>
and
<center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/ModCap.webp" style = "width: 5%">
    =
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/CapX.webp" style = "width: 10%">
</center>
With the modified caps, the conditionals can be given a more explicit expression, which closely resembles the equational definition:
<center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/ConditionalModifier.webp" style = "width: 20%">
    =
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/ConditionalCap.webp" style = "width: 15%">
</center>
In the context of linear algebra, it was shown how the cups and caps allow us to express transposition by bending lines around. Using the modified cups and caps, transposition of a conditional in $\mathbf{FinStoch}$ gives Bayes' theorem:
<center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/ConditionalModifier.webp" style = "width: 20%">
    =
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Bayes.webp" style = "width: 15%">
</center>

<hr id = "AbstractNonsense">
<div class = "nav-block"><div class = "side">Abstract Nonsense</div></div>

The previous sections should have given an idea of how diagrammatic tools can be used to study vastly different areas of mathematics and science. The reason that this is possible is not a mere coincidence. What were called 'contexts' and, more specifically, the specific contexts that were considered, all share the same structure. This section aims to introduce the terminology used to describe these structures.

<div class = "def" text = "Category" id = "Category">
A category $\mathbf{C}$ consists of two collections (in practice, these are often sets):
<div markdown = "1">
1. <b>Objects</b>: $\mathrm{ob}(\mathbf{C})$, and
1. <b>Morphisms</b>: $\mathrm{hom}(\textbf{C})$.
</div>

The collection of morphisms between two object $X,Y\in\mathrm{ob}(\mathbf{C})$ is denoted by $\hom_{\mathbf{C}}(X,Y)$ or $\mathbf{C}(X,Y)$. Morphisms $f\in\mathbf{C}(X,Y)$ are represented by arrows or lines and concatenation of lines corresponds to composition of morphisms. Hence, for the most basic diagrams, only the structure of a category is required.<br><br>

These should satisfy the following conditions:
<div markdown = "1">
1. <b>Identity</b>: For all $X\in\mathrm{ob}(\mathbf{C})$, there exists an identity morphism $\mathbb{1}_X\in\mathbf{C}(X,X)$.
1. <b>Associativity</b>: $f\circ(g\circ h) = (f\circ g)\circ h$, whenever the compositions are well-defined.
</div>
</div>

Some examples were already given after the introduction of 'lines'. Some more exotic examples are (the first 2/3 are a good exercise for drawing diagrams):
* Every <i>poset</i> (partially ordered set) is a category, where a unique morphism $x\rightarrow y$ exists whenever $x\leq y$.
* Every directed graph defines a category. (The <i>free category</i> generated by that graph.)
* The category <b>Cat</b> of <i>small categories</i>, i.e. those where $\mathrm{ob}(\mathbf{C})$ and $\mathrm{hom}(\mathbf{C})$ are sets. (The morphisms are defined below.)
* The <i>representations</i> of a (finite) group with <i>intertwiners</i> (equivariant functions) as morphisms.

Just as there are functions between sets, there are also operations between categories.
<div class = "def" text = "Functor" id = "Functor">
An operation $F:\mathbf{C}\rightarrow\mathbf{D}$ between categories such that:
<div markdown = "1">
1. $F$ maps objects $X$ to objects $FX$.
1. $F$ maps morphisms $X\rightarrow Y$ to morphisms $FX\rightarrow FY$.
1. $F$ preserves composition.
</div>
</div>

The Giry monad that assigns probability measures to measurable spaces was the first example of a functor. Some other examples are:
* The power set functor $P:\textbf{Set}\rightarrow\textbf{Set}$, which assigns power sets and (pre)images.
* The <i>Yoneda embedding</i> of an object $X\in\mathrm{ob}(\mathbf{C})$, which assigns to every other object $Y\in\mathrm{ob}(\mathbf{C})$ the morphisms $\mathbf{C}(Y,X)$. Morphisms $f$ are mapped to precompositions $-\circ f$.

The second example is one of the most foundational constructions in category theory!<br><br>

We can also define morphisms $\kappa:F\Rightarrow G$ between functors.
<div class = "def" text = "Natural transformation" id = "NaturalTransformation">
    A natural transformation $\kappa:F\Rightarrow G$ is a collection $\\{\kappa_X:FX\rightarrow GX\\}_{X\in\mathrm{ob}(\mathbf{C})}$ of morphisms such that the following commutative diagram holds for any two objects $X,Y\in\mathrm{ob}(\mathbf{C})$:
    <center>
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Nat.webp" style = "width: 20%">
    </center>
    These transformations are also sometimes denoted by generic indices: $\kappa_X:FX\rightarrow GX$.
</div>

Some (technical) examples are (some other examples will pop up in the next few sections):
* The identity natural transformation $F\Rightarrow F$.
* Double duals: there exists a natural transformation $\eta\_{V}:V\rightarrow V^{\*\*}$ for finite-dimensional vector spaces. (For the single dual $V\rightarrow V^*$, the transformation is 'unnatural' since it requires a choice of basis.)
* For any morphism $f:X\rightarrow Y$ there exists a natural transformation between the Yoneda embeddings of $X$ and $Y$. This is given by postcomposition $f\circ -$.

Whereas objects are represented by vertices and morphisms by lines in a diagrammatic calculus, natural transformations could be represented by filling in the area between two parallel functors (parallel here means that they have the same domain and codomain). This extension of diagrams to higher-dimensional structures will play a role at the end of this talk.<br><br>

To express parallel objects and morphisms, the structure of a tensor product needs to exist.
<div class = "def" text = "Monoidal category" id = "Monoidal">
A category $\mathbf{C}$ equipped with a (<i>bi</i>)functor $\otimes:\mathbf{C}\times\mathbf{C}\rightarrow\mathbf{C}$ and a unit object $\mathbf{I}\in\mathrm{ob}(\mathbf{C})$ satisfying the monoid conditions:
<div markdown = "1">
1. Associativity: $X\otimes(Y\otimes Z)=(X\otimes Y)\otimes Z$\pause, and
1. Unit: $X\otimes\mathbf{I}=X=\mathbf{I}\otimes X$.
</div>
In general, the associativity and unit conditions can be weakened up to a natural transformation. This will be reconsidered at the end.
</div>

In some monoidal categories, the tensor product is symmetric in a certain sense.
<div class = "def" text = "Braiding" id = "Braiding">
    A natural transformation $\sigma_{X,Y}:X\otimes Y\rightarrow Y\otimes X$. If $\sigma_{X,Y}\circ \sigma_{Y,X}=\mathbb{1}_{Y\otimes X}$, the braiding is said to be <b>symmetric</b>.
    <center>
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/BraidUp.webp" style = "width: 25%">
        =
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/BraidDown.webp" style = "width: 25%">
        =
        <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Braid.webp" style = "width: 25%">
    </center>
    An example of a monoidal category that is not symmetric is given by the <i>braid category</i>. (This is basically the category generated by lines and crossings.) 
</div>

For cups and caps, another structure is required.
<div class = "def" text = "Rigid category" id = "Rigidity">
    A monoidal category $\mathbf{C}$ such that for every object $X\in\mathrm{ob}(\mathbf{C})$ there exists a <b>dual</b> $X^*\in\mathrm{ob}(\mathbf{C})$ together with two natural transformations $\mathrm{coev}_X:\mathbf{I}\rightarrow X^*\otimes X$ and $\mathrm{ev}_X:X\otimes X^*\rightarrow\mathbf{I}$ satisfying the yanking conditions. A category for which rigidity fails to hold, although duals exist in the algebraic sense, is that of infinite-dimensional vector spaces. (Can you figure out why?)
</div>

It is time to relate the categorical notions to the sections on probability theory. Only one piece of data is still missing.
<div class = "def" text = "Terminal object" id = "Terminal">
    An object $1\in\mathrm{ob}(\mathbf{C})$ such that for every other object $X\in\mathrm{ob}(\mathbf{C})$, there is a unique morphism $X\rightarrow1$.
</div>

Putting everything together gives the central object of 'categorical probability theory'. 
<div class = "def" text = "Markov category" id = "Markov">
    A symmetric monoidal category with terminal monoidal unit such that every object admits the structure of an internal commutative comonoid.
</div>

To model morphisms such as Markov kernels, some more structure is needed.
<div class = "def" text = "Kleisli category" id = "Kleisli">
Consider a <b id = "Monad">monad</b>, i.e. a functor $T:\mathbf{C}\rightarrow\mathbf{C}$ with multiplication $\mu:T^2\Rightarrow T$ and unit $\mu:\mathrm{id}\Rightarrow T$ (which satisfy the dual diagrammatic properties of <a href = "#Comonoid">comonoids</a>). The <b>Kleisli category</b> $\mathrm{Kl}(T)$ has:
<div markdown = "1">
1. Objects: $\mathrm{ob}\bigl(\mathrm{Kl}(T)\bigr):=\mathrm{ob}(\mathbf{C})$, and
1. Morphisms: $\hom_{\mathrm{Kl}(T)}(X,Y):=\hom_{\mathbf{C}}(X,TY)$.
</div>
The morphisms $X\rightarrow TY$ are called <b>Kleisli morphisms</b> $X\rightarrow Y$. When $T=\mathbb{P}$ is the Giry monad, the Kleisli morphisms are exactly the Markov kernels.
</div>

All this data probably looks rather scary and technical (it is). However, it is more useful than it might appear. Many effects in computer science can be modelled using monads and Kleisli morphisms. Almost any process with 'side effects' such as I/O operations can be modelled using a monad. (People that use Haskell love this stuff.)<br><br>

If $\mathbf{C}$ is a Markov category and $T:\mathbf{C}\rightarrow\mathbf{C}$ is a monad that preserves the product and unit, $\mathrm{Kl}(T)$ is again a Markov category. Moreover, on any Cartesian monoidal category, i.e. a category where the monoidal structure is given by the Cartesian product such as in $\mathbf{Set}$, every object has a unique comonoid structure (diagonal embedding $\mu:x\mapsto x\times x$). The Giry monad $\mathbb{P}$ preserves this structure and, hence, induces a Kleisli category $\mathrm{Kl}(\mathbb{P})$ that is Markov. This is exactly the category $\mathbf{Stoch}$ of Markov kernels from before (hence the name).

<hr id = "HigherDimensions">
<div class = "nav-block"><div class = "side">Higher Dimensions</div></div>

(<i>Small</i>) Categories can be built up geometrically from triangles. This follows from the fact that for any two composable morphisms, we obtain the following diagram
<center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/Simplex.webp" style = "width: 20%">
</center>
By pasting all these triangles along shared edges, (<i>small</i>) categories can be represented as <i>simplicial complexes</i>. (A <i>simplex</i> is a higher-dimensional generalization of a triangle.) If instead of being exactly equal, composition is only defined up to some higher-dimensional morphisms, a <i>2-morphism</i>, the notion of <i>quasicategory</i> is obtained. This corresponds to filling in the triangles:
<center>
    <img src = "{{site.baseurl}}/assets/figures/PictorialBayes/SimplexAlpha.webp" style = "width: 20%">
</center>
In a similar way, we could fill in pyramids (3-simplices) by 3-morphisms and so on.

<div class = "note">
    <div class = "side">Note</div>
    This might all sound very exotic, but it is not as crazy as it sounds. Consider for example the setting of quantum mechanics. If $|\psi\rangle$ is the state vector of a system, then $\alpha|\psi\rangle$ represents the same system. Hence, an operator $\mathcal{O}$ might act nontrivially (mathematically), but still give rise to the same physical state, i.e. there exists a 2-morphism $\mathcal{O}\Rightarrow\mathbb{1}$. The possibility of (symmetry) operations acting in a (mathematically) nontrivial way, but giving rise to physically indistinguishable situations has given rise to a rich field (both in physics and mathematics) called <b>gauge theory</b>. Because of these insights and the strong geometric intuition gained in the previous century, people are trying to rewrite and generalize mathematics in geometric (and <i>homotopic</i>) terms. (Some of this will be explained in a future post.)
</div>

<hr id = "References">
<div class = "nav-block"><div class = "side">References</div></div>

* Capiński, Marek, and Peter E. Kopp. (2004). <i>Measure, integral and probability.</i> Vol. 14. Springer.
* Fritz, Tobias. (2020). <i>A synthetic approach to Markov kernels, conditional independence and theorems on sufficient statistics.</i> Advances in Mathematics 370: 107239.
* Coecke, Bob, and Robert W. Spekkens. (2012). <i>Picturing classical and quantum Bayesian inference.</i> Synthese 186: 651&ndash;696.
* <a href = "http://ncatlab.org/nlab/" target = "_blank" rel = "noopener">$n$Lab</a>