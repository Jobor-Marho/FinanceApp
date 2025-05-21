import "./Search.css";
interface Props {
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  search: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
}

const Search = ({ onSearch, search, onChange, error }: Props) => {
  return (
    <>
      {error && (
        <div className="w-80 bg-red-100 text-black p-4 border-l-8 border-red-300 mx-auto rounded-sm mt-2">
            <h1 className="text-lg font-bold">Error</h1>
            <p>{error} 🔌</p>
        </div>

      )}

      <section className="relative bg-gray-100">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <form className="form relative flex flex-col w-full p-10 space-y-4 bg-darkBlue rounded-lg md:flex-row md:space-y-0 md:space-x-3" onSubmit={onSearch}>
            <input
              type="text"
              placeholder="Search for a stock..."
              value={search}
              onChange={onChange}
              className="flex-1 w-full p-3 border-40 border-gray-300 rounded-lg placeholder-black focus:outline-none focus:ring-2 focus:ring-green-600  transition duration-200 myinput"
            />


          </form>
        </div>
      </section>
    </>
  );
};

export default Search;
