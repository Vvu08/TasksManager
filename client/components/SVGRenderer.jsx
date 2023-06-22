import { useEffect, useRef } from 'react'

const SVGRenderer = ({ svgCode }) => {
  const svgRef = useRef(null)

  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.innerHTML = svgCode
    }
  }, [svgCode])

  return <span ref={svgRef} />
}

export default SVGRenderer
