

export function BaseClosed() {
	return `
<details>
	<summary>summary</summary>
	Content
</details>
	`
}

export function BaseOpened() {
	return `
<details open>
	<summary>summary</summary>
	Content
</details>
	`
}

export function WithParagraphs() {
	return `
<details open>
	<summary>summary</summary>
	<p>Content 1</p>
	<p>Content 2</p>
</details>
	`
}

export function NestedSimple() {
	return `
<details open>
	<summary>summary 1</summary>
	<details open>
		<summary>summary 2</summary>
		<details open>
			<summary>summary 3</summary>
		</details>
	</details>
</details>
	`
}

export function NestedMixed() {
	return `
<details open>
	<summary>summary 1</summary>
	<details open>
		<summary>summary 2</summary>
		<details open>
			<summary>summary 3</summary>
			<ol>
				<li>item 1.3</li>
				<li>item 2.3</li>
			</ol>
		</details>
		<ol>
			<li>item 1.2</li>
			<li>item 2.2</li>
		</ol>
	</details>
	<ol>
		<li>item 1.0</li>
		<li>item 2.0</li>
	</ol>
</details>
	`
}
