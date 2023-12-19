import React from 'react'

interface IItemList {
    dataInfo:{
        id:number;
        img:string;
        name:string;
    }
}

const RelatedItemList = ({dataInfo}:IItemList) => {
  const NoData:boolean = (dataInfo === undefined);

  return (
    <div className='relatedItemContainer'>
      {!NoData && 
        <div className='relatedItemWrapper'>
          <img className='relatedItemPhoto' src={dataInfo.img} alt="itemPhoto"
          style={{height:'200px'}}/>
          <div className='relatedItemInfo'>
            {dataInfo.name}
          </div>
        </div>
      }
    </div>
  )
}

export default RelatedItemList;