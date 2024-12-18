interface YouTubeVideoProps {
  videoId: string;
  title: string;
}

export function YouTubeVideo({ videoId, title }: YouTubeVideoProps) {
  return (
    <div className="aspect-w-16 aspect-h-9 mb-8">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-lg shadow-lg"
      ></iframe>
    </div>
  );
}

