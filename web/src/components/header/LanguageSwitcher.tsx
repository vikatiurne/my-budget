const LanguageSwitcher = ({
  onchange,
  locale,
}: {
  onchange: (newLanguage: "en" | "uk") => void;
  locale: string;
}) => {
  const toggleLanguage = () => {
    const newLanguage = locale === "en" ? "uk" : "en";
    onchange(newLanguage);
  };
  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center px-4 py-2 cursor-pointer focus:outline-none"
    >
      <div
        className={
          "w-12 h-6 flex items-center bg-white rounded-full p-1 duration-300 ease-in-out"
        }
      >
        <div
          className={`w-4 h-4 bg-gray-400 rounded-full shadow-md transform duration-300 ease-in-out ${
            locale === "en" ? "translate-x-6 bg-yellow-300" : "translate-x-1 "
          }`}
        />
      </div>
      <span
        className={`ml-2 font-medium text-white ${
          locale === "en" ? "translate-x--20" : ""
        }`}
      >
        {locale === "en" ? "en" : "uk"}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
