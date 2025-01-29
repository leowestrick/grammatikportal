interface YouTubeVideoProps {
    videoId: string
    title: string
}

export function YouTubeVideo({ videoId, title }: YouTubeVideoProps) {
    return (
        <div className="mt-4 mb-8">
            <h3 className="text-lg font-semibold mb-2">Erklärvideo</h3>
            <div className="p-10 pt-2">
                <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-full mx-auto">
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                    ></iframe>
                </div>
            </div>
        </div>
    )
}
