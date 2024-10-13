const BgGradient = () => {
    return (
        <div className="bg-purple-900 pointer-events-none relative -z-[2] mx-auto h-[45rem] overflow-hidden [mask-image:radial-gradient(ellipse_at_center_center,#000,transparent_50%)] my-[-18.8rem] before:absolute before:inset-0 before:h-full before:w-full before:opacity-40 before:[background-image:radial-gradient(circle_at_bottom_center,hsl(210, 100%, 50%),transparent_70%)] after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[50%] after:bg-white">
        </div>
    );
}

export default BgGradient;
