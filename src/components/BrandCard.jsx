import { Link } from 'react-router-dom';


export default function BrandCard({ brand }) {
    // console.log(brand, "brands");
    return (
        <Link to={`/brands/${brand.id}`} className="card p-4 flex items-center gap-4 hover:shadow-md transition">
            {<brand className="im"></brand> ? (
                <img src={brand.image} alt={brand.name} className="h-10 w-10 object-contain" width={30} height={30}/>
            ) : (
                <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center">🎸</div>
            )}
            <div className="font-medium">{brand.name}</div>
        </Link>
    );
}