import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
//import { useFetch } from '../../hooks/useFetch'
import { useTheme } from '../../hooks/useTheme'
import { projectFirestore } from '../../firebase/config'


// styles
import './Recipe.css'

//old one working with json server
//export default function Recipe() {
//  const { id } = useParams()
//  const url = 'http://localhost:3000/recipes/' + id
//  const { error, isPending, data: recipe } = useFetch(url)
//  const { mode } = useTheme()

export default function Recipe() {
    const { id } = useParams()
    const { mode } = useTheme()

    const [recipe, setRecipe] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)

    useEffect( () => {
      setIsPending(true)
      
      //projectFirestore.collection('recipes').doc(id).get().then((doc) => {
      const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc) => {
        //console.log(doc)
        if (doc.exists) {
          setIsPending(false)
          setRecipe(doc.data())
        } else {
          setIsPending(false)
          setError('Could not find that recipe')
        }
      })

      return () => unsub()

    }, [id])

    const handleClick = () => {
      projectFirestore.collection('recipes').doc(id).update({
        title: 'Something different'
      })
    }

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleClick}>Update</button>
        </>
      )}
    </div>
  )
}