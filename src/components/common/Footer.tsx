const Footer = () => {
  return <footer className="bg-[#000] text-gray-300 py-8">
    <div className="p-10 mx-auto flex flex-col justify-around gap-10 md:flex-row ">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Renan Barros</h2>
          <p className="text-sm">
            Programador <span className="text-blue-400 font-medium"><a href="https://www.instagram.com/renan.devbarros" target="_blant">Full Stack</a></span>
          </p>
        </div>    

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Conecte-se</h3>
          <div className="flex gap-4">
            <a href="https://github.com/Renaanprofissional" target="_blank" rel="noreferrer"
               className="hover:text-blue-400 transition">GitHub</a>
            <a href="https://www.linkedin.com/in/renan-costa-barros" target="_blank" rel="noreferrer"
               className="hover:text-blue-400 transition">LinkedIn</a>
            <a href="mailto:renaan.profissional@gmail.com"
               className="hover:text-blue-400 transition">Email</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © 2025 Renan Barros. Todos os direitos reservados.
      </div>
  </footer>;
};

export default Footer;
