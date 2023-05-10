import { useDispatch, useSelector } from "react-redux"
import { deleteUserThunk, getUserProfile } from "../../store/users"
import { useEffect } from "react"
import { getBoardsByUserId } from "../../store/boards"

function Home() {

    const dispatch = useDispatch()
    const storeProfile = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getUserProfile())
        dispatch(getBoardsByUserId())
    }, [dispatch])

    return (
        <div>
            <h1>Homepage</h1>
        </div>
    )
}

export default Home
