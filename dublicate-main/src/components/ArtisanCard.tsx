import { Link } from "react-router-dom";

const ArtisanCard = ({ artisan }: any) => {
  return (
    <Link to={`/artisan/${artisan._id}`}>
      <div className="border rounded-lg shadow-md p-4 text-center hover:shadow-lg transition cursor-pointer">
        <h2 className="text-xl font-bold">{artisan.name}</h2>
        <p className="text-gray-600">{artisan.email}</p>
      </div>
    </Link>
  );
};

export default ArtisanCard;
