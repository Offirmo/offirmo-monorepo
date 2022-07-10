
export type HtmlAsString = string

export interface Story {
	(): HtmlAsString // TODO extend return type

	decorators: Decorator[]
}

export interface Decorator {
	(story: Story): Story
}

export interface Config {
	root_title: string

	decorators: Decorator[]
}
