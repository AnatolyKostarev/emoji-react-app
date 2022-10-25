import { useState, useEffect, useMemo } from 'react'
import { Header } from './components/Header/Header'
import { Main } from './ui/Main/Main'
import { Container } from './ui/Container/Container'
import { Cards } from './components/Cards/Cards'
import { Card } from './ui/Card/Card'
import { Preloader } from './components/Preloader/Preloader'
import Pagination from './components/Pagination/Pagination'

let PageSize = 9

function App() {
  const [emoji, setEmoji] = useState([])
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

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

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return emoji.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, emoji])

  const filtered = currentTableData.filter(
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
            {filtered.map(elem => (
              <Card
                key={elem.title}
                symbol={elem.symbol}
                title={elem.title}
                keywords={elem.keywords
                  .split(' ')
                  .filter((elem, index, arr) => index === arr.indexOf(elem))
                  .join(' ')}
              />
            ))}
          </Cards>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={emoji.length}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
          />
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
