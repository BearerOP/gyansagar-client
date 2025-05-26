
"use client"

import React from "react"
import PropTypes from "prop-types"
import { cn } from "../../lib/utils"

const Background = React.forwardRef(({
  position = "fixed",
  gradient = true,
  dots = true,
  lines = true,
  className,
  ...props
}, ref) => {
  return (
    <>
      {gradient && (
        <div
          ref={ref}
          className={cn(
            "w-full h-full z-0",
            position === "fixed" && "fixed",
            position === "absolute" && "absolute",
            position === "relative" && "relative",
            className
          )}
          style={{
            top: 0,
            left: 0,
            filter: "contrast(1.25)",
            background: "radial-gradient(circle at 70% -70%, rgba(10, 10, 50, 1) 0%, rgba(40, 0, 80, 1) 35%, rgba(0, 0, 0, 1) 90%)",
            height: "100vh",
            width: "100%",

          }}

          {...props}
        />
      )}
      {dots && (
        <div
          className={cn(
            "w-full h-full z-0 opacity-25",
            position === "fixed" && "fixed",
            position === "absolute" && "absolute",
            position === "relative" && "relative",
            className
          )}
          style={{
            top: 0,
            left: 0,
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.1) 0.5px, transparent 0.5px)",
            backgroundSize: "16px 16px",
          }}
        />
      )}
      {lines && (
        <div
          className={cn(
            "w-full h-full z-10 opacity-30",
            position === "fixed" && "fixed",
            position === "absolute" && "absolute",
            position === "relative" && "relative",
            className
          )}
          style={{
            top: 0,
            left: 0,
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.2) 0, rgba(255, 255, 255, .5) 0.5px, transparent 0.5px, transparent 8px)",
            maskImage: "linear-gradient(to bottom left, #000 40%, transparent 70%)",
            maskSize: "100% 100%",
            maskPosition: "top right",
            maskRepeat: "no-repeat",
          }}
        />
      )}
    </>
  )
})
Background.displayName = "Background"

Background.propTypes = {
  position: PropTypes.oneOf(["fixed", "absolute", "relative"]),
  gradient: PropTypes.bool,
  dots: PropTypes.bool,
  lines: PropTypes.bool,
  className: PropTypes.string,
}
Background.displayName = "Background"

export { Background }

