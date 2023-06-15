
type Sex = 'male' | 'female' | 'unclear'

interface Sibling {
	sex: Sex
	age_diff: number
}

interface NuclearFamily {
	occupation: 'scholar' | 'farmer' | 'artisan' | 'merchant' | 'lower'

	lastname: string

	father: {
		firstname: string
	}

	mother: {
		firstname: string
		lastname: string
	}

	children: Sibling[]
}
