"use client";

import { useSearchParams } from "next/navigation";

export const SequelEmbed = ({ id }: { id: string }) => {
  const searchParams = useSearchParams();

  if (!id) {
    return null;
  }

  return (
    <>
      <iframe
        allow="camera *; microphone *; autoplay; display-capture *; picture-in-picture"
        allowFullScreen={true}
        className="sequel-iframe"
        title="Sequel event"
        width="100%"
        height="90vh"
        frameBorder="0"
        src={`https://embed.sequel.io/event/${id}?${searchParams.toString()}`}
        style={{
          height: "90vh",
          borderRadius: "12px",
          border: `1px solid rgb(219, 223, 236)`,
          boxShadow: "rgba(20, 20, 43, 0.04) 3px 3px 10px 0px",
          width: "100%",
        }}
      ></iframe>
    </>
  );
};

export default SequelEmbed;
