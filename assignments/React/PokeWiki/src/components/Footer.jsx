export default function Footer() {
  return (
    <footer className="flex flex-col items-center">
      <div className="px-32 flex flex-col items-center w-full mt-28 h-48">
        <img className="w-52 h-full mx-8 p-2" src="../../logo.png" />
        <img className="animate-shake-perm w-60" src={"../../poketball1.png"} />
      </div>
      <div className="font-cartoon mt-20 mb-10">
        Designed and built by Kosmosticlay
      </div>
    </footer>
  );
}