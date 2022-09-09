import React, { useState } from 'react'
import Header from './components/header'
import { MetricContext } from './context/Context'

const tags = [
    {
        id: 1,
        tagName: 'Name',
        visibleState: false,
    },
    {
        id: 2,
        tagName: 'Date',
        visibleState: false,
    },
    {
        id: 3,
        tagName: 'App',
        visibleState: false,
    },
    {
        id: 4,
        tagName: 'Clicks',
        visibleState: false,
    },
    {
        id: 5,
        tagName: 'Ad Requests',
        visibleState: false,
    },
    {
        id: 6,
        tagName: 'Ad Response',
        visibleState: false,
    },
    {
        id: 7,
        tagName: 'Impression',
        visibleState: false,
    },
    {
        id: 8,
        tagName: 'Revenue',
        visibleState: false,
    },
    {
        id: 9,
        tagName: 'Fill Rate',
        visibleState: false,
    },
    {
        id: 10,
        tagName: 'CTR',
        visibleState: false,
    },
]

function App() {
    const [metricData, setMetricData] = useState(tags)

    return (
        <MetricContext.Provider value={{ metricData, setMetricData }}>
            <Header />
        </MetricContext.Provider>
    )
}

export default App
