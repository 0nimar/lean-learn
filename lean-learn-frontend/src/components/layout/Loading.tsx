const Loading = () => (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <div
          className="w-4 h-4 bg-[#00A3FF] rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="w-4 h-4 bg-[#00A3FF] rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        />
        <div
          className="w-4 h-4 bg-[#00A3FF] rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        />
      </div>
      <span className="text-[#00A3FF] text-xl font-medium">Loading...</span>
    </div>
  </div>
);
export default Loading