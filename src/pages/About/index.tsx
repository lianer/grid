export default function About() {
  return (
    <div className="relative flex flex-row w-screen h-screen">
      <div className="w-[100px] h-full bg-gray-200">Sidebar</div>
      <div className="flex-1 relative h-full bg-gray-100">
        Container
        <div className="relative p-8">
          Wrapper
          <div className="absolute left-[200px] top-[100px] w-8 h-8 bg-gray-600"></div>
        </div>
      </div>
    </div>
  );
}
