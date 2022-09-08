import React from 'react'
import styles from './table.module.scss'
import { useContext } from 'react'
import { MetricContext } from '../../context/Context'

const Table = (props) => {
    const results = props.results
    const games = props.games
    const tags = props.tags

    const { metricData } = useContext(MetricContext)

    return (
        <div className={styles.container}>
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
        </div>
    )
}

export default Table
