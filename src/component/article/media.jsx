import { useRef, useState } from "react";

const Media = ({
  media,
  setMentionList,
  showMentions,
  setShowMentions,
  width,
  height,
}) => {
  const scrollRef = useRef(null);
  const [dragStatus, setDragStatus] = useState({
    isDragging: false,
    dragStartPosition: 0,
  });

  const onMouseDragStart = async (e) => {
    e.preventDefault();
    setDragStatus({
      isDraging: true,
      dragStartPosition: scrollRef.current.scrollLeft + e.pageX,
    });
    scrollRef.current.style.scrollSnapType = "none";
  };
  const onMouseDragChange = (e) => {
    if (dragStatus.isDraging === false) return;
    e.preventDefault();
    scrollRef.current.scrollLeft = dragStatus.dragStartPosition - e.pageX;
  };
  const onMouseDragEnd = async (e) => {
    setDragStatus({ isDraging: false, dragStartPosition: 0 });
    scrollRef.current.style.scrollSnapType = "x mandatory";
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        overflowX: media.length > 1 ? "scroll" : "hidden",
        overflowY: "hidden",
        scrollSnapType: "x mandatory",
        transition: "1s",
        width: width,
        height: height,
        scrollbarWidth: "none",
      }}
      onMouseDown={onMouseDragStart}
      onMouseMove={onMouseDragChange}
      onMouseUp={onMouseDragEnd}
      onMouseLeave={onMouseDragEnd}
      ref={scrollRef}
    >
      {media.map((singleMedia, index) => (
        <div
          key={index}
          onClick={() => {
            setMentionList(singleMedia.mentions);
            if (singleMedia.mentions.length > 0) {
              setShowMentions(!showMentions);
            }
          }}
          style={{
            width: width,
            height: height,
            scrollSnapAlign: "center",
          }}
        >
          <img
            key={singleMedia.mediaId}
            alt={singleMedia.mediaId}
            src={singleMedia.url}
            style={{
              width: width,
              height: height,
              backgroundColor: "black",
              objectFit: "contain",
            }}
          ></img>
        </div>
      ))}
    </div>
  );
};
export default Media;
