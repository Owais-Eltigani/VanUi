import { Link, useLocation, useLoaderData } from 'react-router-dom';
import { VanUi } from '../utils/types';
import { fetchVans } from '../utils/APIs';

interface params {
  id: string;
}

export const loader = ({ params }: { params: params }) => {
  // get one van by id
  return fetchVans(params.id);
};

export const Van = () => {
  const van: VanUi = useLoaderData();
  const location = useLocation();

  return (
    <div className="van-detail-container">
      <Link to={`./..?${location.state.sp}`} className="back-button">
        &larr;{' '}
        <span>
          Back to {location.state.type ? location.state.type : 'all'} vans
        </span>
      </Link>

      {van ? (
        <div className="van-detail">
          <img src={van.imageUrl} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};
