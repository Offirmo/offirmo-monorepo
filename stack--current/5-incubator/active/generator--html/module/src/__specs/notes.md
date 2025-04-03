
			expect(getꓽcssⵧtop(spec)).to.deep.equal([
				"/* define namespaces for usage in following CSS, needs to be at the top https://github.com/parcel-bundler/parcel/issues/9534 */",
				"@namespace svg url(http://www.w3.org/2000/svg);",
				"/* define layers order, needs to be at the top to properly enforce the intended order */",
				"@layer reset, base;",
				])

			expect(getꓽcssⵧcritical(spec)).to.deep.equal([
				"/* define namespaces for usage in following CSS, needs to be at the top https://github.com/parcel-bundler/parcel/issues/9534 */",
				"@namespace svg url(http://www.w3.org/2000/svg);",
				"/* define layers order, needs to be at the top to properly enforce the intended order */",
				"@layer reset, base;",
				"body { color: red; }"
			])
