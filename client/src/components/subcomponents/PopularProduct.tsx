import { Link } from 'react-router-dom';
import "./popularProduct.scss";
import { useTranslation } from 'react-i18next';
import {PopularItemSkeleton} from '../Skeleton';

interface IParams {
    dataArray: {
        gtin: string;
	    title: string;
	    listprice: number;
	    ratings: number;
	    comments: number;
	    image: string;
    }[],
    loading:boolean
}

const PopularProduct = ({dataArray, loading}:IParams) => {
  const { t } = useTranslation();

  return (
    <div className='popularProducts'>
        {loading ? <PopularItemSkeleton length={7}/>: 
        <>{dataArray.map((item, index:number)=>
        <Link to = {`/products/${item.gtin}`}
        style={{textDecoration:"none", color:"inherit"}}
        key={index} >
        <div className="item">
            <img src={item.image} alt="" />
                    <div className="itemInfo">
                        <div className="title">
                            {t(`${item.title}`)}
                        </div>
                        <div className="price">
                            {item.listprice.toLocaleString()} NTD
                        </div>
                        <div className="ratings">
                            <button>{item.ratings}</button>
                            <span>
                                {t(`${item.ratings >= 4.3 ? 'Great' : 'Nice'}`)}
                            </span>
                            <p>{item.comments.toLocaleString()}{t('Discussion')}</p>
                        </div>
                    </div>
                </div>
            </Link>
          )}
          </>
        }
    </div>
  )
}

export default PopularProduct