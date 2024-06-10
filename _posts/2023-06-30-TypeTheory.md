---
layout: post
title:  "A new language for science and philosophy"
date:   2023-06-30
categories: talk
publish: true
ongoing: true
ids:
    - Overview
    - Typing
    - Computational Trilogy
    - Type Theory
    - Modalities
    - HoTT
    - References
    - Footnotes
defs:
    - Adjoints
    - Computational Trilogy
    - Type
    - Term
    - Natural Deduction
---

This post contains the content of a talk, titled "A new language for science and philosophy", that I gave for the Science Cafe at the Faculty of Bioscience Engineering (UGent). This talk was born after reading the book "Modal homotopy type theory: The prospect of a new logic for philosophy" by David Corfield and, although most people in the audience might have felt like they got struck by hammer (a lot of information in an arguably too short time frame), I had a lot of fun preparing and giving it.

<hr id = "Overview">
<div class = "nav-block"><div class = "side">Overview</div></div>

The structure of the talk was as follows:
* What is typing?
* Why is it useful?
* What is type theory?
* How to incorporate 'modalities'?
* What does the future bring?

<hr id = "Typing">
<div class = "nav-block"><div class = "side">Typing</div></div>

Most people have seen two types of programming languages:
* Weakly typed: variables have no apparent types and weird stuff can happen.
* Strongly typed: variables have `fixed' types and operations can only be applied to predetermined types.

<div class = "note">
<div class = "side">Note</div>
    In the remainder of the post, static typing is assumed.
</div>

An example would be: (type casting is left aside)<br><br>

<div style = "display: grid; justify-items: center">
    <div style = "grid-column-start: 1">
        Weak typing:<br><br>
        $\mathrm{var}\ a := 5$<br>
        $\mathrm{var}\ b := \text{tree}$<br>
        $\mathrm{print}(a+b)$<br><br>

        <u>Output:</u> Unknown
    </div>
    <div style = "grid-column-start: 2">
        Strong typing:<br><br>
        $\mathrm{int}\ a := 5$<br>
        $\mathrm{String}\ b := \text{tree}$<br>
        $\mathrm{print}(a+b)$<br><br>
        <u>Output:</u> Error!
    </div>
</div>

<br>The main question at this point is probably: "How does this connect to science and philosophy?" Type systems can actually be used to give an alternative approach to:
* computer science
* logic
* mathematics
* (science) philosophy
* physics
* ...

<hr id = "ComputationalTrilogy">
<div class = "nav-block"><div class = "side">Computational Trilogy</div></div>

An important relation is the so-called <b>computational trinitarianism</b>. It extends the 'propositions-as-types' and 'programs-as-proofs' paradigms by Curry and Howard.
<center>
    <img src = "{{site.baseurl}}/assets/figures/TypeTheory/Trilogy.png" style = "width: 40%">
</center>

Most programming languages are <i>imperative</i>, i.e. they consist of chains of commands that alter the state of the program. Functional languages on the other hand work in a completely different manner. The commands are replaced by declarations and chains of functions. Church's $\lambda$-calculus gives a formal model for functional calculus.<br><br>

In 'ordinary' logic, some important assumptions are often lurking in the background, e.g. the <i>axiom of choice</i> or the <i>law of excluded middle</i>. However, these are just axioms! They do not have to hold. Intuitionistic (or constructive) logic is a form of logic where these are weakened, e.g.:

$$\phi\lor\lnot\phi\ \ \text{and}\ \ \lnot\lnot\phi\vdash\phi\ \ \text{do not hold!}$$

As a consequence, to prove a theorem, an explicit proof or construction needs to be provided.<br><br>

In the post on diagrammatic calculus, the notion of a <a href = "{% post_url 2023-05-17-PictorialBayes %}#Category">category</a> was introduced. Some relevant examples are:
* Sets and functions,
* vector spaces and linear maps,
* elements of (partially) ordered sets and order relations between them, and
* groups represented as one-object categories with group elements as morphisms.

<hr id = "TypeTheory">
<div class = "nav-block"><div class = "side">Type Theory</div></div>

The logical side of the trinity is given by <i>(Martin-Löf) dependent type theory</i>:
* Propositions, classes, data structures, ... are represented by <b id = "Type">types</b>.
* Specific proofs, objects or variables are represented by <b id = "Term">terms</b> (of a given type).

Some examples are:

$$\text{square}:\text{Shape}\qquad 2:\mathbb{N}\qquad\text{LSTM}:\text{Model}$$

The modifier '<i>dependent</i>' indicates that types can depend on other ones. This corresponds to propositions or programs depending on a <i>context</i>.<br><br>

In contrast to Hilbert-style reasoning, type theory uses <b id = "NaturalDeduction">natural deduction</b>:
* <b>Formation:</b> Requirements for defining the type. <i>(Constructor signature)</i>
* <b>Introduction:</b> Explicit construction of a term. <i>(Constructor implementation)</i>
* <b>Elimination:</b> How terms can be used. <i>(Function signature)</i>
* <b>Computation:</b> Explicit implementation of elimination rule for constructors. <i>(Function implementation)</i>

A (simple) example of the natural deduction rules is given by the product type:
* Formation: $A,B:\mathrm{Type}\vdash A\times B:\mathrm{Type}$,
* Introduction: $a:A,b:B\vdash (a,b):A\times B$,
* Elimination: $p:A\times B\vdash \pi_1(p):A,\pi_2(p):B$, and
* Computation: $a:A,b:B\vdash\pi_1(a,b)\equiv a, \pi_2(a,b)\equiv b$.

<div class = "note">
<div class = "side">Note</div>
A standard problem in formal language modelling is the notion of 'donkey sentences' such as "Every farmer that owns a donkey, beats it". Set-theoretic treatments of such sentences fail without rephrasing the sentence:
<div markdown = "1">
* $\forall x\bigl(\mathrm{isFarmer}(x)\land\exists y\bigl(\mathrm{isDonkey}(y)\land\mathrm{owns}(x,y)\bigr)\rightarrow\mathrm{beats}(x,y)\bigr)$<br>
    The issue here is that <span style = "color:red">$y$ is unbound</span>.<br><br>
* $\forall x\bigl(\mathrm{isFarmer}(x)\land\exists y\bigl(\mathrm{isDonkey}(y)\land\mathrm{owns}(x,y)\rightarrow\mathrm{beats}(x,y)\bigr)\bigr)$<br>
    The issue here is that <span style = "color:red">any non-donkey $y$ satisfies this formula</span>.
</div>

Type-theoretic model:

$$\prod_{z:\Sigma_{f:\mathrm{Farmer}}\Sigma_{d:\mathrm{Donkey}}\mathrm{Beats}(f,d)}\mathrm{Rides}\bigl(\pi_1(z),\pi_1(\pi_2(z))\bigr)\,.$$

</div>

<hr id = "Modalities">
<div class = "nav-block"><div class = "side">Modal Logic</div></div>

Modal logic is a more subtle form of logic where propositions can hold in a 'specific way'. For example, in <b>epistemic</b> (or <b>alethic</b>) logic, there exist the <b>necessity</b> $\square$ and <b>possibility</b> $\diamond$ modalities. $\square P$ means that $P$ nececessarily holds and $\diamond P$ means that $P$ possibly holds. These satisfy some conditions such as $\square P\vdash\square\square P$ and $\square P\vdash P$.[^1]

[^1]: An interpretation of these operators is given by <i>Kripke's possible world semantics</i>.

<div class = "def" text = "Adjoints" id = "Adjoint">

Consider two <a href = "{% post_url 2023-05-17-PictorialBayes %}#Functor">functors</a> $F:\mathbf{C}\rightarrow\mathbf{D}$ and $G:\mathbf{D}\rightarrow\mathbf{C}$, i.e. maps between categories that send objects to objects and morphisms to morphisms. These are said to be adjoint if morphism are mapped in a bijective manner, i.e.

$$\mathbf{D}(Fc,d)\cong\mathbf{C}(c,Gd)\,.$$

This relation is denoted by $F\dashv G$.

</div>

A simple example of adjoint functors is given by a <i>Galois connection</i> such as that formed by quantile functions and CDFs:

$$Q(x)\leq y\qquad\iff\qquad x\leq F(y)\,.$$

For (partially) ordered sets, an arrow $x\rightarrow x'$ corresponds to an ordering $x\leq x'$. Another example is given by <i>currying</i>:

$$\mathrm{Func}(A\times B,C)\cong\mathrm{Func}\bigl(A,\mathrm{Func}(B,C)\bigr)\,.$$

Functions from a product set are equivalent to parametrized functions.<br><br>

Recall the notion of a <a href = "{% post_url 2023-05-17-PictorialBayes %}#Monad">monad</a>. When $F\dashv G$ are adjoints, the composite $G\circ F$ is a monad (the other composite $F\circ G$ is a so-called <i>comonad</i>). An example of a monad that arises as the composition of adjoint functors is the <b>List monad</b>.[^2] This monad assigns to a set $S$ the set of all lists over it:
* $\mathrm{List}\,S := \\{\text{all lists of elements of }S\\}$.
* $\mathrm{List}\,f$ applies $f:S\rightarrow T$ to all elements of a list.
* $\eta_S$ creates singleton lists: $x\mapsto (x)$.
* $\mu_S$ flattens nested lists: $((a),(b),(x, y, z))\mapsto(a,b,x,y,z)$.

[^2]: The adjoint functors are the forgetful functor, which sends a monoid to its underlying set, and the free monoid functor, which sends a set to its <i>free monoid</i>.

Motivated by Hegel's "Wissenschaft der Logik", Lawvere axiomatized parts of logic and philosophy using <i>adjoint modalities</i>. Adjoints resemble and can be used to formalize the idea of oppositions (<i>thesis</i> and <i>antithesis</i>). The possibility $\circ$ and necessity $\diamond$ from epistemic logic form a good example here. (The monad morphisms correspond to the axioms of <i>S4 modal logic</i>.) Another example is the Hegelian opposition of <b>nothing</b> and <b>pure being</b>:

$$\emptyset\dashv\ast\,.$$

The functor $\emptyset$ sends any set to the empty set and $\ast$ sends any set to 'the' one-element set $\{\ast\}$. As for every adjoint, the (co)unit morphisms for any set $X$ can be put in a sequence:

$$\emptyset\rightarrow X\rightarrow\{\ast\}\,.$$

This corresponds to Hegel's quote "There is nothing which is not an intermediate state between being and nothing."<br><br>

Certain categories admit a chain of adjoints. Consider the situation of geometric structures:

$$\mathrm{Disc}\dashv\Gamma\dashv\mathrm{coDisc}\,,$$

with the outer functors going from sets to 'geometric spaces' (e.g. <i>manifolds</i> or <i>topological spaces</i>) as follows:
* $\mathrm{Disc}$ creates spaces with <i>discrete</i> structure (no <i>cohesion</i>).
* $\Gamma$ sends a space to its 'underlying set' of points.
* $\mathrm{coDisc}$ creates spaces with <i>codiscrete</i> structure (a blob).

These induce adjoint modalities

$$\flat\dashv\sharp := \mathrm{Disc}\circ\Gamma\dashv\mathrm{coDisc}\circ\Gamma\,.$$

By considering spaces with more structure, such as <i>superspaces</i> or <i>infinitesimal spaces</i>, even longer chains can be found. The induced modalities encode many important phenomena such PDEs, differential operators, differential geometry, ...

<hr id = "HoTT">
<div class = "nav-block"><div class = "side">HoTT</div></div>

The motivating example is (classical) <i>homotopy theory</i>. Consider the following lines:
<center>
    <img src = "{{site.baseurl}}/assets/figures/TypeTheory/Homotopy.png" style = "width: 15%">
</center>
These lines are equal up to continuous deformations. They are 'equal' for many (mathematical) purposes. Two curves not being <i>homotopic</i> gives us information about global structures such as holes, disconnected pieces, ...

Homotopy is relevant for type theory through the following observation. For any type $A:\mathrm{Type}$, there exist identity types:

$$a,a':A\vdash (a=_Aa'):\mathrm{Type}\,.$$

But there also exist equivalences (isomorphisms, <i>homotopies</i>, <i>weak equivalences</i>, ...):

$$a,a':A\vdash (a\simeq_Aa'):\mathrm{Type}\,.$$

The <b>univalence axiom</b> says that

$$(a=_Aa')\simeq_\mathrm{Type}(a\simeq_Aa')\,.$$

This axiom establishes the homotopic nature of the theory! But what about iterated identity types $p=_{a=_Aa'}q$? Diagramatically these are given by:
<center>
    <img src = "{{site.baseurl}}/assets/figures/TypeTheory/IteratedIdentity.png" style = "width: 15%">
</center>
As in the <a href = "{% post_url 2023-05-17-PictorialBayes %}#HigherDimensions">section on higher dimensions</a> in the study of diagrammatic calculus, these higher diagrams induced by iterated identity types also indicate that we should pass from ordinary category theory to <i>$\infty$-category theory</i> (or, when including logic, <i>$\infty$-topos theory</i>). If the identities/equivalences are seen as morphisms between objects, higher identities can be seen as morphisms between morphisms (and so on). These are called <i>$n$-morphisms</i> in higher category theory. If all higher morphisms are equivalences, an <b>$(\infty,1)$-category</b> is obtained. The term 'topos' indicates that one can treat the objects in the category as some kind of generalized set.<br><br>

For modern physics and geometry, some extra ingredients are required on top of mere sets:
* Spaces of physical objects (particles, fields, ...),
* <i>Locality</i>: the physical behaviour only depends on local information, and
* <i>Gauge principle</i>: two indistinguishable objects are not necessarily identical (symmetries do not necessarily act trivially in the mathematical formalism).

Combining these requirement leads to the following structures:
* Locality implies that the objects are <i>sheaves</i> and, more generally, <i>($\infty$-)stacks</i>.
* Gauge principle implies that these are valued in <i>($\infty$-)groupoids</i>, i.e. the symmetry transformations are invertible up to higher equivalences.

These objects form the prototypical example of an <i>$(\infty,1)$-topoi</i>.<br><br>

Consider the category $\mathbf{Set}$. For every proposition $P$ about elements of a set $S$, there exists a <i>characteristic function</i> $\chi_P:S\rightarrow\{0,1\}$. This gives the function space $\mathrm{Func}\bigl(S,\{0,1\}\bigr)$ the structure of a <i>Boolean algebra</i> and, hence, it has a form of logic. For <i>$(\infty,1)$-topoi</i> there exists a similar (internal) logic: homotopy type theory! For example, if the objects are chosen to form a suitable generalization of vector spaces and linear algebra, a language for quantum computing is recovered.

<hr id = "References">
<div class = "nav-block"><div class = "side">References</div></div>

* Corfield, David. (2020). Modal homotopy type theory: The prospect of a new logic for philosophy. Oxford University Press.
* The Univalent Foundations Program. (2013). Homotopy type theory: Univalent foundations of Mathematics. Institute for Advanced Study.
* <a href = "http://ncatlab.org/nlab/" target = "_blank">$n$Lab</a>
* Many years of struggling.

<hr id = "Footnotes">
<div class = "nav-block"><div class = "side">Footnotes</div></div>