import { useState, useEffect, type SyntheticEvent } from 'react'

interface Hero {
  id: number
  name: string
  universe: string
  power: string
}

function App() {
  const [heroes, setHeroes] = useState<Hero[]>([])
  const [name, setName] = useState('')
  const [universe, setUniverse] = useState('')
  const [power, setPower] = useState('')

  const API_URL = 'http://localhost:3000/heroes'

  const fetchHeroes = async () => {
    const res = await fetch(API_URL)
    const data = await res.json()
    setHeroes(data)
  }

  useEffect(() => {
    fetchHeroes()
  }, [])

  const handleCreateHero = async (e: SyntheticEvent) => {
    e.preventDefault()

    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, universe, power }),
    })

    setName('')
    setUniverse('')
    setPower('')
    fetchHeroes()
  }

  return (
    <div className='bg-amber-500 px-6 grid grid-cols-1 sm:grid-cols-2'>
      <h1 className='font-bold bg-blue-300 rounded-lg w-50 px-6 m-4 gap-4 text-xl shadow-lg flex items-center'>Super-Heróis</h1>

      <form onSubmit={handleCreateHero} className='grid grid-cols-1 md:grid-cols-3 gap-6 items-center'>
        <input 
          className='bg-blue-500 rounded-lg '
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className='bg-blue-500 rounded-lg '
          type="text"
          placeholder="Universo"
          value={universe}
          onChange={(e) => setUniverse(e.target.value)}
          required
        />
        <input
          className='bg-blue-500 rounded-lg '
          type="text"
          placeholder="Poder"
          value={power}
          onChange={(e) => setPower(e.target.value)}
          required
        />
        <button className='bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-500'>Salvar</button>
      </form>

      <div className='grid'>
        {heroes.map((hero) => (
          <div className='bg-green-500' key={hero.id}>
            <h2 className='bg-stone-500 text-white'>{hero.name}</h2>
            <p className='bg-stone-500 text-white'>Universo: {hero.universe}</p>
            <p className='bg-stone-500 text-white'>Poder: {hero.power}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
