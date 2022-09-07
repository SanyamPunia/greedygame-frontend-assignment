import React, { useState } from 'react'
import Header from './components/header'
import { MetricContext } from './context/Context'

const tags = [
    {
        id: 1,
        tagName: 'Name',
        selected: true,
        visibleState: false,
    },
    {
        id: 2,
        tagName: 'Date',
        selected: true,
        visibleState: false,
    },
    {
        id: 3,
        tagName: 'App',
        selected: true,
        visibleState: false,
    },
    {
        id: 4,
        tagName: 'Clicks',
        selected: true,
        visibleState: false,
    },
    {
        id: 5,
        tagName: 'Ad Requests',
        selected: true,
        visibleState: false,
    },
    {
        id: 6,
        tagName: 'Ad Response',
        selected: true,
        visibleState: false,
    },
    {
        id: 7,
        tagName: 'Impression',
        selected: true,
        visibleState: false,
    },
    {
        id: 8,
        tagName: 'Revenue',
        selected: true,
        visibleState: false,
    },
    {
        id: 9,
        tagName: 'Fill Rate',
        selected: true,
        visibleState: false,
    },
    {
        id: 10,
        tagName: 'CTR',
        selected: true,
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
