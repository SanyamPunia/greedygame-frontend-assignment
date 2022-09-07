import React, { useContext } from 'react'
import styles from './filter.module.scss'
import { MetricContext } from '../../context/Context'

const FilteredList = (props) => {
    const searchTerm = props.searchTerm
    const results = props.results
    const games = props.games
    const selectedTags = props.selectedTags
    const { metricData } = useContext(MetricContext)

    return (
        <div>
            {games
                .filter((val) => {
                    if (searchTerm === '') return val
                    else if (val.app_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                    }
                })
                .map((game, key) => {
                    return (
                        <div key={key} className={styles.container}>
                            <h1>{game.app_name}</h1>

                            <table className={styles.tableContainer}>
                                <tr>
                                    {selectedTags.map((tag, index) => (
                                        <th key={index}>{tag}</th>
                                    ))}
                                </tr>
                                {results?.data.map((result, index) => (
                                    <tbody>
                                        {result.app_id === game.app_id ? (
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
                                                    tag.tagName === 'Ad Requests' &&
                                                    tag.visibleState ? (
                                                        <td key={index}>{result.requests}</td>
                                                    ) : null
                                                )}
                                                {metricData.map((tag, index) =>
                                                    tag.tagName === 'Ad Response' &&
                                                    tag.visibleState ? (
                                                        <td key={index}>{result.responses}</td>
                                                    ) : null
                                                )}
                                                {metricData.map((tag, index) =>
                                                    tag.tagName === 'Impression' &&
                                                    tag.visibleState ? (
                                                        <td key={index}>{result.impressions}</td>
                                                    ) : null
                                                )}
                                                {metricData.map((tag, index) =>
                                                    tag.tagName === 'Revenue' &&
                                                    tag.visibleState ? (
                                                        <td key={index}>{result.revenue}</td>
                                                    ) : null
                                                )}
                                                {metricData.map((tag, index) =>
                                                    tag.tagName === 'Fill Rate' &&
                                                    tag.visibleState ? (
                                                        <td key={index}>
                                                            {(result.requests / result.responses) *
                                                                100}
                                                            %
                                                        </td>
                                                    ) : null
                                                )}
                                                {metricData.map((tag, index) =>
                                                    tag.tagName === 'CTR' && tag.visibleState ? (
                                                        <td key={index}>
                                                            {(result.clicks / result.impressions) *
                                                                100}
                                                            %
                                                        </td>
                                                    ) : null
                                                )}
                                            </tr>
                                        ) : null}
                                    </tbody>
                                ))}
                            </table>
                        </div>
                    )
                })}
        </div>
    )
}

export default FilteredList
