import { FC, ReactNode, useState } from "react"
import {useMediaQuery} from "react-responsive"



const withDrawer = (Component: FC<{match: boolean}>) => (matches: string): ReactNode=> {

    const [mediaQueryMatch, setMediaQueryMatch] = useState(()=>match)

    const handleMediaQueryChange = (matches: boolean) => {
        if(matches) {
            setMediaQueryMatch(true)
        } else {
            setMediaQueryMatch(false)
        }
    }

    const match = useMediaQuery({query: matches}, undefined, handleMediaQueryChange)

        return (
            
            mediaQueryMatch ? (
                <Component match={mediaQueryMatch} />
            ) : (
                <Component match={mediaQueryMatch} />
            )
            
        )
}

export default withDrawer