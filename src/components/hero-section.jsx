import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { cn } from "../../lib/utils";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const { pathname } = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [pathname]);

  const floatingVariant = {
    initial: { y: 0, opacity: 0 },
    animate: {
      y: [0, -10, 0],
      opacity: 1,
      transition: {
        y: {
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        },
        opacity: {
          duration: 0.8,
          ease: "easeInOut",
        },
      },
    },
  };

  return (
    <>

    <div className="flex flex-col justify-center">
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Link to="/courses/all" className="mb-10">
            <AnimatedGradientText>
              🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
              <span
                className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                )}
              >
                Start Learning
              </span>
              <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
          </Link>
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", type: "spring", damping: 10, delay: 0.3 }}
            initial={{ y: -20, opacity: 0 }}
            className="max-w-7xl mx-auto px-4 flex flex-col gap-4 items-center justify-center"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="space-y-4">
                <div className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                  <h1 className="tracking-tighter text-5xl md:text-[110px] mb-8 font-extrabold sm:text-4xl">
                    Learn. Grow. Succeed.
                  </h1>
                </div>

                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Unlock your potential with our expert-led courses. Start your learning journey today with @Gyan-Sagar.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative w-full">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          aria-label="TypeScript"
          role="img"
          viewBox="0 0 512 512"
          className="hidden lg:block size-12 absolute -top-10 -left-24 -rotate-12 drop-shadow-[0_16px_24px_rgba(49,120,198,0.35)]"
          style={{
            x: mousePosition.x * 0.01,
            y: mousePosition.y* 0.01
          }}
          variants={floatingVariant}
          initial="initial"
          animate="animate"
        >
          <rect width="512" height="512" rx="15%" fill="#3178c6" />
          <path
            fill="#ffffff"
            d="m233 284h64v-41H118v41h64v183h51zm84 173c8.1 4.2 18 7.3 29 9.4s23 3.1 35 3.1c12 0 23-1.1 34-3.4c11-2.3 20-6.1 28-11c8.1-5.3 15-12 19-21s7.1-19 7.1-32c0-9.1-1.4-17-4.1-24s-6.6-13-12-18c-5.1-5.3-11-10-18-14s-15-8.2-24-12c-6.6-2.7-12-5.3-18-7.9c-5.2-2.6-9.7-5.2-13-7.8c-3.7-2.7-6.5-5.5-8.5-8.4c-2-3-3-6.3-3-10c0-3.4.89-6.5 2.7-9.3s4.3-5.1 7.5-7.1c3.2-2 7.2-3.5 12-4.6c4.7-1.1 9.9-1.6 16-1.6c4.2 0 8.6.31 13 .94c4.6.63 9.3 1.6 14 2.9c4.7 1.3 9.3 2.9 14 4.9c4.4 2 8.5 4.3 12 6.9v-47c-7.6-2.9-16-5.1-25-6.5s-19-2.1-31-2.1c-12 0-23 1.3-34 3.8s-20 6.5-28 12c-8.1 5.4-14 12-19 21c-4.7 8.4-7 18-7 30c0 15 4.3 28 13 38c8.6 11 22 19 39 27c6.9 2.8 13 5.6 19 8.3s11 5.5 15 8.4c4.3 2.9 7.7 6.1 10 9.5c2.5 3.4 3.8 7.4 3.8 12c0 3.2-.78 6.2-2.3 9s-3.9 5.2-7.1 7.2s-7.1 3.6-12 4.8c-4.7 1.1-10 1.7-17 1.7c-11 0-22-1.9-32-5.7c-11-3.8-21-9.5-28.1-15.44z"
          />
        </motion.svg>
        
        <motion.svg
          style={{
            x: mousePosition.x * 0.01,
            y: mousePosition.y* 0.01,
          }}
          variants={floatingVariant}
          initial="initial"
          animate="animate"
          className="hidden lg:block size-16 absolute bottom-20 right-0 rotate-12 drop-shadow-[0_16px_24px_rgba(160,79,18,0.35)]"
          fill="none"
          viewBox="0, 0, 32, 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.124 5.3a.832.832 0 111.664 0 .832.832 0 01-1.664 0zM5.2 12.834a.832.832 0 111.664 0 .832.832 0 01-1.664 0zm19.856.039a.832.832 0 111.664 0 .832.832 0 01-1.664 0zm-17.451 1.14a.76.76 0 00.386-1l-.369-.835h1.452v6.545h-2.93a10.246 10.246 0 01-.332-3.911l1.793-.799zm6.074.161v-1.929h3.458c.179 0 1.261.206 1.261 1.016 0 .672-.83.913-1.513.913h-3.206zM8.958 24.561a.832.832 0 111.664 0 .832.832 0 01-1.664 0zm12.331.039a.832.832 0 111.664 0 .832.832 0 01-1.664 0zm.257-1.887a.76.76 0 00-.9.584l-.418 1.949a10.246 10.246 0 01-8.545-.041l-.417-1.949a.758.758 0 00-.9-.583l-1.721.37c-.32-.33-.617-.68-.89-1.049h8.374c.095 0 .158-.017.158-.1v-2.966c0-.086-.063-.1-.158-.1h-2.45v-1.881h2.649a1.665 1.665 0 011.629 1.412c.105.413.336 1.757.494 2.187.157.483.8 1.447 1.482 1.447h4.323c-.29.389-.607.756-.949 1.1l-1.761-.38zm4.65-7.821c.059.591.066 1.186.022 1.779h-1.051c-.105 0-.148.069-.148.172v.483c0 1.136-.641 1.384-1.2 1.447-.535.06-1.128-.224-1.2-.551a3.616 3.616 0 00-1.671-2.808c1.03-.654 2.1-1.619 2.1-2.911a3.294 3.294 0 00-1.608-2.7 4.562 4.562 0 00-2.2-.724H8.367A10.246 10.246 0 0114.1 5.84l1.282 1.344a.76.76 0 001.073.025l1.434-1.372a10.246 10.246 0 017.015 5l-.982 2.217a.761.761 0 00.386 1l1.888.838zm2.448.036l-.033-.343 1.011-.943a.42.42 0 00-.134-.676l-1.288-.483-.1-.334.806-1.12a.42.42 0 00-.263-.636l-1.363-.222-.164-.306.573-1.257a.418.418 0 00-.382-.573l-1.383.048-.224-.264.318-1.347a.42.42 0 00-.487-.487l-1.348.315-.266-.219.049-1.381a.42.42 0 00-.572-.383l-1.257.573-.306-.164-.222-1.363a.421.421 0 00-.636-.263l-1.121.806-.333-.1-.483-1.293a.421.421 0 00-.675-.135l-.943 1.012-.343-.033-.728-1.177a.421.421 0 00-.688 0l-.728 1.177-.343.033-.943-1.012a.42.42 0 00-.675.135L12.483 3.8l-.333.1-1.12-.8a.421.421 0 00-.636.263l-.222 1.363-.306.164-1.258-.573a.42.42 0 00-.572.383l.048 1.383-.266.217-1.347-.316a.42.42 0 00-.487.487L6.3 7.819l-.218.265L4.7 8.036a.422.422 0 00-.383.573l.573 1.257-.164.306-1.363.222a.42.42 0 00-.263.636l.806 1.12-.1.334-1.293.483a.421.421 0 00-.134.676l1.011.943-.033.343-1.177.728a.421.421 0 000 .688l1.177.728.033.343-1.011.943a.421.421 0 00.134.675l1.293.483.1.334-.806 1.121a.421.421 0 00.264.636l1.363.222.164.307-.573 1.257a.42.42 0 00.383.573l1.383-.048.219.266-.317 1.348a.42.42 0 00.487.486l1.345-.319.266.218-.049 1.382a.42.42 0 00.572.382l1.257-.573.306.164.222 1.362a.421.421 0 00.636.264l1.12-.807.334.1.483 1.292a.421.421 0 00.675.134l.943-1.011.343.034.728 1.177a.422.422 0 00.688 0l.728-1.177.343-.034.943 1.011a.421.421 0 00.675-.134l.483-1.292.334-.1 1.12.807a.42.42 0 00.636-.264l.222-1.362.306-.164 1.257.573a.42.42 0 00.572-.382l-.048-1.384.265-.218 1.347.317a.419.419 0 00.487-.486l-.312-1.346.218-.266 1.383.048a.42.42 0 00.382-.573l-.573-1.257.164-.307 1.363-.222a.42.42 0 00.263-.636l-.806-1.12.1-.334 1.293-.483a.42.42 0 00.134-.675l-1.011-.943.033-.343 1.177-.728a.42.42 0 000-.688l-1.176-.728z"
            fill="url(#paint0_radial)"
          />
          <defs>
            <radialGradient
              id="paint0_radial"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="matrix(12.12436 -7 4.2 7.27461 16 16)"
            >
              <stop stopColor="#7D7D7D" />
              <stop offset=".267" stopColor="#7E7C7A" />
              <stop offset=".45" stopColor="#817871" />
              <stop offset=".608" stopColor="#867162" />
              <stop offset=".753" stopColor="#8D684C" />
              <stop offset=".886" stopColor="#965C30" />
              <stop offset="1" stopColor="#A04F12" />
            </radialGradient>
          </defs>
        </motion.svg>
      
        {/* Java Logo */}
        <motion.svg
          className="hidden lg:block size-16 absolute top-40 right-20 rotate-6 drop-shadow-[0_16px_24px_rgba(231,111,0,0.35)]"
          style={{
            x: mousePosition.x * 0.01,
            y: mousePosition.y* 0.01
          }}
          variants={floatingVariant}
          initial="initial"
          animate="animate"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 128 128"
        >
          <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
          <path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"/>
          <path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"/>
          <path fill="#EA2D2E" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"/>
          <path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"/>
        </motion.svg>
        {/* Python Logo */}
        <motion.svg
          className="hidden lg:block size-16 absolute bottom-40 left-20 -rotate-6 drop-shadow-[0_16px_24px_rgba(55,118,171,0.35)]"
          style={{
            x: mousePosition.x * 0.01,
            y: mousePosition.y* 0.01
          }}
          variants={floatingVariant}
          initial="initial"
          animate="animate"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 128 128"
        >
          <linearGradient id="python-original-a" gradientUnits="userSpaceOnUse" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stopColor="#5A9FD4"/><stop offset="1" stopColor="#306998"/></linearGradient><linearGradient id="python-original-b" gradientUnits="userSpaceOnUse" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stopColor="#FFD43B"/><stop offset="1" stopColor="#FFE873"/></linearGradient><path fill="url(#python-original-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" transform="translate(0 10.26)"/><path fill="url(#python-original-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" transform="translate(0 10.26)"/><radialGradient id="python-original-c" cx="1825.678" cy="444.45" r="26.743" gradientTransform="matrix(0 -.24 -1.055 0 532.979 557.576)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#B8B8B8" stopOpacity=".498"/><stop offset="1" stopColor="#7F7F7F" stopOpacity="0"/></radialGradient><path opacity=".444" fill="url(#python-original-c)" d="M97.309 119.597c0 3.543-14.816 6.416-33.091 6.416-18.276 0-33.092-2.873-33.092-6.416 0-3.544 14.815-6.417 33.092-6.417 18.275 0 33.091 2.872 33.091 6.417z"/>
        </motion.svg>
        <motion.svg
          className="hidden lg:block size-14 absolute top-20 left-40 rotate-12 dark:drop-shadow-[0_4px_24px_rgba(255,552,245,0.35)] drop-shadow-[0_8px_24px_rgba(204,52,45,1)]"
          style={{
            x: mousePosition.x * 0.01,
            y: mousePosition.y* 0.01,
          }}
          variants={floatingVariant}
          initial="initial"
          animate="animate"
          width="800px"
          height="800px"
          viewBox="0 0 256 256"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d="M119.616813,0.0688905149 C119.066276,0.118932037 117.314565,0.294077364 115.738025,0.419181169 C79.3775171,3.69690087 45.3192571,23.3131775 23.7481916,53.4631946 C11.7364614,70.2271045 4.05395894,89.2428829 1.15112414,109.384595 C0.12512219,116.415429 0,118.492153 0,128.025062 C0,137.557972 0.12512219,139.634696 1.15112414,146.665529 C8.10791789,194.730411 42.3163245,235.11392 88.7116325,250.076335 C97.0197458,252.753556 105.778299,254.580072 115.738025,255.680985 C119.616813,256.106338 136.383187,256.106338 140.261975,255.680985 C157.453763,253.779407 172.017986,249.525878 186.382014,242.194795 C188.584164,241.068861 189.00958,240.768612 188.709286,240.518404 C188.509091,240.36828 179.124927,227.782837 167.86393,212.570214 L147.393939,184.922273 L121.743891,146.965779 C107.630108,126.098464 96.0187683,109.034305 95.9186706,109.034305 C95.8185728,109.009284 95.7184751,125.873277 95.6684262,146.465363 C95.5933529,182.52028 95.5683284,183.971484 95.1178886,184.82219 C94.4672532,186.048207 93.9667644,186.548623 92.915738,187.099079 C92.114956,187.499411 91.4142717,187.574474 87.6355816,187.574474 L83.3063539,187.574474 L82.1552297,186.848872 C81.4044966,186.373477 80.8539589,185.747958 80.4785924,185.022356 L79.9530792,183.896422 L80.0031281,133.729796 L80.0782014,83.5381493 L80.8539589,82.5623397 C81.25435,82.0369037 82.1051808,81.3613431 82.7057674,81.0360732 C83.7317693,80.535658 84.1321603,80.4856165 88.4613881,80.4856165 C93.5663734,80.4856165 94.4172043,80.6857826 95.7434995,82.1369867 C96.1188661,82.5373189 110.007429,103.454675 126.623656,128.650581 C143.239883,153.846488 165.962072,188.250034 177.122972,205.139048 L197.392766,235.839522 L198.418768,235.163961 C207.502639,229.259062 217.112023,220.852086 224.719453,212.09482 C240.910264,193.504394 251.345455,170.835585 254.848876,146.665529 C255.874878,139.634696 256,137.557972 256,128.025062 C256,118.492153 255.874878,116.415429 254.848876,109.384595 C247.892082,61.3197135 213.683675,20.9362052 167.288368,5.97379012 C159.105376,3.32158945 150.396872,1.49507389 140.637341,0.394160408 C138.234995,0.143952798 121.693842,-0.131275573 119.616813,0.0688905149 Z M172.017986,77.4831252 C173.219159,78.0836234 174.195112,79.2345784 174.545455,80.435575 C174.74565,81.0861148 174.795699,94.9976579 174.74565,126.348671 L174.670577,171.336 L166.73783,159.17591 L158.780059,147.01582 L158.780059,114.313685 C158.780059,93.1711423 158.880156,81.2862808 159.030303,80.7108033 C159.430694,79.3096407 160.306549,78.2087272 161.507722,77.5581875 C162.533724,77.0327515 162.909091,76.98271 166.837928,76.98271 C170.541544,76.98271 171.19218,77.0327515 172.017986,77.4831252 Z" fill="#000000" />
          </g>
        </motion.svg>

        {/* Solana Logo */}
        <motion.svg
          className="hidden lg:block size-12 absolute -top-80 right-72 drop-shadow-[0_16px_24px_rgba(0,0,0,0.35)]"
          style={{
            x: mousePosition.x * 0.01,
            y: mousePosition.y * 0.01,
          }}
          variants={floatingVariant}
          initial="initial"
          animate="animate"
          viewBox="0 0 397.7 311.7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="360.879" x2="141.213" y1="351.455" y2="-69.294">
            <stop offset="0" stopColor="#00ffa3"/>
            <stop offset="1" stopColor="#dc1fff"/>
          </linearGradient>
          <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" fill="url(#a)"/>
          <linearGradient id="b" gradientUnits="userSpaceOnUse" x1="264.829" x2="45.163" y1="401.601" y2="-19.148">
            <stop offset="0" stopColor="#00ffa3"/>
            <stop offset="1" stopColor="#dc1fff"/>
          </linearGradient>
          <path d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" fill="url(#b)"/>
          <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="312.548" x2="92.882" y1="376.688" y2="-44.061">
            <stop offset="0" stopColor="#00ffa3"/>
            <stop offset="1" stopColor="#dc1fff"/>
          </linearGradient>
          <path d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" fill="url(#c)"/>
        </motion.svg>
      </div>
    </div>
    </>
  );
}