import { useNavigate } from "react-router-dom";
import { CollectionGroup } from "../../interfaces/collection";

interface Props {
  collections: CollectionGroup[];
}

const List = ({ collections }: Props) => {
  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    navigate(`/collection-group/${id}`);
    // for single, navigate(`/collection/${id}` and the first item in the array
  };

  return (
    <div>
      <h3>List</h3>
      <ul>
        {collections?.map((collection, idx) => (
          <li key={idx} onClick={() => handleNavigate(collection._id)}>
            {collection.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
