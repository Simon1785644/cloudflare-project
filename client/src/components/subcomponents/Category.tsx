import "./category.scss"
import { useTranslation } from 'react-i18next';
import useFetch from '../hooks/useFetch';
import {CategorySkeleton} from '../Skeleton';

interface IDataArrayElement {
  dataArray: { 
    id: number; 
    genre: string; 
    img: string; 
  }[]
}

const Category = ({dataArray}:IDataArrayElement, url:string) => {
  const { t } = useTranslation();
  /** Handle category component skeleton loading */
  const { loading } = useFetch(url);

  return (
    <div className='category'> 
    
      {dataArray.map((item, index) => 
        <div className="item" key={index}>
          { loading ? <CategorySkeleton/> : <img src={item.img} alt="" />}
          <div className="itemInfo">
            <div className="title">
              {t(`${item.genre}`)}
              <p>{t('SeeMore')}</p>
            </div>
          </div>
        </div>)}
    </div>
  )
}

export default Category