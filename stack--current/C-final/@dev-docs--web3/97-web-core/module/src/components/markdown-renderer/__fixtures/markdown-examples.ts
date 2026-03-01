
// https://daringfireball.net/projects/markdown/syntax
export const DARING_FIREBALL = `


This is a regular paragraph.

<table>
    <tr>
        <td>Foo</td>
    </tr>
</table>

This is another regular paragraph.


This is an H1
=============

This is an H2
-------------


# This is an H1

## This is an H2

###### This is an H6


# This is an H1 #

## This is an H2 ##

### This is an H3 ######


> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
>
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.


> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
id sem consectetuer libero luctus adipiscing.


> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.


> ## This is a header.
>
> 1.   This is the first list item.
> 2.   This is the second list item.
>
> Here's some example code:
>
>     return shell_exec("echo $input | $markdown_script");


*   Red
*   Green
*   Blue


+   Red
+   Green
+   Blue


-   Red
-   Green
-   Blue


1.  Bird
2.  McHale
3.  Parish


1.  Bird
1.  McHale
1.  Parish


3. Bird
1. McHale
8. Parish


*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
    viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
    Suspendisse id sem consectetuer libero luctus adipiscing.


*   Bird
*   Magic


*   Bird

*   Magic


1.  This is a list item with two paragraphs. Lorem ipsum dolor
    sit amet, consectetuer adipiscing elit. Aliquam hendrerit
    mi posuere lectus.

    Vestibulum enim wisi, viverra nec, fringilla in, laoreet
    vitae, risus. Donec sit amet nisl. Aliquam semper ipsum
    sit amet velit.

2.  Suspendisse id sem consectetuer libero luctus adipiscing.


*   This is a list item with two paragraphs.

    This is the second paragraph in the list item. You're
only required to indent the first line. Lorem ipsum dolor
sit amet, consectetuer adipiscing elit.

*   Another item in the same list.


*   A list item with a blockquote:

    > This is a blockquote
    > inside a list item.


*   A list item with a code block:

        <code goes here>


1986\\. What a great season.


(TODO more)
`

// https://commonmark.org/help/
export const COMMONMARK_HELPⵧ1 = `
*Italic*


**Bold**


# Heading 1


## Heading 2


[Link](http://a.com)


![Image](http://url/a.png)


> Blockquote


* List
* List
* List


1. One
2. Two
3. Three


---


\`Inline code\` with backticks


\`\`\`
# code block
print '3 backticks or'
print 'indent 4 spaces'
\`\`\`
`
export const COMMONMARK_HELPⵧ2 = `
_Italic_


__Bold__


Heading 1
=========


Heading 2
---------


[Link][1]

[1] : http://b.org


![Image][1]


[1]: http://url/b.jpg


- List
- List
- List


1) One
2) Two
3) Three


***


   # code block
   print '3 backticks or'
   print 'indent 4 spaces'
`

// TODO GFM

// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md
export const WITH_FRONTMATTER = `
---
eip: 210
title: Blockhash refactoring
author: Vitalik Buterin (@vbuterin)
type: Standards Track
category: Core
status: Stagnant
created: 2017-02-10
---

### Summary

Stores blockhashes in the state, reducing the protocol complexity and the need for client implementation complexity in order to process the BLOCKHASH opcode. Also extends the range of how far back blockhash checking can go, with the side effect of creating direct links between blocks with very distant block numbers, facilitating much more efficient initial light client syncing.

### Parameters

* \`CONSTANTINOPLE_FORK_BLKNUM\`: TBD
* \`SUPER_USER\`: 2**160 - 2
* \`BLOCKHASH_CONTRACT_ADDR\`: 0xf0 (ie. 240)
* \`BLOCKHASH_CONTRACT_CODE\`: see below

### Specification

If \`block.number == CONSTANTINOPLE_FORK_BLKNUM\`, then when processing the block, before processing any transactions set the code of BLOCKHASH_CONTRACT_ADDR to BLOCKHASH_CONTRACT_CODE.

If \`block.number >= CONSTANTINOPLE_FORK_BLKNUM\`, then when processing a block, before processing any transactions execute a call with the parameters:

* \`SENDER\`: SUPER_USER
* \`GAS\`: 1000000
* \`TO\`: BLOCKHASH_CONTRACT_ADDR
* \`VALUE\`: 0
* \`DATA\`: &lt;32 bytes corresponding to the block's prevhash&gt;

If \`block.number >= CONSTANTINOPLE_FORK_BLKNUM + 256\`, then the BLOCKHASH opcode instead returns the result of executing a call (NOT a transaction) with the parameters:

* \`SENDER\`: &lt;account from which the opcode was called&gt;
* \`GAS\`: 1000000
* \`TO\`: BLOCKHASH_CONTRACT_ADDR
* \`VALUE\`: 0
* \`DATA\`: 32 byte zero-byte-leftpadded integer representing the stack argument with which the opcode was called

Also, for blocks where \`block.number >= CONSTANTINOPLE_FORK_BLKNUM\`, the gas cost is increased from 20 to 800 to reflect the higher costs of processing the algorithm in the contract code.

### BLOCKHASH_CONTRACT_CODE

The Serpent source code is:

\`\`\`python
with offset = 0:
    if msg.sender == 0xfffffffffffffffffffffffffffffffffffffffe:
        with bn = block.number - 1:
            while bn:
                ~sstore(offset + ~mod(bn, 256), ~calldataload(0))
                if ~mod(bn, 256):
                    ~stop()
                bn = ~div(bn, 256)
                offset += 256
    elif ~calldataload(0) >= 0 and ~calldataload(0) < block.number:
        with tbn = ~calldataload(0):
            with dist_minus_one = block.number - tbn - 1:
                while dist_minus_one >= 256 && ~mod(tbn, 256) == 0:
                    offset += 256
                    tbn = ~div(tbn, 256)
                    dist_minus_one = ~div(dist_minus_one, 256)
                if dist_minus_one >= 256:
                    return(0)
                return(~sload(offset + ~mod(tbn, 256)))
    else:
        return(0)
\`\`\`

The EVM init code is:

\`\`\`
0x6100f58061000e60003961010356600073fffffffffffffffffffffffffffffffffffffffe33141561005857600143035b801561005257600035610100820683015561010081061561003f57005b6101008104905061010082019150610022565b506100f3565b600060003512151561006e574360003512610071565b60005b156100e7576000356001814303035b6101008112151561009857600061010083061461009b565b60005b156100ba57610100830192506101008204915061010081049050610080565b610100811215156100d057600060a052602060a0f35b610100820683015460c052602060c0f350506100f2565b600060e052602060e0f35b5b505b6000f3
\`\`\`

The EVM bytecode that the contract code should be set to is:

\`\`\`
0x600073fffffffffffffffffffffffffffffffffffffffe33141561005857600143035b801561005257600035610100820683015561010081061561003f57005b6101008104905061010082019150610022565b506100f3565b600060003512151561006e574360003512610071565b60005b156100e7576000356001814303035b6101008112151561009857600061010083061461009b565b60005b156100ba57610100830192506101008204915061010081049050610080565b610100811215156100d057600060a052602060a0f35b610100820683015460c052602060c0f350506100f2565b600060e052602060e0f35b5b50
\`\`\`

### Rationale

This removes the need for implementations to have an explicit way to look into historical block hashes, simplifying the protocol definition and removing a large component of the "implied state" (information that is technically state but is not part of the state tree) and thereby making the protocol more "pure". Additionally, it allows blocks to directly point to blocks far behind them, which enables extremely efficient and secure light client protocols.
`

/////////////////////////////////////////////////

export const CLAUDE__BASIC = `# Hello World

This is a paragraph with **bold**, *italic*, and \`inline code\`.

## Getting Started

Here is a [link](https://example.com) and some content.

### Installation

\`\`\`bash
npm install react-markdown
\`\`\`

## Features

- Item one
- Item two
- Item three

1. First
2. Second
3. Third

> A blockquote with some wisdom.
`

export const CLAUDE__GFM = `## GFM Features

### Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Tables | Done | GFM extension |
| Strikethrough | Done | ~~like this~~ |
| Task Lists | Done | See below |

### Task Lists

- [x] Completed task
- [ ] Pending task
- [x] Another done

### Autolinks

Visit https://example.com for more info.

### Strikethrough

This is ~~deleted~~ text.
`

export const CLAUDE__CODE_BLOCKS = `## Code Examples

### JavaScript

\`\`\`javascript
function hello() {
  console.log('Hello, world!')
}
\`\`\`

### TypeScript

\`\`\`typescript
interface Props {
  content: string
  className?: string
}

function Component({ content, className }: Props): JSX.Element {
  return <div className={className}>{content}</div>
}
\`\`\`

### Inline

Use \`npm install\` to install dependencies.
`

export const CLAUDE__DUPLICATE_HEADINGS = `# Document

## Setup

First setup section.

## Setup

Second setup section (id should be setup-1).

## Setup

Third setup section (id should be setup-2).
`
