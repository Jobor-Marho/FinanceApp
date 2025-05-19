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
      <form className="search" onSubmit={onSearch}>
        <input
          type="text"
          placeholder="Search for a stock..."
          value={search}
          onChange={onChange}
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default Search;
