https://markdoc.io/
https://github.com/cure53/DOMPurify/wiki/Security-Goals-&-Threat-Model

https://developer.mozilla.org/en-US/docs/Web/HTML/Microdata
https://developer.mozilla.org/en-US/docs/Web/HTML/microformats


https://www.awsgeek.com/KubeCon-Virtual-2020/Managing-2-5-Million-Lines-of-YAML/

https://developers.google.com/search/docs/appearance/structured-data/article

https://webhint.io/docs/user-guide/hints/

https://marked.js.org/

https://www.mathjax.org/

markdown header


length of text / intro
https://www.researchgate.net/publication/324329159_How_Constraints_Affect_Content_The_Case_of_Twitter%27s_Switch_from_140_to_280_Characters




## hierarchy of file formats

human-readable -> machine-readable
no expertise needed -> expertise needed
"expressivity" (reduce duplication)
'+++ https://pkl-lang.org/blog/introducing-pkl.html
'+++ https://medium.com/kurtosis-tech/pkl-and-the-goldilocks-problem-of-configuration-languages-dc36621e102a

1. text
   1. unstructured
   1. semi-structured = text with some markup, permissive, no "syntax error"
      * markdown https://daringfireball.net/projects/markdown/
        * mixed with YAML front matter https://jekyllrb.com/docs/front-matter/
      * stricter markdown http://commonmark.org/
      * html
   1. structured = code
      1. "static languages"
         * json https://www.json.org/
         * YAML
         * property lists
      1. "hybrid/blend"
         * pkl https://pkl-lang.org/index.html
         * dhall https://dhall-lang.org/
      1. DSL
      1. "general-purpose languages" (powerful but: complex, ankward, tied to their ecosysytems)
         * js etc.
1. binary

Opportunities:
- vaguely structured markdown
- snowflake config
