import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={466}
        viewBox="0 0 280 466"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="136" cy="132" r="121" />
        <rect x="0" y="266" rx="10" ry="10" width="280" height="27" />
        <rect x="0" y="312" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="426" rx="10" ry="10" width="92" height="30" />
        <rect x="127" y="417" rx="30" ry="30" width="152" height="45" />
    </ContentLoader>
)

export default Skeleton
