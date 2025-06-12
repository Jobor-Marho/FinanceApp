import { useEffect, useState } from 'react'
import { type CompanyTenK } from '../../company.d';
import { getTenk } from '../../api';
import TenKFinderItem from './TenKFinderItem/TenKFinderItem';
import Spinners from '../Spinners/Spinners';

type Props = {
    ticker: string;
}

const TenkFinder = ({ticker}: Props) => {
    const [companyData, setCompanyData] = useState<CompanyTenK[]>();
    useEffect(() => {
        const getTenKData = async () => {
            const res = await getTenk(ticker);
            setCompanyData(res?.data)
        }

        getTenKData();
    }, [ticker])
  return (
    <div className='rounded-md shadow-sm m-4'>
        {companyData ? (
            companyData.slice(0, 5).map((tenk) => {
                return <>
                    <TenKFinderItem tenK={tenk}/>
                </>
            })
        ): (
            <>
                <Spinners />
            </>
        )}
    </div>
  )
}

export default TenkFinder;