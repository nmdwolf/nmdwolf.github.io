---
layout: post
title:  "Public PhD Defense"
date:   2024-04-25
categories: talk
publish: true
ongoing: false
ids:
    - Introduction
    - Marginal Validity
    - Conditional Validity
    - Clusterwise Validity
    - Extra
    - References
    - Footnotes
defs:
    - Confidence Predictor
    - Epistemic
    - Exchangeability
    - Pivot
---

This post contains the content of my PhD defense, together with some extra information and (personal) ideas for further work.


<hr id = "Introduction">
<div class = "nav-block"><div class = "side">Introduction</div></div>

Uncertainty is a fundamental notion, both in our daily lives and in science. Sadly, whereas it was or prime importance on statistics, it has become a secondary notion in current-day computational data science. <i>Conformal prediction</i> tries to fix this issue.<br><br>

However, before introducing the concept of conformal prediction. Let us take a step back and reconsider what we mean by 'uncertainty'.[^1] An ordinary model, which is mathematically simply a function from an input space $\mathcal{X}$ to an output space $\mathcal{Y}$, can be represented as follows.

[^1]: We will not go into full detail of what uncertainty could encompass. This very interesting, but also very complex scientific and philosophical question will be left aside.

<center>
    <img src = "{{site.baseurl}}/assets/figures/PhD/Transformation.png" style = "width: 60%">
</center>

However, this would mean that our models and mental representation are crisp, i.e. completely accurate and deterministic. In practice, there is often a lot of uncertainty about the data &mdash; be it <b id = "Epistemic">epistemic</b>, i.e. related to a proper lack of knowledge, or <b id = "Aleatoric">aleatoric</b>, i.e. related to inherent stochasticity in the underlying process &mdash; and this uncertainty makes it impossible to obtain crisp predictive models as shown below.

<center>
    <img src = "{{site.baseurl}}/assets/figures/PhD/InputUncertainty.png" style = "width: 60%">
</center>

However, for our needs, focus will be restricted to those models that assume crisp inputs and produce probability distributions regarding the outputs (conditional on the input).

<center>
    <img src = "{{site.baseurl}}/assets/figures/PhD/Stochasticity.png" style = "width: 60%">
</center>

In fact, our focus will be even more restricted. We will only look at models that take crisp inputs and produce sets of possible outputs.

<div class = "def" id = "ConfidencePredictor" text = "Confidence Predictor">
    Consider two measurable spaces $(\mathcal{X},\Sigma_{\mathcal{X}})$ and $(\mathcal{Y},\Sigma_{\mathcal{Y}})$. A confidence predictor $\Gamma:\mathcal{X}\rightarrow\mathcal{Y}$ is a measurable function from $\mathcal{X}$ to $2^{\mathcal{Y}}$ (where the latter is equipped with $\sigma$-algebra as constructed in <a href = "{% post_url 2020-02-01-AppendixMeasures %}#PowerSetAlgebra">the appendix</a>).
</div>

As already mentioned in <a href = "{% post_url 2022-11-18-PredictionIntervals %}">this previous post</a> on prediction intervals, several methods exist for the construction of confidence predictors: e.g. Bayesian methods and ensemble methods. The reason to focus on methods that produce prediction regions instead of full-fledged probability distributions, is that the former are easier to construct and apply, although the latter contain more information.<br><br>

A short example might help to clarify this notion. Here, we show two images of numbers and the output of some pretrained confidence predictor.
<center>
    <img src = "{{site.baseurl}}/assets/figures/PhD/ClassificationSet.png" style = "width: 60%">
</center>
The first image is, at least to me, rather hard to decipher. Consequently, a reasonable confidence predictor would output a set containing multiple possibilities (here: 2, 3 and 9) that cover the true number with high probability ($90\%$ in this case). The second image, on the other hand, is sharper and, as such, our model outputs a set with a single (correct) number.<br><br>

The purpose of this post will be to delve into more detail about the statement "cover the true number with high probability". What do we mean with high probability? Is this over all possible data points? Is this conditional on the true number? Many possibilities exist.

<hr id = "MarginalValidity">
<div class = "nav-block"><div class = "side">Marginal validity</div></div>

Many standard techniques from statistics have important limitations that make them unappealing to machine learning practitioners. Three main classes are:
1. Model limitations (e.g. linearity),
2. Data assumptions (e.g. ordinal data or normality), and
3. Computational (in)efficiency (e.g. Bayesian inference).

Luckily, there exists an alternative: 'Conformal Prediction'. This has
1. No model constraints,
2. Weak data assumptions,
3. Efficient implementations, and
4. Can incorporate modern methodologies (e.g. online learning).

Item 1 can be taken literally, all measurable functions are allowed. For Item 2, the correct assumption is the following one.[^2]

<div class = "def" id = "Exchangeability" text = "Exchangeability">
    Consider a probability distribution $P$ on a product space $\mathcal{X}^n$. If
    \begin{gather*}
        P(X_{i_1},\ldots,X_{i_n}) = P(X_1,\ldots,X_n)
    \end{gather*}
    for all permutations $\{i_1,\ldots,i_n\}$ of $\{1,\ldots,n\}$, then the distribution $P$ is said to be exchangeable.
</div>

[^2]: Unless extensions are considered (e.g. those incorporating sequential dependence such as for time series modelling).

A nice example here is Polya's urn (see the image below). If you have a bag of marbles with two colours, let's say green and red, the probability of drawing a given colour changes throughout sequential draws (since the number of marbles changes), but the joint of probabilities do not depend on the order.

<center>
    <img src = "{{site.baseurl}}/assets/figures/PhD/Exchangeability.png" style = "width: 50%">
</center>

The general idea behind conformal prediction is that exchangeability, i.e. the irrelevant order of data points, implies that the rank of data points, when using ordinal data, is uniformly distributed. This apparently innocuous fact is the working horse of my thesis.<br><br>

However, not all kinds of data are ordinal. To this end, one needs a way to convert data points into, preferably, numbers.
<div class = "def" id = "NonconformityMeasure" text = "Nonconformity Measure">
    A measurable function $A:\mathcal{X}\times\mathcal{Y}\rightarrow\mathbb{R}$ from pairs of inputs and outputs to real numbers (the <b>nonconformity scores</b>).
</div>

Try and see if you can find out which nonconformity measure was used in the example below (or read on to find out about it).

\begin{array}{cccc}
    \hline
    x&\rho(x)&y&A(x,y) \\\\\\
    \hline
    0.5&1&2.5&1.5 \\\\\\
    2.5&5&3&2 \\\\\\
    1&2&10&8 \\\\\\
    \hline
\end{array}

Typical nonconformity measures in the one-dimensional regression setting are (denote the regressor by $\rho:\mathcal{X}\rightarrow\mathbb{R}$):
* Standard (residual) score

$$A_{\text{res}}(x,y) := |\rho(x)-y|\,.$$

* Normalized (residual) score

$$A_{\text{res}}^\sigma(x,y) := \frac{|\rho(x)-y|}{\sigma(x)}\,,$$

where $\sigma:\mathcal{X}\rightarrow\mathbb{R}^+_0$ is an uncertainty estimate such as the standard deviation.<br><br>

The (<b>inductive</b>) conformal prediction algorithm has the following simple workflow:
1. Choose a calibration set $\{(x_i,y_i)\}_{i\leq n}$, a nonconformity measure $A:\mathcal{X}\times\mathcal{Y}\rightarrow\mathbb{R}$ and a significance level $\alpha\in[0,1]$.
2. Calculate the score $a_i:=A(x_i,y_i)$ for every calibration point.
3. Determine the <b>critical score</b> $a^*:=q_{(1-\alpha)\left(1 + 1/n\right)}\bigl(\\{a_i\\}_{i\leq n}\bigr)$.
4. For a new $x\in\mathcal{X}$, include all $y\in\mathcal{Y}$ such that $A(x,y)\leq a^*$.

<center>
    <img src = "{{site.baseurl}}/assets/figures/PhD/Cumulative.png" style = "width: 75%">
</center>

The true power of this procedure lies in the strong guarantees that come with it!
<div class = "theorem" text = "Conservative validity">
    If the data is exchangeable, the conformal predictor is (conservatively) valid:
    \begin{gather*}
        P\bigl(Y\in\Gamma^\alpha(X)\bigr)\geq1-\alpha\,.
    \end{gather*}
</div>
<div class = "theorem" text = "Strict validity">
    If the data is exchangeable and the nonconformity scores are distinct, the conformal predictor is exactly valid:
    \begin{gather*}
        P\bigl(Y\in\Gamma^\alpha(X)\bigr)=1-\alpha\,.
    \end{gather*}
</div>

<hr id = "ConditionalValidity">
<div class = "nav-block"><div class = "side">Conditional validity</div></div>

Consider the situation where we want to predict the mass of fruit (as in the figure below). Given the conformal predictors of the previous section, we can already get somewhere.

<center>
    <img src = "{{site.baseurl}}/assets/figures/PhD/Conditional.png" style = "width: 60%">
</center>

However, when our population of fruits contains very different types of fruit (grapes and jackfruit in our case), the marginal validity results might lead to unexpected behaviour. If the majority of our fruit consisted of grapes and the model had residuals as shown in the graph below, we might produce reasonable prediction intervals for grapes, but the intervals for jackfruit will be much too small.

<center>
    <img src = "{{site.baseurl}}/assets/figures/PhD/Residuals.png" style = "width: 75%">
</center>

For a solution, here, we are inspired by the painter <a href = "https://en.wikipedia.org/wiki/Piet_Mondrian" target = "_blank" ref = "noopener">Mondriaan</a>. Instead of constructing one overall conformal predictor, we first split the instance space $\mathcal{X}\times\mathcal{Y}$ and construct a separate model for every block.

<center>
    <img src = "{{site.baseurl}}/assets/figures/PhD/Mondriaan.png" style = "width: 40%">
</center>

The downside with this approach is, however, that we need enough calibration data for every block in the partition. So, the question I asked myself is: "When can a single conformal predictor approximate conditional validity?". This led us to a more classical notion from parametric statistics.

<div class = "def" id = "Pivot" text = "Pivot">
    Consider a parametrized collection of probability distributions $\{P_\theta\}_{\theta\in\Theta}$. A function $f$ is called a pivot for this collection if the pushforward $f_*P_\theta$ does not depend on $\theta\in\Theta$, i.e. the distribution of the transformed variable $f(X)$ does not depend on $\theta$, no matter what the initial distribution of $X$ was.
</div>

A classic example would be standardization as shown below.

<center>
    <img src = "{{site.baseurl}}/assets/figures/PhD/Standardization.png" style = "width: 80%">
</center>

Armed with this idea, we came to the following contribution.

<div class = "theorem">
    If the nonconformity measure is pivotal with respect to the class-conditional distributions, the (marginal) conformal predictor is conditionally valid.
</div>

The underlying idea is simply that when the distributions for each class match, we can simply throw all data together. Returning to the case of standardization and the standardized nonconformity measure introduced on the previous section, the following corollary holds.

<div class = "theorem">
    If the conditional distribution is of the form
    \begin{gather*}
        f(y\mid x) = \frac{1}{\sigma(x)}g\left(\frac{y-\mu(x)}{\sigma(x)}\right)\,,
    \end{gather*}
    then the nonconformity measure $A_{\text{res}}^\sigma$ gives a conditionally valid conformal predictor independent of the specific choice of Mondrian structure.
</div>

<hr id = "ClusterwiseValidity">
<div class = "nav-block"><div class = "side">Clusterwise validity</div></div>

Comparing the two preceding sections, we have the following scenario:
* Mondrian approach: strong guarantees, but data required per
class.
* non-Mondrian approach: guarantees (in pivotal scenario) but
data required for accurate models.

The result is that, in settings with limited data, a strictly conditional approach might not work. To this end, we consider something in between marginal and conditional validity.

<center>
    <img src = "{{site.baseurl}}/assets/figures/PhD/Clusterwise.png" style = "width: 60%">
</center>

In the figure below, we can see that the data distributions differ between the different groups. However, taking into account the colours, some groups are more similar than others. This is the main idea of clusterwise validity. We will group 'similar' classes, achieving strict validity on each group due to the Mondrian approach, but still approximating conditional validity as well as possible.

<div class = "theorem" text = "Clusterwise Validity">
    The deviation from conditional validity is bounded by the <i>statistical diameter</i> of the cluster $\omega$:
    \begin{gather*}
        P\bigl(Y\in\Gamma^\alpha(X)\bigm\vert c\bigr)\geq1-\alpha-\max_{c'\in\omega}d(c,c')
    \end{gather*}
    for all $c\in\omega$.
</div>

Because this approach is rather recent, there were still some important gaps in the literature. For example, the statement above, although general, only talks about the Mondrian structure, which can be rather complex and is often not determined by clustering methods[^3]. However, to group together similar data points, data-driven clustering methods are very popular. Our idea was then to find out how clustering nonconformity scores could be related to clustering inputs.

[^3]: Mondrian taxonomies are often constructed by hand based on domain knowledge.

This led to the following contribution.
<div class = "theorem" text = "Lipschitz continuity">
    If the parametrized collection of probability distributions $\{P_\theta\}_{\theta\in\Theta}$ is Lipschitz continuous in $\theta$, then so will the pushforwards $\{f_*P_\theta\}_{\theta\in\Theta}$ be. As a result, if one uses a feature-based metric clustering method and the feature-conditional distributions are Lipschitz continuous, the clusterwise validity theorem above will hold.
</div>


<hr id = "References">
<div class = "nav-block"><div class = "side">References</div></div>

* 

<br><br><br>

<hr id = "Footnotes">
<div class = "nav-block"><div class = "side">Footnotes</div></div>