import { Newspaper } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full h-20 bg-[#032539] rounded-b-lg flex justify-between items-center">
      <div className="flex gap-1 ml-5">
        <Newspaper className="text-blue-300" />
        <h2 className="font-bold text-white">
          <span className="text-blue-300">Dev</span>Curriculo
        </h2>
      </div>
      <div className="mr-5">
        <h1 className="text-[#d78b30] font-bold cursor-pointer">Crie seu currículo</h1>
      </div>
    </header>
  );
};

export default Header;
