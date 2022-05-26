import { ComponentType, Dispatch, FC, ReactNode, SetStateAction, useState } from "react"
import { MediaQueryAllQueryable } from "react-responsive"
import {useMediaQuery} from "react-responsive"



const withDrawer = <T extends { matches: MediaQueryAllQueryable, setShowDrawer: Dispatch<SetStateAction<boolean>>}>(Component: ComponentType<T>) => (props: Omit<T, "match"|"setShowDrawer">): JSX.Element=> {

    const handleMediaQueryChange = (matches: boolean) => {
  
        if(matches) {
            setMediaQueryMatch(()=>true)
        } else {
            setMediaQueryMatch(()=>false)
        }
    }

    const match = useMediaQuery(props.matches, undefined, handleMediaQueryChange)

    const [mediaQueryMatch, setMediaQueryMatch] = useState(()=>match)
    const [showDrawer, setShowDrawer] = useState(false)

        return (
            <>
            {mediaQueryMatch ? (
                showDrawer && <Component {...props as T} setShowDrawer={setShowDrawer} match={mediaQueryMatch} />
            ) : (
                <Component {...props as T} setShowDrawer={setShowDrawer} match={mediaQueryMatch} />
            )}
            </>
        )
}

export default withDrawer