import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import "./searchResult.scss"
import TopNav from 'src/components/TopNav';
import SearchList from 'src/components/subcomponents/SearchList';
import useFetch from 'src/components/hooks/useFetch';
import Footer from 'src/components/Footer';
import { OptionContext } from 'src/components/utils/OptionContext';

/**
 * Search result page.
 * 
 * @see /src/componenets/InputSection
 */
const SearchResult = () => {
  const {t} = useTranslation();
  const { category, keyword } = useContext(OptionContext);

  let searchUrl:string;
  if (!keyword && category !== 'All') {
    searchUrl = `/products/c=${category}`;
  } else if (keyword && category === 'All') {
    searchUrl = `/products/k=${keyword}`;
  } else if (keyword && category !== 'All') {
    searchUrl = `/products/c=${category}&k=${keyword}`;
  } else {
    searchUrl = '/products/popularItem';
  };
  const [fetchDataUrl, setFetchDataUrl] = useState(searchUrl);
  const {data, loading} = useFetch(fetchDataUrl);
  const NoResult:boolean = (data.length === 0);
  useEffect(() => {
    setFetchDataUrl(searchUrl);
  },[searchUrl]);

  return (
    <div>
        <TopNav />
        <div className="searchResultContainer">
            <div className='searchResultHeader'>
              <h3>{(keyword && keyword !== ' ') ? 
                `Results for '${keyword}'` : 'All Popular Items'}
              </h3>
            </div>
            <hr/>
          <div className="filterWrapper">
            <div className="filterList">
              <div className="filterRating">
                <label>Search Result</label>
              </div>
            </div>

            <div className="listResult">
              <h2>{t('ResultList')}</h2>
              {NoResult ? <>Sorry, nothing found about '{keyword}'</>
               : 
              <>
                {loading ? <>搜尋載入中</> : 
                  data.map((item, index)=>
                  <SearchList hightlight={index===0 && "active"}
                  key={item.id} dataDetail={item}/>)
                }
              </>
              }
            </div>
          </div>
        </div>
        <Footer/>
      </div>
  )
}

export default SearchResult