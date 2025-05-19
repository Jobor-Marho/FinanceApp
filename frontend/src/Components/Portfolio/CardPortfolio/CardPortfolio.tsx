import DeletePortfolio from "../DeletePortfolio/DeletePortfolio";
import "./CardPorfolio.css"

interface  Props {
    portfolioValue: string;
    portfolioDeleteHandler: (e: React.FormEvent<HTMLFormElement>) => void;
    name: string;
}

const CardPortfolio = ({portfolioDeleteHandler, portfolioValue, name}: Props) => {
  return (
    <>
    <div className="CardPortfolio">
      <h2>{name}</h2>
      <DeletePortfolio portfolioDeleteHandler={portfolioDeleteHandler} portfolioValue={portfolioValue}/>
    </div>
    </>
  )
}

export default CardPortfolio;