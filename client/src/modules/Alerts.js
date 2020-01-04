import React from 'react';

let alertsMap = []

const callAlertsMap = (alerts) => {
    alertsMap = alerts.map(item =>
        // Must give the items unique keys!
        <div key={`alerts-${item.title}-${item.description}`}>
            <h5>{item.title}</h5>
            <p>
                {item.description}
            </p>
        </div>
    )
}
export { callAlertsMap, alertsMap };