import ReactPlayer from "react-player";

export const YouTubeEmbed = ({ url }: { url: string }) => {
  if (!url) {
    return null;
  }

  const embedUrl = url.replace("watch?v=", "embed/");

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
