// import { useFetch } from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import RecipeList from '../../components/RecipeList'
import { projectFirestore } from '../../firebase/config'

// styles
import './Home.css'

export default function Home() {
//  const { data, isPending, error } = useFetch('http://localhost:3000/recipes')

  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect( () => {
    setIsPending(true)

  {/*

    projectFirestore.collection('recipes').get().then((snapshot) => {
      //console.log(snapshot)
      if (snapshot.empty) {
        setError('No recipes to load')
        setIsPending(false)
      } else {
        let results = []
        snapshot.docs.forEach(doc => {
          //console.log(doc)
          results.push({ id: doc.id, ...doc.data() })
        })
        setData(results)
        setIsPending(false)
      }
    }).catch(err => {
      setError(err.message)
      setIsPending(false)
    })

  }, [])
*/}

const unsub = projectFirestore.collection('recipes').onSnapshot((snapshot) => {
    //delete ettiğimizde anında değişmesini sağlayan fonksiyon
  if (snapshot.empty) {
    setError('No recipes to load')
    setIsPending(false)
  } else {
    let results = []
    snapshot.docs.forEach(doc => {
      //console.log(doc)
      results.push({ id: doc.id, ...doc.data() })
    })
    setData(results)
    setIsPending(false)
  }
}, (err) => {
  setError(err.message)
  setIsPending(false)
})

  return () => unsub()

}, [])

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}
