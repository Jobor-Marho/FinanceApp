import DeletePortfolio from "../DeletePortfolio/DeletePortfolio";


interface  Props {
    portfolioValue: string;
    portfolioDeleteHandler: (e: React.FormEvent<HTMLFormElement>) => void;
    name: string;
}

const CardPortfolio = ({portfolioDeleteHandler, portfolioValue, name}: Props) => {
  return (
    <>
    <div className="flex flex-col w-full p-8 space-y-4 text-center rounded-lg shadow-lg md:w-1/3">
      <p className="pt-6 text-xl font-bold">{name}</p>
      <DeletePortfolio portfolioDeleteHandler={portfolioDeleteHandler} portfolioValue={portfolioValue}/>
    </div>
    </>
  )
}

export default CardPortfolio;