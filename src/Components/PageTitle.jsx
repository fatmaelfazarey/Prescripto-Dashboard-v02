import React from 'react'

const PageTitle = (props) => {
    return (
        <div>
            <h3 style={{ color: "var(--page-title)", fontWeight: "500", fontSize: "1.375rem", lineHeight: "27.72px", margin: '0px', padding: '0px' }}>{props.title}</h3>
        </div>
    )
}

export default PageTitle
