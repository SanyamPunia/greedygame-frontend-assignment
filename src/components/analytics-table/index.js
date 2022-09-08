import React, { useEffect, useState } from 'react'
import styles from './analytics.module.scss'
import FilteredList from '../filtered-list'
import Table from '../table'

const AnalyticsTable = (props) => {
    const tags = props.tags

    const [results, setResults] = useState([])
    const [games, setGames] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    
    const sortingOrder = [
        'Name',
        'Date',
        'App',
        'Clicks',
        'Ad Requests',
        'Ad Response',
        'Impression',
        'Revenue',
    ]

    const map = new Map()
    sortingOrder.forEach((x, i) => map.set(x, i))
    tags.sort((x, y) => map.get(x) - map.get(y))

    useEffect(() => {
        async function getData() {
            const apiEndpoint = `http://go-dev.greedygame.com/v3/dummy/report?startDate=${props.initialDate}&endDate=${props.finalDate}`
            const response = await fetch(apiEndpoint)
            const data = await response.json()

            setResults(data)
        }

        getData()
    }, [])

    useEffect(() => {
        async function getGameData() {
            const apiEndpoint = 'http://go-dev.greedygame.com/v3/dummy/apps'
            const resposne = await fetch(apiEndpoint)
            const data = await resposne.json()
            const games = data.data

            setGames(games)
        }

        getGameData()
    }, [])

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Table</h1>

            <input
                className={styles.searchInput}
                type="search"
                name="search"
                placeholder="Search by name"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {!searchTerm ? (
                <Table results={results} games={games} tags={tags} />
            ) : (
                <FilteredList
                    searchTerm={searchTerm}
                    results={results}
                    games={games}
                    selectedTags={tags}
                />
            )}
        </div>
    )
}

export default AnalyticsTable
