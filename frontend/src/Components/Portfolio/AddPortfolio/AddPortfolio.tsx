import "./AddPortfolio.css";

interface Props {
    symbol: string;
    onPorfolioCreate: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AddPortfolio = ({symbol, onPorfolioCreate}: Props) => {
  return (

    <form onSubmit={onPorfolioCreate} className="AddPortfolio">
        <input type="text" hidden={true} readOnly={true} value={symbol} name="symbol"/>
        <button type="submit">Add</button>
    </form>

  )
}

export default AddPortfolio;