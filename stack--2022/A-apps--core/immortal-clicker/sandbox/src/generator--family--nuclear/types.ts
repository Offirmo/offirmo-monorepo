
interface Sibling {
    gender: Gender
    age_diff: number
}

interface Family {
    klass: 'scholar' | 'farmer' | 'artisan' | 'merchant' | 'lower'
    //subklass

    children: Sibling[]

}
