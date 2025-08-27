import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_GUITAR_DETAILS } from '../graphql/queries';
import Spinner from '../components/spinner';
import ErrorState from '../components/errorState';
import Tabs from '../components/tabs';
import { useI18n } from '../i18n/i18n';

export default function DetailsPage() {
    const { brandId, modelId } = useParams();

    const { data, loading, error } = useQuery(GET_GUITAR_DETAILS, {
        variables: { brandId, modelId },
    });

    const navigate = useNavigate();
    const { t } = useI18n();

    console.log("data details", data);

    const [tab, setTab] = useState('specs');
    const [show, setShow] = useState(2);

    if (loading) return <Spinner />;
    if (error) return <ErrorState message={error.message} />;

    const guitar = data?.findUniqueModel;

    if (!guitar) return <ErrorState message="Not found" />;
    const specs = guitar.specs
        ? Object.entries(guitar.specs).map(([key, value]) => ({ key, value }))
        : [];

    const musicians = guitar.musicians || [];

    return (
        <div className="space-y-4">
            <button onClick={() => navigate(-1)} className="btn">
                ← {t('back')}
            </button>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Guitar Image */}
                <div className="card p-4">
                    {guitar.image ? (
                        <img
                            src={guitar.image}
                            alt={guitar.name}
                            className="w-full h-72 object-cover rounded-xl"
                        />
                    ) : (
                        <div className="w-full h-72 bg-zinc-100 rounded-xl flex items-center justify-center text-4xl">
                            🎸
                        </div>
                    )}
                </div>

                {/* Guitar Info */}
                <div>
                    <h1 className="text-3xl font-bold">{guitar.name}</h1>
                    <p className="opacity-70 mt-1">
                        {guitar.brand?.name} · {guitar.type}
                    </p>

                    <Tabs
                        tabs={[
                            { key: 'specs', label: t('specs') },
                            { key: 'musicians', label: t('musicians') },
                        ]}
                        current={tab}
                        onChange={setTab}
                    />

                    {/* Specs Tab */}
                    {tab === 'specs' && (
                        <div className="card p-4">
                            {specs.length === 0 && <p className="opacity-70">{t('noResults')}</p>}
                            <dl className="grid sm:grid-cols-2 gap-3">
                                {specs.map((s, i) => (
                                    <div key={i} className="border-b pb-2">
                                        <dt className="text-sm opacity-70">{s.key}</dt>
                                        <dd className="font-medium">{s.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    )}

                    {/* Musicians Tab */}
                    {tab === 'musicians' && (
                        <div className="card p-4">
                            {musicians.length === 0 && <p className="opacity-70">{t('noResults')}</p>}
                            <ul className="space-y-3">
                                {musicians.slice(0, show).map((m) => (
                                    <li key={m.id} className="flex items-center gap-3">
                                        {m.photoUrl ? (
                                            <img
                                                src={m.photoUrl}
                                                alt={m.name}
                                                className="h-12 w-12 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center">
                                                🎤
                                            </div>
                                        )}
                                        <div>
                                            <div className="font-medium">{m.name}</div>
                                            {m.url && (
                                                <a
                                                    href={m.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sm underline opacity-80"
                                                >
                                                    {m.url}
                                                </a>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            {show < musicians.length && (
                                <div className="mt-4">
                                    <button className="btn" onClick={() => setShow((s) => s + 2)}>
                                        {t('showMore')}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
