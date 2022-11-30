import loadingSpinner from './icons/256x256.gif'
const Loading = () => {
    return (
        <div className="loading-screen animation">
            <img src={loadingSpinner}></img>
        </div>
    )
}

export default Loading