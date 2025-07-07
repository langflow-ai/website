import ReactPlayer from "react-player";

export const YouTubeEmbed = ({ url }: { url: string }) => {
  if (!url) {
    return null;
  }

  // If it's just a video ID (like "TDcT9ao47Tk"), construct the full URL
  let videoUrl = url;
  if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
    videoUrl = `https://www.youtube.com/watch?v=${url}`;
  }

  const embedUrl = videoUrl.replace("watch?v=", "embed/");

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
