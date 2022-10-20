import { useState, useEffect } from 'react'
import { Header } from './components/Header/Header'
import { Main } from './ui/Main/Main'
import { Container } from './ui/Container/Container'
import { Cards } from './components/Cards/Cards'
import { Card } from './ui/Card/Card'
import { Preloader } from './components/Preloader/Preloader'

function App() {
  const [emoji, setEmoji] = useState([])
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    async function fetchEmoji() {
      try {
        const url = 'https://emoji-api-app.herokuapp.com/'
        const data = await (await fetch(url)).json()
        setEmoji(data)
        setIsLoading(false)
      } catch (e) {
        setIsError(true)
        setIsLoading(false)
      }
    }
    fetchEmoji()
  }, [])

  const emojiHandler = e => setValue(e.target.value.toLowerCase().trim())

  const filtered = emoji.filter(
    item =>
      item.keywords.toLowerCase().includes(value) ||
      item.title.toLowerCase().includes(value)
  )

  return (
    <>
      <Header onInput={emojiHandler} value={value} />
      <Main>
        <Container>
          {isLoading && <Preloader />}
          <Cards>
            {filtered.map((elem, index) => (
              <Card
                key={index}
                symbol={elem.symbol}
                title={elem.title}
                keywords={elem.keywords
                  .split(' ')
                  .filter((elem, index, arr) => index === arr.indexOf(elem))
                  .join(' ')}
              />
            ))}
          </Cards>
          {isError && (
            <p
              style={{
                position: 'relative',
                top: '100px',
                fontSize: '36px',
                textAlign: 'center',
              }}
            >
              Что-то пошло не так. Попробуйте позже.
            </p>
          )}
        </Container>
      </Main>
    </>
  )
}

export default App
