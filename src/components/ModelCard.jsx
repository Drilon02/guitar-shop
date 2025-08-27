import { Link } from 'react-router-dom';

export default function ModelCard({ model, brandId }) {
    // console.log(model, "model 1")
    return (
        <Link
            to={`/guitars/${brandId}/${model.id}`}
            className="card p-4 hover:shadow-md transition"
        >
            {model.image ? (
                <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-40 object-cover rounded-xl"
                />
            ) : (
                <div className="w-full h-40 rounded-xl bg-zinc-100 flex items-center justify-center text-3xl">
                    🎸
                </div>
            )}

            <div className="mt-3 flex items-center justify-between">
                <div className="font-semibold">{model.name}</div>
                {model.type && (
                    <span className="badge">{model.type}</span>
                )}
            </div>
        </Link>
    );
}
