import { useCallback, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_MODELS_BY_BRAND, SEARCH_DETAILS } from '../graphql/queries';
import Spinner from '../components/spinner';
import ErrorState from '../components/errorState';
import ModelCard from '../components/modelCard';
import InfiniteSentinel from '../components/infiniteSentinel';
import { useI18n } from '../i18n/i18n';

const PAGE_SIZE = 12;

export default function ModelsPage() {
  const { id: brandId } = useParams();
  const { t } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  const [offset, setOffset] = useState(0);
  const [sortBy, setSortBy] = useState({ field: "name", order: "ASC" });

  const search = searchParams.get('q') || '';
  const type = searchParams.get('type') || '';

  const { data, loading, error, fetchMore, refetch } = useQuery(
    search ? SEARCH_DETAILS : GET_MODELS_BY_BRAND,
    {
      variables: search
        ? { brandId, name: search }
        : { id: brandId, sortBy, limit: PAGE_SIZE, offset: 0, type: type || null },
      notifyOnNetworkStatusChange: true,
    }
  );

  const models = search
    ? data?.searchModels ?? []
    : data?.findBrandModels ?? [];

  const sortOptions = [
    { label: t("sort.nameAsc"), value: "NAME_ASC" },
    { label: t("sort.nameDesc"), value: "NAME_DESC" },
    { label: t("sort.priceAsc"), value: "PRICE_ASC" },
    { label: t("sort.priceDesc"), value: "PRICE_DESC" },
  ];

  const onSearchChange = (value) => {
    setSearchParams((prev) => {
      if (value) prev.set('q', value);
      else prev.delete('q');
      return prev;
    }, { replace: true });

    if (value) {
      refetch({ brandId, name: value });
    } else {
      refetch({ id: brandId, sortBy, limit: PAGE_SIZE, offset: 0, type: type || null });
    }
    setOffset(0);
  };

  const onSortChange = (value) => {
    const [field, order] = value.split('_');
    const sortObj = { field: field.toLowerCase(), order };
    setSortBy(sortObj);
    refetch({ id: brandId, sortBy: sortObj, limit: PAGE_SIZE, offset: 0, type: type || null });
  };

  const loadMore = useCallback(() => {
    const nextOffset = offset + PAGE_SIZE;
    fetchMore({
      variables: { id: brandId, sortBy, type: type || null, limit: PAGE_SIZE, offset: nextOffset }
    });
    setOffset(nextOffset);
  }, [offset, fetchMore, brandId, sortBy, type]);

  if (loading && !data) return <Spinner />;
  if (error) return <ErrorState message={error.message} />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{t('models')}</h1>

      <div className="w-[70%] mx-auto flex justify-center items-center gap-4 mb-4">
        <div className="w-1/2">
          <select
            value={`${sortBy.field.toUpperCase()}_${sortBy.order}`}
            onChange={(e) => onSortChange(e.target.value)}
            className="select w-full"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="w-1/2">
          <input
            defaultValue={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input w-full"
            placeholder={t('searchModels')}
          />
        </div>
      </div>

      {models.length === 0 && <p className="opacity-70">{t('noResults')}</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {models.map((m) => <ModelCard key={m.id} model={m} brandId={brandId} />)}
      </div>

      <InfiniteSentinel onHit={loadMore} disabled={loading} />
      {loading && <Spinner />}
    </div>
  );
}
