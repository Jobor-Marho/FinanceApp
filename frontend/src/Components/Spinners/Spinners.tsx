import { ClipLoader } from "react-spinners";
import "./Spinners.css";
import BluredBG from "../BluredBG/BluredBG";

type Props = {
  isLoading?: boolean;
};

const Spinners = ({ isLoading = true }: Props) => {
  return (
    <>
      <BluredBG isLoading={isLoading} />
      <div id="loading-spinners" className={isLoading ? "active" : ""}>
        <ClipLoader
          loading={true}
          color="#36b7b7"
          size={37}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
};

export default Spinners;
