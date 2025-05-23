import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="container-custom py-16 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <MapPin className="h-24 w-24 text-primary-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn btn-primary px-6 py-3 text-lg">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
