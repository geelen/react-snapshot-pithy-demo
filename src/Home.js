import React from 'react'
import { Snapshot } from 'react-snapshot'
import Quote from './Quote'
import End from './End'

const Home = ({ quotes }) => (
  <div className="Quotes">
    {
      quotes && quotes
        .map((quote, i) => <Quote key={i} quote={quote}/>)
        .concat(
          <End key="end">
            <span>That's all the quotes we have.</span>
          </End>
        )
    }
  </div>
)

export default Snapshot.repeat({
  quotes: () => fetch('/api/quotes').then(resp => resp.json())
}).rendering(Home)
