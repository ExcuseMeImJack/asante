import { useDispatch, useSelector } from "react-redux"
import { deleteUserThunk, getUserProfile } from "../../store/users"
import { useEffect } from "react"

function Home() {

    const dispatch = useDispatch()
    const storeProfile = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getUserProfile())
    }, [dispatch])

    console.log(storeProfile.profile)
    return (
        <div>
            <h1>Homepage</h1>
            <button onClick={async (e) => {
                e.preventDefault()
                await dispatch(deleteUserThunk(storeProfile.profile))
            }}>Delete User</button>
        </div>
    )
}

export default Home
