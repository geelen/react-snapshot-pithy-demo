import React from 'react'
import { snapshot } from 'react-snapshot'
import Quote from './Quote'
import End from './End'

export class Author extends React.Component {
  state = { quotes: null }

  componentWillMount() {
    snapshot(() => (
      fetch(`/api/authors/${this.props.id}`)
        .then(response => response.json())
    ))
      .then(quotes => {
        this.setState({ quotes })
      }, () => this.setState({ error: true }))
  }

  render() {
    const { quotes } = this.state
    return (
      <div className="Quotes">
        { this.props.exclude && <div/> }
        {
          quotes && quotes.map((quote, i) =>
            this.props.exclude === quote.id
              ? null
              : <Quote key={i} quote={quote}/>
          ).concat(
            <End key="end">
              <span>No more quotes for <em>{quotes[0].name}</em>.</span>
            </End>
          )
        }
      </div>
    )
  }
}

export default ({ match: { params } }) => <Author id={params.id}/>
