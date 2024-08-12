export default function Error({ error }) {
    return (
        <div className="flex items-center justify-center w-full h-[500px] md:h-[700px] lg:h-[500px] xl:h-[400px] 2xl:h-[600px]">
            <div className="flex items-center p-4 mb-4 text-sm text-red-500 border border-red-300 rounded-lg" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    {error}
                </div>
            </div>
        </div>
    )
}
