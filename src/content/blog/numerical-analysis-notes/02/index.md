---
title: 数值分析-函数的多项式插值（上）
publishDate: 2026-03-22
description: 数值分析笔记-02
tags:
  - 数值分析
language: '中文'
---

## 拉格朗日插值多项式

### 概念

* **$n$ 次插值基函数**：

$$
l_k(x) = \frac{(x-x_0)...(x-x_{k-1})(x-x_{k+1})...(x-x_n)}{(x_k-x_0)...(x_k-x_{k-1})(x_k-x_{k+1})...(x_k-x_n)}
$$

$$
= \prod_{j=0, j \neq k}^{n} \frac{x-x_j}{x_k-x_j} \quad (k=0, 1, ..., n)
$$

* **插值多项式 $L_n(x)$**：

$$
L_n(x) = \sum_{k=0}^{n} y_k l_k(x)
$$

形如上式的插值多项式 $L_n(x)$ 称为 **拉格朗日插值多项式**。

**备注：** 通常情况下次数为 $n$，但是特殊情形次数可以小于 $n$。

### 拉格朗日插值余项

设 $f(x)$ 在 $[a, b]$ 上有 $n+1$ 阶导数，节点 $a \leqslant x_0 < x_1 < \dots < x_n \leqslant b$，$L_n(x)$ 是满足条件 $L_n(x_i) = f(x_i), i = 0, 1, \dots, n$ 的插值多项式。

则对于任何 $x \in [a, b]$，存在 $\xi \in (a, b)$，有**插值余项**：

$$R_n(x) = f(x) - L_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \omega_{n+1}(x)$$

* $\xi$ 依赖于 $x$。
* $\omega_{n+1}(x) = (x - x_0)(x - x_1)\dots(x - x_n)$
* **误差估计（上界）**：
    若记 $\max_{a \leqslant x \leqslant b} |f^{(n+1)}(x)| = M_{n+1}$，则有：
    $$
    |R_n(x)| \leqslant \frac{M_{n+1}}{(n+1)!} |\omega_{n+1}(x)|
    $$

### 拉格朗日插值基函数的性质
若节点满足 $a \leqslant x_0 < x_1 < \dots < x_n \leqslant b$，且次数 $i \leqslant n$，则有：
$$
\sum_{k=0}^{n} x_k^i l_k(x) = x^i, \quad k = 0, 1, \dots, n
$$
特别地，当 $i=0$ 时：
$$
\sum_{k=0}^{n} l_k(x) = 1
$$

### 误差估计

* 核心问题：**函数的高阶导数未知，如何估计截断误差？**

* 构造思路

  假设插值条件中包含 $n + 2$ 个数据节点：$f(x_i)=y_i, \quad i=0, 1, \dots, n, n+1$。

* **利用前 $n+1$ 个数据**：构造一个 $n$ 次 Lagrange 插值多项式 $L_n(x)$。
* **利用后 $n+1$ 个数据**：构造一个 $n$ 次 Lagrange 插值多项式 $L^*_n(x)$。

各自的插值余项分别为：

$$
f(x) - L_n(x) = \frac{1}{(n+1)!} f^{(n+1)}(\xi) (x - x_0)(x - x_1) \cdots (x - x_n)
$$

$$
f(x) - L^*_n(x) = \frac{1}{(n+1)!} f^{(n+1)}(\xi^*) (x - x_1)(x - x_2) \cdots (x - x_{n+1})
$$

若假设在高阶导数连续且节点较近时，$f^{(n+1)}(\xi) \approx f^{(n+1)}(\xi^*)$，则将上述两式相减可得：

$$
L^*_n(x) - L_n(x) \approx \frac{1}{(n+1)!} f^{(n+1)}(\xi) (x - x_1) \cdots (x - x_n) (x_{n+1} - x_0)
$$

由此可以解出包含高阶导数的项：
$$
\frac{1}{(n+1)!} f^{(n+1)}(\xi) (x - x_1) \cdots (x - x_n) \approx \frac{L^*_n(x) - L_n(x)}{x_{n+1} - x_0}
$$

因此，我们得到了不需要高阶导数的余项估计式：

* **对于 $L_n(x)$ 的余项估计：**
    $$
    R_n(x) = f(x) - L_n(x) \approx \frac{L_n(x) - L^*_n(x)}{x_0 - x_{n+1}} (x - x_0)
    $$
* **对于 $L^*_n(x)$ 的余项估计：**
    $$
    R^*_n(x) = f(x) - L^*_n(x) \approx \frac{L^*_n(x) - L_n(x)}{x_{n+1} - x_0} (x - x_{n+1})
    $$

### Aitken 逐次线性插值法

对于未知函数或复杂函数 $f(x)$，假设已知信息：
$f(x_i) = y_i, \quad i = 0, 1, \dots, n$

**目标**：计算 $f(x)$ 在任何一点 $x$ 处的近似值，且近似误差不超过上限 $\varepsilon_0$。

* **步骤 1：构造初始线性插值**

    记 $I_i(x) = y_i, \quad i = 0, 1, \dots, n$。

    利用节点 $x_0, x_1$ 构造线性插值多项式 $I_{0,1}(x)$。

    利用节点 $x_0, x_2$ 构造另一个线性插值多项式 $I_{0,2}(x)$：

    $$
    I_{0,2} = I_{0,2}(x) = f_0 + \frac{f_2 - f_0}{x_2 - x_0}(x - x_0) = I_0 + \frac{I_2 - I_0}{x_2 - x_0}(x - x_0)
    $$

* **步骤 2：估计误差与判定**

    估计 $I_{0,1}(x)$ 的误差：

    $$
    R_{0,1,2}(x) = \frac{I_{0,1} - I_{0,2}}{x_1 - x_2}(x - x_1)
    $$

    **若 $|R_{0,1,2}(x)| < \varepsilon_0$**：算法终止。

    记 $f(x) \approx I_{0,1,2} = I_{0,1} + R_{0,1,2}(x)$。

    **否则**：继续执行步骤 3。

* **步骤 3：进一步迭代**

    利用节点 $x_0, x_3$ 构造线性插值多项式 $I_{0,3}(x)$。

    估计 $I_{0,1}(x)$ 的误差 $R_{0,1,3}(x)$ 并计算 $I_{0,1,3} = I_{0,1} + R_{0,1,3}(x)$。

    估计 $I_{0,1,2}(x)$ 的误差，计算 $I_{0,1,2,3}(x)$。

    类似地进行后续迭代

### Neville 逐次线性插值法

已知节点 $a \leqslant x_0 < x_1 < \dots < x_n \leqslant b$ 和相应的函数值 $f(x_i), i=0, 1, \dots, n$，则 $k$ 次插值多项式有递推公式：
$$
\begin{cases} 
P_j(x) = f(x_j) & j=0, 1, \dots, k \\ 
P_{0, 1, \dots, k}(x) = \frac{(x - x_0)P_{1, 2, \dots, k}(x) - (x - x_k)P_{0, 1, \dots, k-1}(x)}{x_k - x_0} & k=0, 1, \dots 
\end{cases}
$$
上述公式可以化简为：
$$
\begin{cases} 
P_j(x) = f(x_j) & j=0, 1, \dots, k \\ 
P_{0, 1, \dots, k}(x) = P_{0, 1, \dots, k-1}(x) + \frac{P_{1, 2, \dots, k}(x) - P_{0, 1, \dots, k-1}(x)}{x_k - x_0}(x - x_0) & k=0, 1, \dots 
\end{cases}
$$

## 牛顿插值多项式

### 均差及性质

**定义：**
* **一阶均差**：$f[x_0, x_k] = \frac{f(x_k) - f(x_0)}{x_k - x_0}$
* **二阶均差**：$f[x_0, x_1, x_k] = \frac{f[x_1, x_k] - f[x_0, x_1]}{x_k - x_0}$
* **k 阶均差**：

  $$
  f[x_0, x_1, \dots, x_k] = \frac{f[x_1, \dots, x_k] - f[x_0, \dots, x_{k-1}]}{x_k - x_0}
  $$

  *(均差也称为差商)*

**线性组合表示**：$k$ 阶均差可以表示为函数值 $f(x_0), \dots, f(x_k)$ 的线性组合：
   $$
   f[x_0, x_1, \dots, x_k] = \sum_{j=0}^{k} \frac{f(x_j)}{(x_j - x_0) \dots (x_j - x_{j-1})(x_j - x_{j+1}) \dots (x_j - x_k)}
   $$

**对称性**：均差的值与节点的排列顺序无关。例如：$f[x_0, x_1] = f[x_1, x_0]$。

**与导数的关系**：若 $f(x)$ 在 $[a, b]$ 上存在 $n$ 阶导数，则：

   $$
   f[x_0, x_1, \dots, x_n] = \frac{f^{(n)}(\xi)}{n!}, \quad \xi \in (a, b)
   $$

### 牛顿插值公式与余项

**牛顿插值多项式 $N_n(x)$：**
$$
N_n(x) = f(x_0) + f[x_0, x_1](x - x_0) + f[x_0, x_1, x_2](x - x_0)(x - x_1) + \dots + f[x_0, \dots, x_n]\omega_n(x)
$$

**牛顿插值余项 $R_n(x)$：**
$$
R_n(x) = f(x) - N_n(x) = f[x, x_0, x_1, \dots, x_n]\omega_{n+1}(x)
$$
其中 $\omega_{n+1}(x) = (x - x_0)(x - x_1)\dots(x - x_n)$。


### Lagrange 插值与牛顿型插值的比较

**（1）等价性**

两者都是 $n$ 次插值多项式，且均满足插值条件：
$$
L_n(x_i) = f(x_i), \quad N_n(x_i) = f(x_i) \quad (i=0, 1, \dots, n)
$$
基于多项式的唯一性可知，$L_n(x) \equiv N_n(x)$。

**（2）误差一致性**
它们的插值余项公式完全相同：
$$
R_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \omega_{n+1}(x)
$$

**（3）承继性**
* **Lagrange 插值**：当多项式次数从 $n-1$ 次增加到 $n$ 次时，**必须重新计算所有**的基本插值基函数 $l_k(x)$。
* **Newton 插值**：具有良好的承继性。只需在原有的均差表基础上再计算一个 **$n$ 阶均差**，然后在末尾加上新的一项即可。

## 差分

### 定义
设节点为**等距节点**，即步长 $h$ 为常数：
* $x_k = x_0 + kh, \quad (k=0, 1, \dots, n)$
* $f(x_k) = f_k$

### 一阶差分
* **向前差分**：$\Delta f_k = f_{k+1} - f_k$
* **向后差分**：$\nabla f_k = f_k - f_{k-1}$
* **中心差分**：$\delta f_k = f_{k+1/2} - f_{k-1/2}$

### 高阶差分
* **二阶向前差分**：$\Delta^2 f_k = \Delta f_{k+1} - \Delta f_k = f_{k+2} - 2f_{k+1} + f_k$
* **$m$ 阶向前差分**：$\Delta^m f_k = \Delta(\Delta^{m-1} f_k) = \Delta^{m-1} f_{k+1} - \Delta^{m-1} f_k$

### 性质
在等距插值的情况下，均差可以简化为差分与步长 $h$ 的组合：

* **向前形式**：
  $$
  f[x_0, x_1, \dots, x_k] = \frac{\Delta^k f_0}{k! h^k}
  $$
* **向后形式**：
  $$
  f[x_k, x_{k-1}, \dots, x_{k-m}] = \frac{\nabla^m f_k}{m! h^m}
  $$
* **重要换算关系**：
  $$
  \nabla^m f_{k+m} = \Delta^m f_k
  $$

### 均差、差分与导数的关系
1. **均差与导数**：$f[x_0, x_1, \dots, x_k] = \frac{f^{(k)}(\xi)}{k!}$
2. **差分与均差**：$f[x_0, x_1, \dots, x_k] = \frac{\Delta^k f_0}{k! h^k}$
3. **差分与导数**：
   $$
   \Delta^k f_0 = h^k f^{(k)}(\xi)
   $$

### Newton 向前与向后插值公式

* **Newton 向前差分插值公式**

    **适用场景**：适合于计算函数表**表头附近**（靠近 $x_0$）的函数值。

    引入变换 $t = \frac{x - x_0}{h}$，公式为：
    $$
    N_n(x) = f_0 + t \Delta f_0 + \frac{t(t-1)}{2!} \Delta^2 f_0 + \dots + \frac{t(t-1)\dots(t-n+1)}{n!} \Delta^n f_0
    $$
    **简化形式**：
    $$
    N_n(x) = \sum_{k=0}^{n} \binom{t}{k} \Delta^k f_0
    $$

    **插值余项**：
    $$
    R_n(x) = \frac{t(t-1)\dots(t-n)}{(n+1)!} h^{n+1} f^{(n+1)}(\xi), \quad \xi \in (x_0, x_n)
    $$

* **Newton 向后差分插值公式**

    **适用场景**：适合于计算函数表**表尾附近**（靠近 $x_n$）的函数值。

    引入变换 $t = \frac{x - x_n}{h}$（注意此处 $t$ 通常为负数），公式为：
    $$
    N_n(x) = f_N + t \nabla f_N + \frac{t(t+1)}{2!} \nabla^2 f_N + \dots + \frac{t(t+1)\dots(t+n-1)}{n!} \nabla^n f_N
    $$

    **简化形式**：
    记 $\binom{-t}{k} = \frac{-t(-t-1)\dots(-t-k+1)}{k!} = (-1)^k \frac{t(t+1)\dots(t+k-1)}{k!}$，则：
    $$
    N_n(x) = \sum_{k=0}^{n} (-1)^k \binom{-t}{k} \nabla^k f_N
    $$

    **插值余项**：
    $$
    R_n(x) = \frac{t(t+1)\dots(t+n)}{(n+1)!} h^{n+1} f^{(n+1)}(\xi), \quad \xi \in (x_{n-n}, x_n)
    $$

### 重节点均差与泰勒插值

设 $f \in C^n[a,b]$，则 $f[x_0, x_1, \dots, x_n]$ 是其变量的连续函数。

当节点趋于重合时，利用极限可以定义**重节点均差**：
* **一阶重节点均差**：
  $$
  f[x_0, x_0] = \lim_{x \to x_0} f[x_0, x] = \lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0} = f'(x_0)
  $$
* **二阶重节点均差**：
  $$
  f[x_0, x_0, x_0] = \lim_{\substack{x_1 \to x_0 \\ x_2 \to x_0}} f[x_0, x_1, x_2] = \frac{1}{2!} f''(x_0)
  $$
* **$n$ 阶重节点均差（一般项）**：
  $$
  f[\underbrace{x_0, x_0, \dots, x_0}_{n+1个}] = \frac{f^{(n)}(x_0)}{n!}
  $$

在牛顿插值多项式 $N_n(x)$ 中，令所有节点 $x_i \to x_0 \ (i=1, 2, \dots, n)$，则公式变为：

$$P_n(x) = f(x_0) + f'(x_0)(x - x_0) + \frac{f''(x_0)}{2!}(x - x_0)^2 + \dots + \frac{f^{(n)}(x_0)}{n!}(x - x_0)^n$$

这实际上就是在点 $x_0$ 附近逼近 $f(x)$ 的一个**带导数的插值多项式**（即泰勒多项式），它满足：
$$P_n^{(k)}(x_0) = f^{(k)}(x_0), \quad k=0, 1, \dots, n$$
