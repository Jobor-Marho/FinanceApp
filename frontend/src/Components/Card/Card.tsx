// Building a Card component in React for handling Stock data
import { Link } from "react-router-dom";
import { generateImageUrl } from "../../api";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";
import { useEffect, useState } from "react";

// Interface ssimply implies the structure of the props that the component will receive
// This is a good practice to ensure that the component receives the correct data types
interface Props {
  companyName: string;
  price: string;
  ticker: string;
  description: string;
  portfolioCreateHandler: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Card = ({
  companyName,
  price,
  description,
  ticker,
  portfolioCreateHandler,
}: Props) => {


  const [imageUrl, setImageUrl] = useState<string>(`${import.meta.env.VITE_MISSING_IMAGE_ICON}`);

  useEffect(() => {
    const getImageUrl = async () => {
      try{
        const res = await generateImageUrl(companyName);
        setImageUrl(res);
      }catch(error: any){
        console.log(error.msg)
        setImageUrl(`${import.meta.env.VITE_MISSING_IMAGE_ICON}`)
      }
    };
    getImageUrl();
  }, [companyName])

  return (
    <>
      <div className="flex flex-col items-center justify-between w-full pt-6 pb-6 ps-10 pe-10 bg-slate-100 rounded-lg md:flex-row">
        <img src={imageUrl} alt="stockimage" />
        <Link
          to={`/company/${ticker}`}
          className="font-bold text-center text-black md:text-left hover:text-blue-500 transition duration-300"
        >
          {companyName} - {ticker}
        </Link>
        <p className="text-black">{price}</p>
        <p className="font-bold text-black">{description}</p>
        <AddPortfolio
          symbol={ticker}
          onPorfolioCreate={portfolioCreateHandler}
        />
      </div>
    </>
  );
};

export default Card;
