import { useState } from 'react'
import Home from './pages/Home'
import Filters from './pages/Filters';
import Display from './pages/Display';
import './App.css'

const pages = {
  home: 0,
  filters: 1,
  display: 2
}

function App() {
  const [page, setPage] = useState(pages.home);
  const [range, setRange] = useState({ requestedStart: "", requestedEnd: "" });
  const [data, setData] = useState(new Array());
  const changePage = (page) => {
    setPage(page);
  }

  const getTimeInterval = (requestedRange, requestedData) => {
    const startDate = new Date(requestedRange.requestedStart);
    const endDate = new Date(requestedRange.requestedEnd);
    endDate.setDate(endDate.getDate() - 1);
    const formattedStart = startDate.toISOString().slice(0, 10);
    const formattedEnd = endDate.toISOString().slice(0, 10);
    setRange({ requestedStart: formattedStart, requestedEnd: formattedEnd });
    setData(curr => requestedData);
    changePage(pages.display)
  }

  return (
    <main>
      {page === pages.home && <Home clickFunc={() => changePage(pages.filters)} />}
      {page === pages.filters && <Filters submitFunc={getTimeInterval} />}
      {page === pages.display && <Display requestFunc={() => changePage(pages.filters)}
        range={range} data={data} />}
    </main>
  )
}

export default App
