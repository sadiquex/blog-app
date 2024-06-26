export default function Hero() {
  return (
    <div
      className="flex h-[60vh] items-center justify-center p-4 sm:p-0"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)",
      }}
    >
      <p className="container w-full text-center font-bricolage text-5xl font-bold sm:w-[50%]">
        Discover Inspiring Stories and Ideas from Our Community
      </p>
    </div>
  );
}
