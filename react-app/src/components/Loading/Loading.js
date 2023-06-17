import SyncLoader from "react-spinners/SyncLoader";
import './Loading.css'

const Loading = () => {
  return (
    <div className="loading-bar">
      <SyncLoader color="#da3636" size={50}/>
    </div>
  )
};

export default Loading
