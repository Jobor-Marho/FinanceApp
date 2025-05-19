// Building a Card component in React for handling Stock data

import './Card.css'
import { generateImageUrl } from '../../api';
import AddPortfolio from '../Portfolio/AddPortfolio/AddPortfolio';

// Interface ssimply implies the structure of the props that the component will receive
// This is a good practice to ensure that the component receives the correct data types
interface Props  {
    companyName: string;
    price: string;
    ticker:string;
    description: string;
    portfolioCreateHandler: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Card =  ({companyName, price, description, ticker, portfolioCreateHandler}: Props) => {
 const imageUrl = generateImageUrl(companyName || "Company Name");
  return (
    <>
        <div className='Card'>
            <img src={imageUrl} alt="stockimage" />
            <h1>{companyName} - {ticker}</h1>
            <h2>${price}</h2>
            <p className='description'>{description}</p>

            <AddPortfolio symbol={ticker} onPorfolioCreate={portfolioCreateHandler} />
        </div>
    </>
  )
}

export default Card