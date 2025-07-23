
Define a book in the generic sense.

The structure is a tree whose leaves are ultimately "pages",
with any kind of arbitrary depth: Book → ...BookPart... → Page

We design this data structure to be displayed in a computer interface.
For this reason:
- books are supposed to be PRE-cut into "pages" of limited size, see "inspiration"
- books are to be lazy-loadable, hence a special "cover" sub-type

We also design to be used in games, hence:
- an important distinction between "real" and "in-game/in-universe" data.
  By default, all infos are supposed to be "in universe", for ex. Author
- books are to be "customizable" to the reader, for ex. replacing the player's name by their choice of name
- books are to have "progressive reveal", for ex. the player may need some key or to learn the language




// some books can be customized and thus have several instances
// ex.
// - a child book customized so that the hero has the child's name
// - an RPG where the book refers to a changeable settings (randomized wordlbuiding, hero name, past actions...)
// NO!! The customization will now directly go in the "book experience"
/*interface BookInstance {
book_uid: string
params: { // TODO clarify
[key: string]: string
}
}*/
