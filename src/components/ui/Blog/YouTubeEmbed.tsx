import ReactPlayer from "react-player";

export const YouTubeEmbed = ({ url }: { url: string }) => {
  if (!url) {
    return null;
  }

  // Extract video ID from various YouTube URL formats
  let videoId = url;

  // If it's a full URL, extract the ID
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const urlObj = new URL(url.replace("youtu.be/", "youtube.com/watch?v="));
    videoId = urlObj.searchParams.get("v") || url.split("/").pop() || url;
  }

  // Construct privacy-enhanced embed URL
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

  return (
    <div className="youtube-embed rounded-2 overflow-hidden my-4">
      <ReactPlayer
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ aspectRatio: "16/9" }}
        controls={true}
        autoPlay={false}
      />
    </div>
  );
};

export default YouTubeEmbed;
