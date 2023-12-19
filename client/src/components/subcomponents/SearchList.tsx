import "./searchList.scss"
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons'

interface IParams {
  hightlight:unknown;
  key:unknown;
  dataDetail:{
    id: number;
    gtin: string;
    category: string;
    type?: string;
    title: string;
    image: string;
    creator?: string;
    description: string;
    spec: string;
    stock: number;
    listprice: number;
    discount: number;
    ratings: number;
    comments: number;
  };
}

const SearchList = ({hightlight, dataDetail}:IParams) => {
  const {t} = useTranslation();
  const author = dataDetail.creator;
  const ratings = dataDetail.ratings;
  const type = dataDetail.type;

  return (
    <div className={`SearchItem ${hightlight}`}>
      <img className="itemImg" src={dataDetail.image} alt=""/>
    <div className="itemInfo">
      <div className="infoTitle">
        {dataDetail.title}
        <div className='infoTitleRight'>
          <span className='infoTitleRate'>
            <button>{ratings}</button>
            {ratings > 4 ? '★★★★☆':'★★★☆☆'}
          </span>
          <span>{dataDetail.comments}{t('Discussion')}</span>
        </div>
      </div>
      <div className="infoDes">      
        <div className="infoDetail">
          <div className="detailLeft">
            <h3>{author && (t('author')+": "+author)}</h3>
            <div className="detailDes">
                {type && 
                <span><FontAwesomeIcon icon={faTags} />{type}</span>}<br/>
              <b>Stock : {dataDetail.stock === 0 ? "unavailible": dataDetail.stock}</b>
            </div>
          </div>
          <div className="detailRight">
            <span className="tax">
              {t('NoImportFeeDeposit')}
            </span>
            <span className="optionDes">   
              {t('ListPrice')}: TWD {dataDetail.listprice}
            </span>
            <span className="price">
              {Math.floor(dataDetail.listprice * (100 - dataDetail.discount)/100)} TWD
              {(dataDetail.discount > 0) ? 
              <p className="discount">{dataDetail.discount} OFF</p>:""}
            </span>
            <Link to={`/products/${dataDetail.gtin}`}>
              <button className='btn' >{t('CheckDetail')}</button>
            </Link>
          </div>
        </div>
      </div>
    </div>

  </div>
  )
}

export default SearchList