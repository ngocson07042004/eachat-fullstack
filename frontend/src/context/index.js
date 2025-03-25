import AuthProvider, { AuthContext } from './AuthProvider'
import AppProvider, { AppContext } from './AppProvider'

function Provider({ children }){
    return(
        <AuthProvider>
            <AppProvider>
                {children}
            </AppProvider>
        </AuthProvider>
    )
}

export { AuthContext, AppContext }
export default Provider