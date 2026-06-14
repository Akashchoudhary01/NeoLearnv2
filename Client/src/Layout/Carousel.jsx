function Carousel({ image, title, description, slideNumber, totalSlide }) {
  return (
    <div
      id={`slide${slideNumber}`}
      className="carousel-item relative w-full flex justify-center"
    >
      <div className="flex flex-col items-center text-center max-w-xl">
        <img
          src={image}
          className="w-52 h-52 object-cover rounded-full border-4 border-base-content/20 shadow-lg"
          alt={title}
        />

        <p className="mt-6 text-base-content/70 text-lg">{description}</p>

        <h2 className="mt-4 text-2xl font-semibold">{title}</h2>
      </div>

      <div className="absolute left-2 top-1/2 -translate-y-1/2">
        <a
          href={`#slide${slideNumber === 1 ? totalSlide : slideNumber - 1}`}
          className="btn btn-circle btn-sm sm:btn-md"
        >
          ❮
        </a>
      </div>

      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <a
          href={`#slide${(slideNumber % totalSlide) + 1}`}
          className="btn btn-circle btn-sm sm:btn-md"
        >
          ❯
        </a>
      </div>
    </div>
  );
}

export default Carousel;
