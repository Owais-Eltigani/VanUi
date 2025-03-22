import {
  Link,
  useLoaderData,
  useSearchParams,
  defer,
  Await,
} from 'react-router-dom';
import { VanUi } from '../utils/types';
import { fetchVans } from '../utils/APIs';
import React from 'react';

export const loader = async () => {
  // fetch data from the server asynchronously without blocking the server rendering
  return defer({ vanslist: fetchVans() });
};

export const Vans = () => {
  //
  const [searchParams, setSearchParams] = useSearchParams();
  const data = useLoaderData();
  const typeFilter = searchParams.get('type');

  return (
    <>
      <div className="van-list-container"></div>
      <h1 className="text-2xl p-3">Explore our van options</h1>
      <React.Suspense fallback={<h1 className="text-2xl p-4">LOADING...</h1>}>
        <Await resolve={data?.vanslist}>
          {(vanslist: VanUi[]) => {
            const vansArr = typeFilter
              ? vanslist.filter(van => van.type === typeFilter)
              : vanslist;

            return (
              <>
                <div className="van-list-filter-buttons space-x-3">
                  <button
                    className={`${
                      typeFilter === 'simple' ? 'selected' : ''
                    } van-type simple`}
                    onClick={() => setSearchParams({ type: 'simple' })}>
                    Simple
                  </button>

                  <button
                    className={`${
                      typeFilter === 'luxury' ? 'selected' : ''
                    } van-type luxury`}
                    onClick={() =>
                      setSearchParams({ type: 'luxury', tone: 'fun' })
                    }>
                    Luxury
                  </button>

                  <button
                    className={`${
                      typeFilter === 'rugged' ? 'selected' : ''
                    } van-type rugged`}
                    onClick={() => setSearchParams({ type: 'rugged' })}>
                    Rugged
                  </button>

                  {typeFilter ? (
                    <button
                      className={`${
                        typeFilter ? 'selected' : ''
                      } van-type clear-filters`}
                      onClick={() => setSearchParams({})}>
                      Clear filter
                    </button>
                  ) : null}
                </div>
                <div className="van-list">
                  {vansArr.map(van => (
                    <div key={van.id} className="van-tile">
                      <Link
                        to={`/vans/${van.id}`}
                        state={{
                          sp: searchParams.toString(),
                          type: typeFilter,
                        }}>
                        <img src={van.imageUrl} />
                        <div className="van-info">
                          <h3>{van.name}</h3>
                          <p>
                            ${van.price}
                            <span>/day</span>
                          </p>
                        </div>
                        <i className={`van-type ${van.type} selected`}>
                          {van.type}
                        </i>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            );
          }}
        </Await>
      </React.Suspense>
    </>
  );
};
