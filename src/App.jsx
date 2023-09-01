import { useState } from 'react'
import FetchForm from './FetchForm'
import TidalForm from './TidalForm';
import DisplayForm from './DisplayForm';
import './App.css'


const pages = {
  fetch: 0,
  intervals: 1,
  display: 2
}


function App() {
  const [page, setPage] = useState(pages.fetch);
  const [query, setQuery] = useState({ startDate: "", endDate: "" });
  const changePage = (page) => {
    setPage(page);
  }

  const getTimeInterval = (interval) => {
    setQuery(curr => {
      return {
        ...interval
      }
    })
    changePage(pages.display)
  }

  return (
    <>
      {page === pages.fetch && <FetchForm clickFunc={() => changePage(pages.intervals)} />}
      {page === pages.intervals && <TidalForm submitFunc={getTimeInterval} />}
      {page === pages.display && <DisplayForm query={query} />}
    </>
  )
}

export default App
