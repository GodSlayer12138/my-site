---
title: 数值分析-误差
publishDate: 2026-03-14
description: 数值分析笔记-01
tags:
  - 数值分析
language: '中文'
---

## 误差

### 误差的来源

- 模型误差：数学模型与实际问题之间的误差
- 观测误差：观察模型参数值产生的误差
- **截断误差：也称方法误差，数值方法计算的误差**
- **舍入误差：计算过程中取有限位数字引起的误差**

### 绝对误差、相对误差

设 $x$ 是某实数的精确值，$\tilde{x}$ 是它的一个近似值。那么：
- 绝对误差：$e(x) = |x - \tilde{x}|$ 
- 相对误差：$e_r = \frac{e(x)}{|x|}$ ($x \neq 0$)
- 绝对误差限：若 $|x - \tilde{x}| \leq \varepsilon$，则称 $\varepsilon$ 是 $\tilde{x}$ 的绝对误差限
- 相对误差限：称 $\varepsilon_r = \frac{\varepsilon}{|x|}$ ($x \neq 0$) 为近似值 $\tilde{x}$ 的相对误差限

由于 $x$ 一般未知，常用 $e_r = \frac{e(x)}{|\tilde{x}|}$ 来表示相对误差，用 $\varepsilon_r = \frac{\varepsilon}{|\tilde{x}|}$ 表示相对误差界。

### 有效数字

- 若近似值 $\tilde{x}$ 的误差限小于其某一位的半个单位，该位到 $\tilde{x}$ 的第一位非零数字共有 $n$ 位，则 $\tilde{x}$ 有 $n$ 位有效数字。
- 设 $\tilde{x}$ 是 $x$ 的一个近似值，将 $\tilde{x}$ 写成规范形式：
  $$
  \tilde{x} = \pm 0.a_1 a_2 \dots a_i \dots \times 10^m
  $$
  其中：$m$ 为整数。$a_i \in \{0, 1, 2, \dots, 9\}$，且 $a_1 \neq 0$。如果有：
  $$
  |x - \tilde{x}| \leq 0.5 \times 10^{m-n}
  $$
  则称 $\tilde{x}$ 为 $x$ 的具有 $n$ 位有效数字的近似值。
- $\tilde{x}$ 的误差限小于其某一位的半个单位，该位到 $\tilde{x}$ 的第一位非零数字共有 $n$ 位，则 $\tilde{x}$ 有 $n$ 位有效数字。
- 有效数字与相对误差的关系。  
  已知有效数字为 $n$，估计相对误差的公式为：
  $$
  \frac{|\tilde{x} - x|}{|\tilde{x}|} \le \frac{1}{2a_1} \times 10^{-(n-1)}
  $$
  反之，若满足以下条件：
  $$
  \frac{|\tilde{x} - x|}{|\tilde{x}|} \le \frac{1}{2(a_1 + 1)} \times 10^{-(n-1)}
  $$
  则至少具有 $n$ 位有效数字。

### 运算误差分析

- 问题：设 $\tilde{x}$ 是自变量 $x$ 的一个近似值，误差界为 $\varepsilon(\tilde{x})$。利用 $f(\tilde{x})$ 近似 $f(x)$ 的误差界为 $\varepsilon(f(\tilde{x}))$，试估计 $\varepsilon(f(\tilde{x}))$
- 由 Taylor 展开可知：
  $$
  f(x) - f(\tilde{x}) = f'(\tilde{x})(x - \tilde{x}) + \frac{f''(\xi)}{2!}(x - \tilde{x})^2
  $$
  由此可得绝对误差的估计：
  $$
  |f(x) - f(\tilde{x})| \leq |f'(\tilde{x})\varepsilon(\tilde{x})| + \frac{|f''(\xi)|}{2!}\varepsilon(\tilde{x})^2
  $$
  忽略 $\varepsilon(\tilde{x})$ 的高阶项可得函数的误差为：
  $$
  \varepsilon(f(\tilde{x})) \approx |f'(\tilde{x})| \varepsilon(\tilde{x})
  $$

**推论：**
$n$ 元函数的误差估计对于 $n$ 元函数 $f(x_1, x_2, \dots, x_n)$，$\tilde{x}_1, \tilde{x}_2, \dots, \tilde{x}_n$ 分别是自变量 $x_1, x_2, \dots, x_n$ 的近似值，则有：
$$
\begin{aligned}
\varepsilon(f(\tilde{x}_1, \tilde{x}_2, \dots, \tilde{x}_n)) &= |f(\tilde{x}_1, \tilde{x}_2, \dots, \tilde{x}_n) - f(x_1, x_2, \dots, x_n)| \\
&\approx \sum_{k=1}^n \left| \left( \frac{\partial f}{\partial x_k} \right)_{\tilde{x}} \right| \varepsilon(\tilde{x}_k)
\end{aligned}
$$
其中：
$$
\left( \frac{\partial f}{\partial x_k} \right)_{\tilde{x}} = \left. \frac{\partial}{\partial x_k} f(x_1, x_2, \dots, x_n) \right|_{x_1, x_2, \dots, x_n = \tilde{x}_1, \tilde{x}_2, \dots, \tilde{x}_n}
$$

特别地：

$$
\varepsilon(\tilde{x}_1 \pm \tilde{x}_2) \approx \varepsilon(\tilde{x}_1) + \varepsilon(\tilde{x}_2)
$$
$$
\varepsilon(\tilde{x}_1 \cdot \tilde{x}_2) \approx |\tilde{x}_1| \varepsilon(\tilde{x}_2) + |\tilde{x}_2| \varepsilon(\tilde{x}_1)
$$

### 病态问题

对于数学问题本身，如果输入数据有微小扰动，引起问题的解有很大扰动，则称该问题是**病态问题**。非病态的问题称为**良态问题**。
病态和良态是**相对的**，没有严格的界线。  
当数学问题的解的相对误差与输入数据的相对误差之比的绝对值**远远大于1**时，常常就
认为该问题是病态的。

**相对误差的比值：**
$$
\frac{\varepsilon_r(f(\tilde{x}))}{\varepsilon_r(\tilde{x})} = \frac{\varepsilon(f(\tilde{x}))}{|f(\tilde{x})| \varepsilon_r(\tilde{x})} \approx \frac{|f'(\tilde{x})| \varepsilon(\tilde{x})}{|f(\tilde{x})| \varepsilon_r(\tilde{x})} = \left| \frac{f'(\tilde{x})\tilde{x}}{f(\tilde{x})} \right| = C_p
$$
其中，$C_p$ 称为条件数。判定标准：通常认为当 条件数 $C_p \ge 10$ 时，该计算问题是病态的。

### 数值稳定性

对于某个数值计算方法，如果输入数据的误差在计算过程中迅速增长而得不到控制，则称该算法是**数值不稳定**的，否则是**数值稳定**的。

更准确地说，假设一个算法有初始误差 $\varepsilon_0 > 0$，它引起此后运算 $n$ 步的误差是 $\varepsilon_n$：

* **线性型增长**：如果 $\varepsilon_n \approx C n \varepsilon_0$（其中 $C$ 是与 $n$ 无关的常数），则称误差的增长是**线性型**的。
* **指数型增长**：如果 $\varepsilon_n \approx C^n \varepsilon_0$，则称误差的增长是**指数型**的。

### 数值计算的基本原则
- 防止大数吃小数。  
  用三位十进制数字计算：
  $$
  x = 101 + \delta_1 + \delta_2 + \dots + \delta_{100}
  $$
  其中 $0.1 \le \delta_i \le 0.4$，$i = 1, 2, \dots, 100$。
- 避免两个相近的数字相减。  
  常用公式：
  $$
  \frac{1 - \cos x}{\sin x} = \frac{\sin x}{1 + \cos x}
  $$
  $$
  \sqrt{x+1} - \sqrt{x} = \frac{1}{\sqrt{x+1} + \sqrt{x}}
  $$
  $$
  \log x_1 - \log x_2 = \log \frac{x_1}{x_2}
  $$
- 简化计算步骤，减少运算次数。
   1. 快速幂运算：求 $x^{255}$。
   $$
   x^{255} = x \cdot x^2 \cdot x^4 \cdot x^8 \cdot x^{16} \cdot x^{32} \cdot x^{64} \cdot x^{128}
   $$
   2. 秦九韶算法：给定 $x$，计算多项式 $P(x) = a_n x^n + a_{n-1} x^{n-1} + \dots + a_1 x + a_0$。将多项式改写为嵌套形式：
   $$
   P(x) = (\dots((a_n x + a_{n-1})x + a_{n-2})x + \dots + a_1)x + a_0
   $$
   3. 级数展开的选择：计算 $\ln 2$。利用级数
   $$
   \ln \frac{1+x}{1-x} = 2 \left( x + \frac{x^3}{3} + \frac{x^5}{5} + \dots \right)
   $$
   取 $x = \frac{1}{3}$：只需计算 前 5 项，即可精确到 $10^{-5}$。计算前 10 项，截断误差小于 $10^{-10}$。
- 控制误差的传播。
  计算积分 $I_n = \int_0^1 \frac{x^n}{x+5} dx, \quad n = 0, 1, \dots, 6$  
  递推公式：
  $$
  I_n + 5I_{n-1} = \int_0^1 \frac{x^n + 5x^{n-1}}{x+5} dx = \int_0^1 x^{n-1} dx = \frac{1}{n}
  $$
  
  | 计算方法 | 递推公式 | 误差传播特性 |
  | --- | --- | --- |
  | **方法 A** (正向) | $I_n = \frac{1}{n} - 5I_{n-1}$ | 误差被放大 5 倍，迅速爆炸 |
  | **方法 B** (反向) | $I_{n-1} = \frac{1}{5} \left( \frac{1}{n} - I_n \right)$ | 误差被缩小为 1/5，趋于稳定 |
