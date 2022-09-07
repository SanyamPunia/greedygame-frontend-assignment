import React, { useContext, useState } from 'react'
import './header.scss'
import { HiAdjustments } from 'react-icons/hi'
import { MetricContext } from '../../context/Context'
import AnalyticsTable from '../analytics-table/'

const Header = () => {
    const currentDate = new Date().toISOString().slice(0, 10)
    let selectedTags = []
    const { metricData } = useContext(MetricContext)
    const [showMetric, setShowMetric] = useState(false)
    const [tagData, setTagData] = useState([])

    const [showTable, setShowTable] = useState(false)

    const [initialDate, setInitialDate] = useState(currentDate)
    const [finalDate, setFinalDate] = useState(currentDate)

    const isMetricVisible = () => {
        setShowMetric(true)
    }

    const handleSelectTag = (e) => {
        const checkedTagData = e.target.value

        if (e.target.checked) {
            metricData.map((tag) => {
                if (tag.tagName === checkedTagData) {
                    tag.visibleState = true
                }
            })
            if (!selectedTags.includes(checkedTagData)) {
                selectedTags.push(checkedTagData)
            }
        } else {
            metricData.map((tag) => {
                if (tag.tagName === checkedTagData) {
                    tag.visibleState = false
                }
            })
            let i = 0
            while (i < selectedTags.length) {
                if (selectedTags[i] === checkedTagData) {
                    selectedTags.splice(i, 1)
                } else {
                    ++i
                }
            }
        }
    }

    const handleTagSubmit = () => {
        if (selectedTags.length === 0) {
            alert('Please select atleast one tag')
            setShowTable(false)
            window.location.reload(false)
        } else {
            setTagData(selectedTags)
            selectedTags = []
            setShowMetric(false)
            setShowTable(true)
        }
    }

    return (
        <div className="container">
            <h1 className="title">Analytics</h1>
            <div className="button-container">
                <div className="date-container">
                    <div className="date">
                        <span>From</span>
                        <input
                            type="date"
                            value={initialDate}
                            onChange={(e) => setInitialDate(e.target.value)}
                        />
                    </div>
                    <div className="date">
                        <span>To</span>
                        <input
                            type="date"
                            value={finalDate}
                            onChange={(e) => setFinalDate(e.target.value)}
                        />
                    </div>
                </div>
                <button className="setting-button" onClick={isMetricVisible}>
                    <span>
                        <HiAdjustments />
                    </span>
                    Settings
                </button>
            </div>
            {showMetric ? (
                <>
                    <div className="metric-container">
                        <h1>Dimensions and Metric</h1>
                        <div className="tag-list-container">
                            {metricData.map((tag) => (
                                <label
                                    className="tag-list"
                                    key={tag.id}
                                    onClick={(e) => handleSelectTag(e)}
                                >
                                    <input type="checkbox" value={tag.tagName} />
                                    {tag.tagName}
                                </label>
                            ))}
                        </div>

                        <div className="metric-button-container">
                            <button onClick={() => setShowMetric(false)}>Close</button>
                            <button onClick={handleTagSubmit}>Apply Changes</button>
                        </div>
                    </div>
                </>
            ) : null}

            {showTable ? (
                <AnalyticsTable tags={tagData} initialDate={initialDate} finalDate={finalDate} />
            ) : (
                <h1 className="">Select Date Range</h1>
            )}
        </div>
    )
}

export default Header
