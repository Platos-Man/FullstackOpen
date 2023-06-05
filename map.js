const arr = [1, 2, 3, 4, 5, 6]
const addThree = (x) => x + 3
console.log(arr.map(addThree))

const animals = [
    { name: "Fluffykins", species: 'rabbit' },
    { name: "Carl", species: 'dog' },
    { name: "Hamilton", species: 'dog' },
    { name: "Harold", species: 'fish' },
    { name: "Ursula", species: 'cat' },
    { name: "Jimmy", species: 'fish' },
]
const animalNames = animals.map((animal) => animal.name)
console.log(animalNames)