
+++ https://www.geeksforgeeks.org/courses/data-structures-and-algorithms-in-javascript
[ ] adhoc questions on the application of Array, Stack, Queue, HashMap, TreeMap
[ ] algorithms -- analysis -- https://www.geeksforgeeks.org/design-and-analysis-of-algorithms/
[ ] count bits
[ ] Elements of Programming Interviews (EPI) book https://elementsofprogramminginterviews.com/2017/11/27/2017-11-27-buying-epi/
algorithm -- efficiency = property of an algorithm which relates to the amount of computational resources used by the algorithm https://en.wikipedia.org/wiki/Algorithmic_efficiency
algorithm = finite sequence of mathematically rigorous instructions, typically used to solve a class of specific problems or to perform a computation https://en.wikipedia.org/wiki/Algorithm
algorithmic paradigm -- backtracking
algorithmic paradigm -- branch and bound
algorithmic paradigm -- brute-force search
algorithmic paradigm -- divide and conquer
algorithmic paradigm -- dynamic programming
algorithmic paradigm -- greedy algorithm
algorithmic paradigm -- prune and search
algorithmic paradigm -- recursion
algorithmic paradigm = https://en.wikipedia.org/wiki/Algorithmic_paradigm
algorithms -- analysis -- best case, worst case, expected case
algorithms -- analysis -- big -- academy -- O = upper bound = "algo it at least as fast as"
algorithms -- analysis -- big -- academy -- Θ (theta) = O and Ω = tighter bounds, ex. Θ(N) means both O(N) and Ω(N)
algorithms -- analysis -- big -- academy -- Ω (omega) = lower bound = "algo is no faster than"
algorithms -- analysis -- big -- amortized time, ex. auto-growing array that takes time once in a while = compute limits
algorithms -- analysis -- big -- combining = add if sequence, multiply if "for each, do work" 
algorithms -- analysis -- big -- identifying N
algorithms -- analysis -- big -- industry -- O = no constant (ex. O(2N)), only the dominant (ex. O(N²+N))
algorithms -- analysis -- big -- industry -- O = ~Θ = tightest
algorithms -- analysis -- big -- warning, O(1) is not necessarily better than O(N), ex. transfer by plane. There is a point where O(1) will be faster for a big N, but may be high
algorithms -- analysis -- big O -- analysis 01 = Figure out what the input is and what n represents.
algorithms -- analysis -- big O -- analysis 02 = Express the maximum number of operations, the algorithm performs in terms of n
algorithms -- analysis -- big O -- analysis 03 = Eliminate all excluding the highest order terms
algorithms -- analysis -- big O -- analysis 04 = Remove all the constant factors
algorithms -- analysis -- big O -- cheatsheet https://www.bigocheatsheet.com/
algorithms -- analysis -- big O -- intro https://builtin.com/software-engineering-perspectives/nlogn https://www.freecodecamp.org/news/big-o-cheat-sheet-time-complexity-chart/ https://www.geeksforgeeks.org/analysis-algorithms-big-o-analysis/
algorithms -- analysis -- big O / asymptotic notation https://en.wikipedia.org/wiki/Big_O_notation#Infinite_asymptotics
algorithms -- analysis -- big Oa -- O(1) = constant
algorithms -- analysis -- big Ob -- O(log n) = logarithm
algorithms -- analysis -- big Oc -- O(n) = linear
algorithms -- analysis -- big Od -- O(n^2) = squared / quadratic
algorithms -- analysis -- big Oe -- O(n^3) = cubic
algorithms -- analysis -- big Oe -- O(n^x) = polynomial
algorithms -- analysis -- big Of -- O(2^n) O(x^n) = exponential
algorithms -- analysis -- big Og -- O(n!) = factorial
algorithms -- analysis -- time vs space = big space can be inefficient (processor cache)
antisymmetric
approximation algorithms = efficient algorithms that find approximate solutions to optimization problems (in particular NP-hard problems) with provable guarantees on the distance of the returned solution to the optimal one https://en.wikipedia.org/wiki/Approximation_algorithm
Best, Average and Worst Cases
binary search: Lower bound, Upper bound, Questions where binary search is not the obvious choice
bloom filter = space-efficient probabilistic data structure used to test whether a given element is a member of a set. Achieves this by using multiple hash functions to map elements to a bit array https://www.geeksforgeeks.org/bloom-filters-introduction-and-python-implementation/
BPE / Byte pair encoding https://github.com/openai/tiktoken
cache-oblivious https://en.wikipedia.org/wiki/Cache-oblivious_algorithm
checksum
Chocolate Distribution Problem
Communication-avoiding https://en.wikipedia.org/wiki/Communication-avoiding_algorithm
complexity chart https://flexiple.com/algorithms/big-o-notation-cheat-sheet
complexity chart https://flexiple.com/algorithms/big-o-notation-cheat-sheet
computational complexity -- Deletion time = time required for the update of the data structure when an input element is deleted;
computational complexity -- Initialization time = time required for the initial construction of the data structure;
computational complexity -- Insertion time = time required for the update of the data structure when one more input element is added;
computational complexity -- Other = operations specific to the problem in question
computational complexity -- Query time = time required to answer a query;
computational complexity -- Space = the amount of memory space required to store the data structure;
Conflict Free Replicated Data type (CRDT)
consensus -- raft https://en.wikipedia.org/wiki/Raft_(algorithm)  https://raft.github.io/
Day–Stout–Warren = amortized binary tree balancing https://en.wikipedia.org/wiki/Day%E2%80%93Stout%E2%80%93Warren_algorithm
deque = double-ended queue
disjoint set union
dynamic = ex. For an initial set of N numbers, dynamically maintain the maximal one when insertion and deletions are allowed.
dynamic programming
EdgeRank = Facebook’s News Feed Algorithm https://buffer.com/resources/understanding-facebook-news-feed-algorithm/
effacement d'une liste pendant qu'on la parcourt
finite-state machine
graph -- BFS https://en.wikipedia.org/wiki/Breadth-first_search
graph -- DFS
graph -- shortest path
graph -- shortest path -- A*
graph -- shortest path -- Djikstra https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
graph -- traversal -- topological sorting https://en.wikipedia.org/wiki/Topological_sorting
greatest common divisor (GCD) -- https://en.wikipedia.org/wiki/Euclidean_algorithm
greatest common divisor (GCD) https://en.wikipedia.org/wiki/Greatest_common_divisor
greedy https://en.wikipedia.org/wiki/Greedy_algorithm
hashing
hashing -- consistent hashing https://en.wikipedia.org/wiki/Consistent_hashing
hashing -- extendible hashing https://en.wikipedia.org/wiki/Extendible_hashing
heap -- median in a stream
heap -- sliding window maximum
heap -- top k elements
heuristic https://en.wikipedia.org/wiki/Heuristic_(computer_science)
Highest common factor (HCF) = greatest common divisor
Huffman coding https://en.wikipedia.org/wiki/Huffman_coding
idempotent = operation can run multiple times without changing the result
identity function
Josephus Problem
Knapsack problem https://en.wikipedia.org/wiki/Knapsack_problem
lexorank = algo to custom reorder in O(1) + background clean (based on lexicographic order)
list -- floyd's cycle detection
LLM -- temperature scaling
LLM output generation -- beam search = search algorithm used to generate output sequences from a model during inference https://ai-guide.future.mozilla.org/content/llms-101/
LLM output generation -- nucleus sampling aka. top-P sampling
LLM output generation -- sampling = search algorithm used to generate output sequences from a model during inference https://ai-guide.future.mozilla.org/content/llms-101/
loop invariant https://en.wikipedia.org/wiki/Loop_invariant
loop variant -- bound function = 0..N
loop variant -- does it terminate? no infinite descending chain
loop variant = function on state space that monotonically decrease ~= loop being iterated on https://en.wikipedia.org/wiki/Loop_variant
Luleå algorithm https://en.wikipedia.org/wiki/Lule%C3%A5_algorithm
MapReduce https://en.wikipedia.org/wiki/MapReduce
Markov Chains -- absorbing -- standard form
Markov Chains -- absorbing = only if absorbing state(s) and non-absorbing state(s) can end up in absorbing state(s)
Markov Chains -- absorbing state https://www.youtube.com/watch?v=bTeKu7WdbT8
Markov Chains -- limiting matrix
Markov Chains -- stationary distribution
Markov Chains -- transition matrix
Markov Chains https://www.youtube.com/watch?v=JHwyHIz6a8A
negamax https://en.wikipedia.org/wiki/Negamax
operation -- binary = combining 2 operands/elements
operation -- unary
Order of Growth
P versus NP -- NP = "nondeterministic polynomial time" = quickly checkable (polynomially) = Class of computational decision problems for which any given yes-solution can be verified as a solution in polynomial time by a deterministic Turing machine (or solvable by a non-deterministic Turing machine in polynomial time)
P versus NP -- NP-complete = Class of decision problems which contains the hardest problems in NP. Each NP-complete problem has to be in NP. A fast solution to any one of the NP could be used to build a quick solution to any other problem in NP https://en.wikipedia.org/wiki/NP-complete
P versus NP -- NP-easy = At most as hard as NP, but not necessarily in NP.
P versus NP -- NP-equivalent = Decision problems that are both NP-hard and NP-easy, but not necessarily in NP.
P versus NP -- NP-hard = Class of problems which are at least as hard as the hardest problems in NP. Problems that are NP-hard do not have to be elements of NP; indeed, they may not even be decidable.
P versus NP -- NP-hardness https://en.wikipedia.org/wiki/NP-hardness
P versus NP -- NP-intermediate = If P and NP are different, then there exist decision problems in the region of NP that fall between P and the NP-complete problems. (If P and NP are the same class, then NP-intermediate problems do not exist because in this case every NP-complete problem would fall in P, and by definition, every problem in NP can be reduced to an NP-complete problem.)
P versus NP -- P = easily solvable (Polynomial time)
P versus NP https://en.wikipedia.org/wiki/P_versus_NP_problem
Packing Unit Squares in Squares https://www.combinatorics.org/files/Surveys/ds7/ds7v5-2009/ds7-2009.html
recursion -- indirect/mutual = direct = calls itself, indirect = family f calls g calls f etc.
recursion -- single/multiple = single = classic, multiple = ex. Fibonacci badly implemented
recursion -- structure = wrapper (top, prepare the actual recursion) + short-circuit (check for base case) + (optional, optimization) hybrid algo depending on data, since recursion is often inefficient on small data
recursion -- tail / tail-end = optimizable recursion
recursion -- tail call elimination = see tail call optimization
recursion https://en.wikipedia.org/wiki/Recursion_(computer_science)
reflexive
S3FIFO https://blog.jasony.me/system/cache/2023/08/01/s3fifo
search -- binary O(log n) = half-interval, logarithmic, binary chop, dichotomic https://en.wikipedia.org/wiki/Binary_search_algorithm
search -- exponential https://en.wikipedia.org/wiki/Exponential_search
search -- interpolation https://en.wikipedia.org/wiki/Interpolation_search
search -- linear O(n) = the worst
search -- ternary https://en.wikipedia.org/wiki/Ternary_search
search -- unary
sliding window and 2 pointers based questions
sort -- alphadev https://www.nature.com/articles/s41586-023-06004-9
sort -- bubble
sort -- burstsort
sort -- merge
sort -- quick
sort -- radix sort O(nw) https://en.wikipedia.org/wiki/Radix_sort
sort -- topological = a graph traversal in which each node is visited only after all its dependencies are visited. (need DAG) https://en.wikipedia.org/wiki/Topological_sorting
sort https://en.wikipedia.org/wiki/Sorting_algorithm
sorting -- k-sorting = roughly sorting https://cir.nii.ac.jp/crid/1050564287846744704
string -- Approximate string matching = matching despite insertion, deletion, substitution or transposition https://en.wikipedia.org/wiki/Approximate_string_matching
string -- pattern searching
string -- sorting
string -- word searching -- Knuth–Morris–Pratt algorithm (KMP) https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm
tail call optimization -- support = the language/interpreter/compiler has to support it!
tail call optimization = allow saving stack space when doing recursion by only doing a call as the last ("tail") action https://stackoverflow.com/questions/310974/what-is-tail-call-optimization
termination
termination -- proving
tower of Hanoi
Trabb Pardo-Knuth (TPK) = demo program https://en.wikipedia.org/wiki/TPK_algorithm
transitive
traveling salesman -- https://en.wikipedia.org/wiki/Held%E2%80%93Karp_algorithm
unsolved https://en.wikipedia.org/wiki/Karp%27s_21_NP-complete_problems
Zstandard = a fast compression algorithm, providing high compression ratios. It also offers a special mode for small data, called dictionary compression https://facebook.github.io/zstd/
