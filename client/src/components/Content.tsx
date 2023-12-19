import { useTranslation } from 'react-i18next';
import './Content.scss'
import PopularProduct from './subcomponents/PopularProduct';
import { CategoriesGenres } from 'src/dummyData';
import Category from './subcomponents/Category';
import useFetch from './hooks/useFetch';

const Content = () => {
    const { t } = useTranslation();
    const {data, loading} = useFetch("/products/sp?popularItem=true");

    return (
        <div className='content'>
            <div className="contentContainer">
                <div className="listTitle">
                    <h2>{t('PromotionTitle')}</h2>
                </div>
                <div className="listItems">
                    <Category dataArray={CategoriesGenres}/>
                </div>
                <div className="listTitle">
                    <h2>{t('PopularProductTitle')}</h2>
                </div>
                <div className="listItems">
                    <PopularProduct dataArray={data} loading={loading}/>
                </div>
            </div>
        </div>
    )
}

export default Content