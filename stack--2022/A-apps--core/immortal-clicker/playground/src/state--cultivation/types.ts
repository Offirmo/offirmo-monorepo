

/////////////////////////////////////////////////

interface MortalCultivation {
    physique: number
}

interface FoundationEstablishment {
    rank: number
    method: string
}

interface Cultivation {
    rank: {
        major: number
        minor: number
    }

    rank00: MortalCultivation
    rank01: FoundationEstablishment
}

/////////////////////////////////////////////////

export {
    type Cultivation,
}