import React from 'react'
import "./DeletePortfolio.css"

interface Props {
    portfolioValue: string;
    portfolioDeleteHandler: (e: React.FormEvent<HTMLFormElement>) => void;
}

const DeletePortfolio = ({portfolioDeleteHandler, portfolioValue}: Props) => {
  return (
    <form onSubmit={portfolioDeleteHandler}>
        <input type="text" hidden={true} readOnly={true} value={portfolioValue} name="symbol"/>
        <button type="submit" className="delete">Delete</button>
    </form>
  )
}

export default DeletePortfolio