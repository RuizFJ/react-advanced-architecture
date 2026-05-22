import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300">404</h1>
        <p className="mt-4 text-gray-500">Página no encontrada</p>
        <Link
          to="/"
          className="mt-6 inline-block text-blue-600 hover:underline"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
