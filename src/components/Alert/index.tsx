export const Alert = () => {
    return (
        <div className="fixed bg-red-100 bottom-10 right-10 xs:w-20 w-1/3 max-w-[450px] border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
            <strong className="font-bold mr-2">Error!</strong>
            <span className="block sm:inline">Something happened, please try again.</span>
        </div>
    )
}