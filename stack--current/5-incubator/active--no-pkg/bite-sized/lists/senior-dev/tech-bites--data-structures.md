[ ] https://adrianmejia.com/how-you-can-change-the-world-learning-data-structures-algorithms-free-online-course-tutorial/
[x] List of terms relating to algorithms and data structures https://en.wikipedia.org/wiki/List_of_terms_relating_to_algorithms_and_data_structures
ADT "abstract data type" = mathematical model for data types, defined by its behavior (semantics) from the point of view of a user of the data, for ex. can "create, compare, copy" https://en.wikipedia.org/wiki/Abstract_data_type
ADT -- collection -- associative -- associative array
ADT -- collection -- associative -- graph
ADT -- collection -- associative -- multiset
ADT -- collection -- associative -- set
ADT -- collection -- associative -- tree https://en.wikipedia.org/wiki/Tree_(data_structure)
ADT -- collection -- linear -- list aka. sequence = ordered, same element can appear several times
ADT -- collection -- linear -- queue -- double-ended https://en.wikipedia.org/wiki/Double-ended_queue
ADT -- collection -- linear -- queue -- priority queue -- double-ended priority queue
ADT -- collection -- linear -- queue -- priority queue = "VIP waiting line" items have priority https://en.wikipedia.org/wiki/Priority_queue
ADT -- collection -- linear -- queue = "waiting line" FIFO with front and back https://en.wikipedia.org/wiki/Queue_(abstract_data_type)
ADT -- collection -- linear -- stack = "stack of plates" LIFO push, pop, peek/top (and length/empty) https://en.wikipedia.org/wiki/Stack_(abstract_data_type)
ADT -- collection = several items used the same https://en.wikipedia.org/wiki/Collection_(abstract_data_type)
ADT -- container = several items with specific access rules https://en.wikipedia.org/wiki/Container_(abstract_data_type)
ADT -- map
ADT -- multimap
ADT -- string
ADT -- underlying primitives = array, linked lists, binary search trees, hash tables, heap
array -- associative = store (key, value) = map, dict https://en.wikipedia.org/wiki/Associative_array
array -- dynamic -- gap buffer = allows efficient insertion and deletion operations clustered near the same location (ex. text editors) https://en.wikipedia.org/wiki/Gap_buffer
array -- dynamic = mutable https://en.wikipedia.org/wiki/Dynamic_array
array -- lookup table (LUT) = replace runtime computation, ex. table of logs (or rainbow table). If "universe" of keys is too big for mem, hash table is better
AST "abstract syntax tree" = data structure used in computer science to represent the structure of a program or code snippet https://en.wikipedia.org/wiki/Abstract_syntax_tree
bloom filter = space-efficient probabilistic data structure that is used to test whether an element is a member of a set. False positive matches are possible, but false negatives are not https://en.wikipedia.org/wiki/Bloom_filter
data structure -- probabilistic = insertion uses randomness, ex. skip list https://en.wikipedia.org/wiki/Category:Probabilistic_data_structures
data structures -- active/passive -- active =  data structure with an associated thread or process that performs internal operations https://en.wikipedia.org/wiki/Active_data_structure
data structures -- active/passive -- passive = plain old data structure or plain old data (POD) = a record
data structures -- plain old (POD)
data structures -- recursive (structural recursion) = ex. linked list https://en.wikipedia.org/wiki/Recursion_(computer_science)#Recursive_data_structures_(structural_recursion)
deterministic acyclic finite state automaton (DAFSA)
dictionary = associative array = map = symbol table
dictionary problem = how to efficiently implement an associative array? https://en.wikipedia.org/wiki/Associative_array
DSA categories -- leetcode -- 01 array / string
DSA categories -- leetcode -- 02 two pointers
DSA categories -- leetcode -- 03 Sliding windows
DSA categories -- leetcode -- 04 matrix
DSA categories -- leetcode -- 05 hashmap
DSA categories -- leetcode -- 06 intervals
DSA categories -- leetcode -- 07 stacks
DSA categories -- leetcode -- 08 linked lists
DSA categories -- leetcode -- 09 binary tree general
DSA categories -- leetcode -- 10 binary tree BFS
DSA categories -- leetcode -- 11 Binary Search Tree
DSA categories -- leetcode -- 12 graph general
DSA categories -- leetcode -- 13 Graph BFS
DSA categories -- leetcode -- 14 Trie
DSA categories -- leetcode -- 15 Backtracking
DSA categories -- leetcode -- 16 Divide & conquer
DSA categories -- leetcode -- 17 Kadane's algorithm
DSA categories -- leetcode -- 18 Binary Search
DSA categories -- leetcode -- 19 Heap
DSA categories -- leetcode -- 20 bit manipulation
DSA categories -- leetcode -- 21 Math
DSA categories -- leetcode -- 22 1-dimension dynamic programming
DSA categories -- leetcode -- 22 multi-dimensional dynamic programming
graph -- adjacency list/matrix = way of representing a graph
graph -- adjacency matrix = elements indicate whether pairs of vertices are adjacent or not in the graph
graph -- Arborescence = directed graph with only 1 single possible path to a leaf https://en.wikipedia.org/wiki/Arborescence_(graph_theory)
graph -- cyclic/acyclic
graph -- degree (or valency) of a vertex = the number of edges that are incident to the vertex
graph -- degree matrix = contains information about the degree of each vertex
graph -- directed/undirected
graph -- in-degree and out-degree ?
graph -- incidence matrix = elements indicate whether vertex–edge pairs are incident or not
heap
map
piece table https://en.wikipedia.org/wiki/Piece_table 
rope -- SumTree = concurrency-friendly B-tree structure to represent text, from zed https://zed.dev/blog/zed-decoded-rope-sumtree
rope https://en.wikipedia.org/wiki/Rope_(data_structure)
search = retrieve efficiently from a set https://en.wikipedia.org/wiki/Search_data_structure
sentence diagram = way to encode a sentence
skip list = sort of optimized searchable hybrid array / linked list -- is probabilistic! https://en.wikipedia.org/wiki/Skip_list
sparse = (array or matrix) only needed elements
table -- hash = implements maps, uses a hash to pre-index + chaining/bucket (bc. collisions), see also trie (trade-offs)
tree -- B-Tree https://en.wikipedia.org/wiki/B-tree
tree -- check if balanced
tree -- Merkle = hierarchical data structure that facilitates efficient verification of large datasets
tree -- node -- internal
tree -- node -- leaf
tree -- node -- root
tree -- rooted = has a vertex designated as root
tree -- rotation = https://en.wikipedia.org/wiki/Tree_rotation
tree -- search
tree -- search tree -- binary
tree -- search tree -- binary -- AVL
tree -- search tree -- binary -- red/black
tree -- search tree -- quadtree = variant of a Tree in which each node has zero or four children, useful for spatial indexing https://medium.com/@waleoyediran/spatial-indexing-with-quadtrees-b998ae49336
tree -- search tree -- trie -- bitwise
tree -- search tree -- trie -- radix -- patricia = radix with radix = 2
tree -- search tree -- trie -- radix = compressed trie https://en.wikipedia.org/wiki/Radix_tree
tree -- search tree -- trie -- suffix tree
tree -- search tree -- trie -- word search with counts
tree -- search tree -- trie/digital tree/prefix tree = k-ary, can replace a hash table https://en.wikipedia.org/wiki/Trie
tree -- search tree = children are ordered (but not necessarily balanced)
tree -- splay
tree -- traversal -- BFS (Breadth-first search) = https://en.wikipedia.org/wiki/Breadth-first_search
tree -- traversal -- DFS (Depth-first search) = deepest first, pre-order, in-order, post-order, all-order + reverse https://en.wikipedia.org/wiki/Depth-first_search
tree -- traversal -- DFS -- iterative deepening
tree -- traversal https://en.wikipedia.org/wiki/Tree_traversal
tree https://en.wikipedia.org/wiki/Tree_(data_structure)
zipper https://en.wikipedia.org/wiki/Zipper_(data_structure)
