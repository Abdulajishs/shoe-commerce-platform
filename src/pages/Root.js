import MainNavigation from "../components/Header/MainNavigation"

const RootLayout = (props) =>{
    return(
        <>
        <MainNavigation/>
        {props.children}
        </>
    )
}

export default RootLayout;