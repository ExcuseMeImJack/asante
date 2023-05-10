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
        </div>
    )
}

export default Home
