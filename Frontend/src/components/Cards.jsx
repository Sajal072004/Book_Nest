import PropTypes from 'prop-types';

function Cards({ item }) {
  return (
    <div className='mt-4 my-3 p-3'>
      <div className="card w-96 bg-base-100 shadow-xl hover:scale-105 transition-transform duration-300 dark:bg-slate-900 dark:text-white dark:border">
        <figure>
          <img 
            src={item.image} 
            alt="books"
            className="w-full h-auto hover:opacity-90 transition-opacity duration-300"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">Free</div>
          </h2>
          <p>{item.title}</p>
          <div className="card-actions justify-between">
            <div className="badge badge-outline">${item.price}</div>
            <div className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">Buy Now</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Cards.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Cards;
