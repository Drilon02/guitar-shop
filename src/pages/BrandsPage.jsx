import { useQuery } from '@apollo/client';
import { GET_BRANDS } from '../graphql/queries';
import Spinner from '../components/spinner';
import ErrorState from '../components/errorState';
import BrandCard from '../components/brandCard';
import { useI18n } from '../i18n/i18n';

export default function BrandsPage() {
    const { data, loading, error } = useQuery(GET_BRANDS);
    const { t } = useI18n();

    if (loading) return <Spinner />;
    if (error) return <ErrorState message={error.message} />;

    const brands = data?.findAllBrands ?? [];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">{t('brands')}</h1>
            {brands.length === 0 && <p className="opacity-70">{t('noResults')}</p>}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {brands.map((b) => <BrandCard key={b.id} brand={b} />)}
            </div>
        </div>
    );
}