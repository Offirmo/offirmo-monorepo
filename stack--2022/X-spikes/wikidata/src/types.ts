

export type URLString = string
export type SimpleYYYYMMDD = number

export interface Fact {
	point_in_time: SimpleYYYYMMDD,
	reference: URLString,
}


// Item (Q)

Label
A label is like a page title which describes what the item is about. It should be as short as possible (e.g. Earth, not Planet Earth)
Labels do not have to be unique as they are disambiguated by descriptions—more on this later
Use the most common name (e.g. cat not Felis catus) and only capitalize proper nouns (like London, Jupiter, or Hillary Clinton—but not city, planet, or politician)

descriptions:

	Keep it short—descriptions are not sentences.
	Try to be as accurate and as neutral as possible—avoid using information that will change over time or that is considered controversial and biased.
	Descriptions should not normally begin with initial articles like "the" or "a".
	If you're stuck, Wikipedia is a good resource for coming up with descriptions for items—often the first two sentences of the item's article will provide enough information.
