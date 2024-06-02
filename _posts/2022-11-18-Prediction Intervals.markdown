---
layout: post
title:  "Prediction Intervals"
date:   2022-11-23
categories: paper
type: post
---

This post is based on my first paper published earlier this year: "Valid prediction intervals for regression problems" in collaboration
with my promotors Willem Waegeman and Bernard De Baets.<br><br>

Most people these days recognize that the standard approach to predictive modelling is not sufficient anymore.
The majority of papers and competitions (e.g. Kaggle) focus purely on predictive accuracy. This has two major downsides.
The first, overfitting, is a by now well-recognized problem, but the second, the lack of an uncertainty estimate, is much less studied.
A highly accurate model might still be horribly wrong in a small number of situations and in practice, think of self-driving cars or medical support systems,
it are often these critical cases that are important. Having no idea about how uncertain the model is, makes it hard to apply it in critical settings.<br><br>

When restricting to regression problems, the most straightforward approach to uncertainty quantification (UQ) is the construction of <b>prediction intervals</b> (PI).
To formalize this notion, denote the input space by $\mathcal{X}$. A prediction interval for an instance $x\in\mathcal{X}$ consists of an interval $[l(x),u(x)]\subseteq\mathbb{R}$ such that

$$\mathbb{P}\big(y\in[l(x),u(x)]\big)\geq1-\alpha$$

for some predetermined <b>significance level</b> $\alpha\in[0,1]$.
This condition states the <b>validity</b> of the intervals, if the intervals are required to satisfy this condition, we have a handle on how often they are correct.

<div class="note">
  For people familiar with parametric statistics, this validity condition might feel familiar.
  When estimating parameters, models often return confidence intervals (CI) which satisfy virtually the same condition.
  However, the main difference between CI and PI is that former will converge to a single point when enough data is gathered (and the correct model is used),
  while the latter will always be an interval since the data generating process is inherently stochastic.
</div>

The main problem, as is usually the case with inferential models, is that, in general, statistical conditions are hard to satisfy.
It is not hard to come up with interval estimators, but it is hard to come up with ones that are valid. Even those that are derived from
probabilistic assumptions often fail to be valid in practice. (This effectively turns them useless.) In general this problem can be ascribed to the following issues:
* Model misspecification.
* Lack of data.

The second reason is the most obvious one. Even if the parametric form of the data generating process is known, a lack of data will lead to wrong estimates
and the resulting PIs will not be valid. The first reason is harder to overcome. A straightforward solution would be to use nonparametric models,
but these models are harder to train since we cannot leverage any properties.

Some common approaches are <a href="https://en.wikipedia.org/wiki/Quantile_regression" target="_blank">quantile regression</a>,
<a href="https://en.wikipedia.org/wiki/Ensemble_learning" target="_blank">ensemble learning</a> and <a href="https://en.wikipedia.org/wiki/Bayesian_inference" target="_blank">Bayesian modelling</a>.
Bayesian modelling is often the most powerful approach, but without correctly specified priors, the resulting PIs will not be valid. Both quantile regression and ensemble modelling are nonparametric by nature, but suffer from other problems.
Quantile regression admits a theoretical derivation, but can only be used for predetermined quantiles, while ensemble models are versatile and robust, but still require a distributional prior
to obtain PIs (unless they are interpreted as a mixture model, but this still gives not theoretical guarantees).<br><br>

In comes <b>Conformal Prediction</b>. This framework, initially developed by V. Vovk, allows to turn any model into an interval estimator and, moreover,
this estimator will be valid. (In a next blog I might say a little more about the general framework of conformal prediction and how it also ecompasses classification problems etc.)
The main idea is to start from a <b>nonconformity score</b>

$$A:\mathcal{X}\times\mathbb{R}\rightarrow\mathbb{R}\,,$$

often extracted from a training set, that tells us how different the point is from the training set (it is a measure of the nonconformity). Given a validation set $\mathcal{V}\subset\mathcal{X}\times\mathbb{R}$, the inductive or split approach then proceeds as follows:
1. Calculate the validation scores $$A(\mathcal{V})$$.
2. Determine the \\(\left(1-\frac{1}{\|\mathcal{V}\|}\right)(1-\alpha)\\)-quantile $$q^*$$ of $$A(\mathcal{V})$$.
3. Construct the prediction set as $$\\{y\in\mathbb{R}\mid A(x,y)\leq q^*\\}$$.

Note that for general scores $$A$$, the resulting set might not be connected, i.e. it might not be an interval. (This is a general feature of conformal prediction.)
However, for the most commonly used scores, the sets will be intervals.

The simplest example is the residual score $$A_\text{res}(x,y) := |y-\hat{\mu}(x)|$$ for a point-predictor $$\hat{\mu}:\mathcal{X}\rightarrow\mathbb{R}$$. Since this function is essentially $$\mathcal{X}$$-independent,
it only depends on behaviour in the target space, the PIs will be homoskedastic (of equal length). This also allows us to calculate the PIs essentialy with $$O(1)$$ complexity: for any input $$x\in\mathcal{X}$$, the resulting PI can be constructed as (this is pretty easy to show) $$\mathrm{PI}(x) := \left[\hat{\mu}(x)-q^*,\hat{\mu}(x)+q^*\right].$$
The homoskedasticity makes it a computationally efficient tool, but is it a realistic feature? The whole point was that certain data points
might be much harder to predict and, hence, have a larger uncertainty. Luckily, two other natural choices exist.<br><br>

The first one is a minor modification of the residual score:

$$A_\sigma(x,y):=\frac{|y-\hat{\mu}(x)|}{\hat{\sigma}(x)}\,,$$

where $\hat{\sigma}:\mathcal{X}\rightarrow\mathbb{R}$ is a "difficulty function", telling us how difficult the point is to estimate.
(The most common choice is the standard deviation, hence the notation.) The endpoints of the PIs are now determined by
$\hat{\sigma}(x)q^*$ and, if $\hat{\sigma}$ gives a reasonable estimate of the uncertainty, the PIs will better reflect the uncertainty too. The second choice of heteroskedastic nonconformity measure is obtained by starting from an existing interval estimator $(\hat{l},\hat{u}):\mathcal{X}\rightarrow\mathbb{R}^2$:

$$A_{\text{int}}(x,y):=\max\left(y-\hat{u}(x),\hat{l}(x)-y\right)\,.$$

This can be interpreted as a deficiency score, telling us how much the intervals are too wide or too narrow. Again, here, the "calibrated" PIs can be calculated with $O(1)$-complexity:

$$\mathrm{PI}(x) := \left[\hat{l}(x)-q^* ,\hat{u}(x)+q^*\right]\,.$$

<div class="note">
  In fact, we can see that the PIs obtained with the residual score are a special case of this one where $\hat{l}(x)=\hat{u}(x):=\hat{\mu}(x)$, i.e. when the naive PIs are simply one-element sets.  More can actually be said. The residual score $A_\text{res}$ and the "normalized" residual score $A_\sigma$ are both derived from <a href="https://en.wikipedia.org/wiki/Metric_space">metrics</a> on $\mathbb{R}$: the Euclidean and Mahalonobis metrics.
  With this insight, all of the above nonconformity measures can be unified since they simply represent the distance from the new point to the boundary of the existing PI: $$A_{C,d}(x,y) := \max_{p\in\partial C(x)}d(p,y)\,,$$ where $d:\mathbb{R}\times\mathbb{R}\rightarrow\mathbb{R}^+$ is the distance function and $C:\mathcal{X}\rightarrow P(\mathbb{R})$ is a pre-existing PI estimator.
</div>

To round up, we should actually state the most important part: the validity theorem. Sadly enough, plain inductive conformal prediction only satisfies a weak version:

<div class="theorem" text="Asymptotic validity">
  Consider a validation set $\mathcal{V}\subset\mathcal{X}\times\mathbb{R}$ and a new data point $(x,y)\in\mathcal{X}\times\mathbb{R}$ such that the enhanced data set $\mathcal{V}\cup\{(x,y)\}$ is exchangeable, i.e. their joint distribution is independent of the order of the points in the data set. The PI satisfies $$\mathbb{P}\big(y\in\mathrm{PI}(x)\big)\geq1-\alpha.$$
</div>

The reason for why this is only an asymptotic theorem is that when you apply the conformal predictor to a whole test set, while retaining the same validation set,
the PIs are not independent anymore and the validity theorem does not need to hold. Only when drawing an entirely new validation set every time, validity will hold.

<div class="note">
  It is interesting to note that this is in fact a minor issue. By extending the validation set in an online fashion,
  it can be shown that the constructed PIs are in fact independent and validity holds in the strong sense. Moreover,
  when the validation scores \(A(\mathcal{V})\) are almost surely distinct, the validity will be tight:
  
  $$\mathbb{P}\big(y\in\mathrm{PI}(x)\big)\leq1-\alpha+\frac{1}{|\mathcal{V}|}.$$
  
</div>

<br>
<h3>References</h3>

<ul class="list">
  <li>Dewolf, N., De Baets, B. & Waegeman, W. (2022). Valid prediction intervals for regression problems. <i>Artif Intell Rev</i>. <a href="https://doi.org/10.1007/s10462-022-10178-5 ">https://doi.org/10.1007/s10462-022-10178-5</a></li>
  <li>Angelopoulos, A. N., & Bates, S. (2021). A gentle introduction to conformal prediction and distribution-free uncertainty quantification. arXiv preprint arXiv:2107.07511.
    Link: <a href="https://arxiv.org/abs/2107.07511">https://arxiv.org/abs/2107.07511</a></li>
  <li>A great repository of all things related to Conformal Prediction: <a href="https://github.com/valeman/awesome-conformal-prediction">https://github.com/valeman/awesome-conformal-prediction</a></li>
  <li>Extension of the above paper with tutorial and more: <a href="https://people.eecs.berkeley.edu/~angelopoulos/blog/posts/gentle-intro/">https://people.eecs.berkeley.edu/~angelopoulos/blog/posts/gentle-intro/</a></li>
</ul>

<br><br>Started: 18/11/2022<br>