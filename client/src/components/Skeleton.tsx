import './skeleton.scss'

interface IProps {
    i?:number,
    type?:string,
    length?:number
}

export const PopularItemSkeleton = ({length}:IProps):React.JSX.Element => {
    const num = length;
    
        const PopularItemSKLoading = ({i}:IProps) => (
            <div className="popularItemSK" key={i} >
                <div className='imgSK' />
                <div className="InfoSK">
                    <div className="titleSK" />
                    <div className="priceSK" />
                    <div className="ratingsAndCommentSK" />
                </div>
            </div>
        );
    return <>{ // fragment needs to be the single root element
        Array(num).fill(undefined).map((item, i) => 
        <PopularItemSKLoading key={i}/>)
    }</>
}

export const CategorySkeleton = ():React.JSX.Element => {

    const CategorySKLoading = ({i}:IProps) => (
            <div className='imgSK' />
    );

    return <CategorySKLoading/>;
};

export const SearchItemSkeleton = ({length}:IProps):React.JSX.Element => {
    const num = length;

    const SearchItemSKLoading = ({i}:IProps) => (
        <div className="SearchItemSK" key={i}>
            <div className='imgSK animation' />
            <div className="InfoSK">
                <div className="titleSK animation" />
                <div className="subTitleSK animation" />
                <div className="decSK animation" />
                <div className="ratingsAndCommentSK animation" />
                <div className="priceSK animation" />
            </div>
        </div>
    );

    return <>{ // fragment needs to be the single root element
        Array(num).fill(undefined).map((item,i) => 
        <SearchItemSKLoading key={i}/>)
    }</>
};