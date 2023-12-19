import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './product.scss'
import TopNav from 'src/components/TopNav'
import RelatedItemList from 'src/components/subcomponents/RelatedItemList'
import useFetch from 'src/components/hooks/useFetch'
import { LoginContext } from 'src/components/contexts/LoginContext'
import Footer from 'src/components/Footer'
import { CartContext, CartOption } from 'src/components/utils/CartContext'
import { MovieRelated, politicsRelated } from 'src/dummyData'

interface IRelatedItems {
  id:number;
  img:string;
  name:string;
}

function relatedItemfilter(category:string, type:string){
  let arr:IRelatedItems[] = [];

  switch (category) {
    case 'Books':
      switch (type) {
        case 'Politics':
          arr = politicsRelated;
          break;
      }
      break;
    case 'Videos':
      arr = MovieRelated;
      break;
  }
  return arr;
}

const Product = () => {
  const {t} = useTranslation();
  const productUrl = useLocation();
  // pathname = "/products/id" ; index[2]=3rd string=id
  const productID = productUrl.pathname.split("/")[2];
  const {data} = useFetch(`/products/${productID}`);
  // Implicit define the index signature, otherwise you will get
  // error:"TS7053 Element implicitly has an 'any' type".
  const dataKey: Record<string, any> = data;
  const ratings:number = dataKey['ratings'];
  const type:string = dataKey['type'];
  const price:number = Math.floor(dataKey['listprice'] * (1 - dataKey['discount']/100));
  const dataGTIN:string = dataKey['gtin'];
  const dataTitle:string = dataKey['title'];
  const dataPhoto:string = dataKey['image'];
  const stockStatus:number = dataKey['stock'];
  const arr:IRelatedItems[] = relatedItemfilter(dataKey['category'], dataKey['type']);
  let typeStyle:string = 'tagDefault';
  let i18nText:string | undefined = undefined;
  switch (type) {
    case 'Blu-ray':
      i18nText=t('Format.BD');
      typeStyle='tagBluRay';
      break;
    case 'Philosophy':
      i18nText=t('Genre.Philosophy');
      break;
    case 'Psychology':
      i18nText=t('Genre.Psychology');
      break;
  }
  /** Buy process */
  const {user} =useContext(LoginContext);
  const [openCart, setOpenCart] = useState(false);
  const {dispatch} = useContext(CartContext);
  const navigator = useNavigate();
  const handleClick = () => {
    if (user) {
      setOpenCart(true);
      dispatch({type:CartOption.UPDATE_CART, payload:[
        { gtin:dataGTIN, name:dataTitle, 
          photo:dataPhoto, price:price, quantity:1 }
      ]});
      navigator("/cart", {state:{stockStatus}});
    } else {
      navigator("/login", {state:{
        errMessage:"user authentication required."
      }});
    }
  }

  return (
    <div className='productContainer'>
      <TopNav/>
      <div className='productWrapper'>
          <div className='productWrapUpper'>
            <div className='productImg'>
              <img src={dataKey['image']}
              style={{height:'250px', width:'200px'}} alt=""/>
            </div>
            <div className="productInfo">
              <h3>{dataKey['title']}</h3>
              <span className='productRatings'>
                <button className='ratingsBTN'>{ratings}</button>
                {ratings > 4 ? '★★★★☆':'★★★☆☆'}
              </span>
              {i18nText && <span className={typeStyle}>{i18nText}</span>}<br/>
              <div className='InfoDetail'>
                {dataKey['creator'] ? "Author: "+dataKey['creator']:""}<br/>
                {(stockStatus > 0) ? <span style={{color:'green'}}>{t('InStock')}</span>
                 : <span style={{color:'red'}}>{t('unavailible')}</span>}
                {price} TWD
              </div>
              <button className="BuyBTN" onClick={handleClick}
                disabled={stockStatus === 0}>
                {t('BuyNow')}
              </button>
            </div>
          </div>
          <hr/>
        <div className='productWrapLower'>
          <div className='productDetail'>
            <h3>{t('Desciption')}</h3>
            {dataKey['description']}
            <h3>{t('ProductDetail')}</h3>
            {dataKey['spec']} 
          </div>
          {arr.length !== 0 && <>
            <hr/>
            <div className='relatedProducts'>
            <div className='relatedProductsTitle'>
              <h4>{t('RelatedItems')}</h4>
            </div>
            <div className='relatedProductsList'>
              <div className='relatedItem'>
                {arr.map((item, index)=>
                  <RelatedItemList key={item.id} dataInfo={item}/>)}
              </div>
            </div>
          </div>
          </>}
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Product