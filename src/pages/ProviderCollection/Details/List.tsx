import { useNavigate } from "react-router-dom";
import { Collection } from "../../../interfaces/collection";

interface Props {
  collections?: Collection[];
}

const List = ({ collections }: Props) => {
  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    navigate(`/collection/${id}`);
  };

  return (
    <div>
      <h3>List</h3>
      <ul>
        {collections?.map((collection, idx) => (
          <li key={idx} onClick={() => handleNavigate(collection._id)}>
            {collection.releaseDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
