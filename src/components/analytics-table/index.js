import React, { useContext, useEffect, useState } from 'react'
import styles from './analytics.module.scss'
import { MetricContext } from '../../context/Context'
import FilteredList from '../filtered-list'

const AnalyticsTable = (props) => {
    const tags = props.tags

    const [results, setResults] = useState([])
    const [games, setGames] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const { metricData } = useContext(MetricContext)

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
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {!searchTerm ? (
                <table className={styles.tableContainer}>
                    <tr>
                        {tags.map((tag, index) => (
                            <th key={index}>{tag}</th>
                        ))}
                    </tr>
                    {results?.data?.map((result, index) => (
                        <tbody>
                            <tr key={index}>
                                {games.map((game, index) => (
                                    <>
                                        {result.app_id === game.app_id ? (
                                            <td key={index}>{game.app_name}</td>
                                        ) : null}
                                    </>
                                ))}
                                {metricData.map((tag, index) =>
                                    tag.tagName === 'Date' && tag.visibleState ? (
                                        <td key={index}>{result.date}</td>
                                    ) : null
                                )}
                                {metricData.map((tag, index) =>
                                    tag.tagName === 'App' && tag.visibleState ? (
                                        <td key={index}>{result.app_id}</td>
                                    ) : null
                                )}
                                {metricData.map((tag, index) =>
                                    tag.tagName === 'Clicks' && tag.visibleState ? (
                                        <td key={index}>{result.clicks}</td>
                                    ) : null
                                )}
                                {metricData.map((tag, index) =>
                                    tag.tagName === 'Ad Requests' && tag.visibleState ? (
                                        <td key={index}>{result.requests}</td>
                                    ) : null
                                )}
                                {metricData.map((tag, index) =>
                                    tag.tagName === 'Ad Response' && tag.visibleState ? (
                                        <td key={index}>{result.responses}</td>
                                    ) : null
                                )}
                                {metricData.map((tag, index) =>
                                    tag.tagName === 'Impression' && tag.visibleState ? (
                                        <td key={index}>{result.impressions}</td>
                                    ) : null
                                )}
                                {metricData.map((tag, index) =>
                                    tag.tagName === 'Revenue' && tag.visibleState ? (
                                        <td key={index}>{result.revenue}</td>
                                    ) : null
                                )}
                                {metricData.map((tag, index) =>
                                    tag.tagName === 'Fill Rate' && tag.visibleState ? (
                                        <td key={index}>
                                            {(result.requests / result.responses) * 100}%
                                        </td>
                                    ) : null
                                )}
                                {metricData.map((tag, index) =>
                                    tag.tagName === 'CTR' && tag.visibleState ? (
                                        <td key={index}>
                                            {(result.clicks / result.impressions) * 100}%
                                        </td>
                                    ) : null
                                )}
                            </tr>
                        </tbody>
                    ))}
                </table>
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
