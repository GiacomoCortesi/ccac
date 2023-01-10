import * as React from "react";

interface ImageHoverProps {
    src: string
    title: string
}
export default function ImageHover(props: ImageHoverProps) {
    const [hovered, setHovered] = React.useState<boolean>(false)

  return(<img
      src={`${props.src}?fit=crop&auto=format`}
      srcSet={`${props.src}?fit=crop&auto=format`}
      alt={props.title}
      loading="lazy"
      onMouseEnter={() => {
          setHovered(true)
      }}
      onMouseOut={() => {
          setHovered(false)
      }}
      style={{maxWidth: 350, maxHeight: 350, transform: `${hovered ? 'scale(1.17,1.17)' : 'scale(1,1)'}`}}
  />)
}
