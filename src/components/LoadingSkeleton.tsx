const LoadingSkeleton = () => {
  return (
    <>
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* todays data */}
        <section>
          {/* todays data & weather today */}
          <div className="space-y-2 animate-pulse">
            <div className="flex gap-1 items-end">
              <div className="bg-gray-300 h-8 w-32 rounded"></div>
              <div className="bg-gray-300 h-8 w-20 rounded"></div>
            </div>
            <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
              {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                >
                  <div className="bg-gray-300 h-6 w-16 rounded"></div>
                  <div className="bg-gray-300 h-8 w-8 rounded-full"></div>
                  <div className="bg-gray-300 h-6 w-16 rounded"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4 pt-4 animate-pulse">
            <div className="w-24 flex-col px-4 items-center">
              <div className="bg-gray-300 h-6 w-16 rounded"></div>
              <div className="bg-gray-300 h-8 w-8 rounded-full"></div>
            </div>
            <div className="bg-gray-300/80 justify-between px-6 gap-4 overflow-x-auto w-full">
              <div className="bg-gray-300 h-6 w-24 rounded"></div>
              <div className="bg-gray-300 h-6 w-24 rounded"></div>
              <div className="bg-gray-300 h-6 w-24 rounded"></div>
              <div className="bg-gray-300 h-6 w-24 rounded"></div>
              <div className="bg-gray-300 h-6 w-24 rounded"></div>
            </div>
          </div>
        </section>

        {/* 7 day forecast */}
        <section className="flex w-full flex-col gap-4">
          <div className="text-2xl bg-gray-300 h-8 w-52 rounded animate-pulse"></div>
          {[1, 2, 3, 4, 5, 6, 7].map((index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-300 h-12 w-full rounded"></div>
              <div className="bg-gray-300 h-6 w-16 rounded"></div>
              <div className="bg-gray-300 h-6 w-32 rounded"></div>
              <div className="bg-gray-300 h-6 w-32 rounded"></div>
              <div className="bg-gray-300 h-6 w-24 rounded"></div>
              <div className="bg-gray-300 h-6 w-24 rounded"></div>
              <div className="bg-gray-300 h-6 w-32 rounded"></div>
              <div className="bg-gray-300 h-6 w-24 rounded"></div>
              <div className="bg-gray-300 h-6 w-24 rounded"></div>
              <div className="bg-gray-300 h-6 w-32 rounded"></div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default LoadingSkeleton;
