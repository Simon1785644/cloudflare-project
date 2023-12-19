import { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './inputsection.scss';
import { OptionType, OptionContext } from 'src/components/utils/OptionContext'
import { IDropdownOption } from './subcomponents/dropdown/Dropdown';

interface IDropdownProps {
	options: IDropdownOption[];
	type?: string;
	placeHolder?: string;
}

function SearchOptionBar({options, placeHolder}:IDropdownProps) {
    const {keyword, dispatch} = useContext(OptionContext);
    const [isFocused, setIsFocused] = useState(false);
	const [selectedItem, setSelectedItem] = useState<number | string>();
	const wrapperRef = useRef<any>(null);

    useEffect(() => {
		function handleClickOutside(event: any) {
			if (wrapperRef.current && 
                !wrapperRef.current.contains(event.target)) {
				setIsFocused(false);
			}
		}
        // attaches an eventListener to listen when componentDidMount
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
            // optionally returning a func in useEffect runs like 
            // componentWillUnmount to cleanup
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [wrapperRef]);

    const onValueChange = (
            label: string | number,
            selectedValue: string | number
        ) => {
		setSelectedItem(label);
		setIsFocused(false);
        if (typeof selectedValue == 'string') {
            dispatch({type:OptionType.NEW_OPTION, payload:{
                category:selectedValue,
                keyword:keyword
            }});
        }
	};
	useEffect(() => {
		setIsFocused(false);
	}, [selectedItem]);

    return (
		<div className='OptionBarContainer' ref={wrapperRef}>
			<div className='OptionBarBTN'
                onClick={() => setIsFocused(!isFocused)}>
                    {selectedItem ?? placeHolder}
					<FontAwesomeIcon icon={faCaretDown}/>
			</div> 
			{isFocused && (
				<ul className='OptionBarUl'>
					{options.map(({ id, label, labelValue }) => (
						<li key={id} onClick={() => {onValueChange(label, labelValue)}}
							className='OptionBarLi'>
							{label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

function CheckOK(
    category:string | undefined, 
    keyword:string | undefined
):boolean {
    /*if (!category || !keyword) {
        throw new Error("category or keyword is undefined");
    }*/
    let Result:boolean = true;
    // If no search option setting then go to index page
    if (category === 'All') {
        if (!keyword) {
            Result = false;
        } else {
            // Check if string has only spaces
            const noKeyword:boolean = (keyword.length > 0 && 
                keyword.replace(/\s/g, '').length === 0) ? true: false;
            if (noKeyword) {
                Result = false;
            };
        }
    }
    return Result;
};

const InputSection = () => {
    const { t } = useTranslation();
    const {category, keyword, dispatch} = useContext(OptionContext);
    const [searchKeyword, setSearchKeyword] = useState(keyword);
    const productTypes:IDropdownOption[] = [
        { id:0, label:t('All'), labelValue:'All' },
        { id:1, label:t('Books'), labelValue:'Books' },
        { id:2, label:t('Videos'), labelValue:'Videos' },
        { id:3, label:t('Games'), labelValue:'Games' },
        { id:4, label:t('Toys'), labelValue:'Toys' }
    ];
    const handleSearchSubmit = () => {
        dispatch({type:OptionType.NEW_OPTION, payload:{
            category:category, 
            keyword:searchKeyword
        }});
    };
    const nextUrl:string = 
        CheckOK(category, searchKeyword) ? '/searchResults': '/';
   
    return (
        <section className='SearchBarContainer'>
            <SearchOptionBar options={productTypes} 
                placeHolder={t(`${category}`)}/>
            <input type="Search" className='SearchInput'
                placeholder={t('PH.SearchText')}
                onChange={(e) => setSearchKeyword(e.target.value)}
                value={searchKeyword}
            />
            <Link to={nextUrl} className='searchBTN'
                onClick={handleSearchSubmit}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Link>        
        </section>
    )}

export default InputSection;
