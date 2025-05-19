import "./CardPorfolio.css"

interface  Props {
    portfolioValue: string;
    portfolioDeleteHandler: (e: React.FormEvent<HTMLFormElement>) => void;
    name: string;
}

const CardPortfolio = ({portfolioDeleteHandler, portfolioValue, name}: Props) => {
  return (
    <>
        <form className="CardPortfolio" onSubmit={portfolioDeleteHandler}>
            <h2>{name}</h2>
            <input type="text" hidden={true} readOnly={true} value={portfolioValue} name="symbol"/>
            <button type="submit" className="delete">Delete</button>
        </form>
    </>
  )
}

export default CardPortfolio;