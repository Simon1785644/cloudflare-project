import { useState, useRef, useEffect } from "react";
import './Locales.scss';
import styles from './Dropdown.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'

interface IDropdownOption {
	// Each child in a list should have a unique "key" prop.
	id: number;
	imageUrl: string;
	label: string | number;
	labelValue: string | number;
}

interface IDropdownProps {
	locales?: IDropdownOption[];
	placeHolder?: string;
}

function Locales({placeHolder, locales}:IDropdownProps) {
	const { i18n } = useTranslation();
	const langCodes = ["zh-TW", "EN"] as const;
	type Lang = (typeof langCodes)[number];
	const isLang = (lng: any): lng is Lang => langCodes.includes(lng);
	const chLang = (lng: string) => {  
		i18n.changeLanguage(lng);
	};
	placeHolder = i18n.language;
	locales = [
		{ id:0, imageUrl: '/images/BTN_ROC.jpg', label:'繁體中文', labelValue: 'zh-TW' },
		{ id:1, imageUrl: '/images/BTN_UK.jpg', label: 'English', labelValue: 'EN' }
	];
	const [isFocused, setIsFocused] = useState(false);
	const [selectedItem, setSelectedItem] = useState<number | string>();
	const wrapperRef = useRef<any>(null);

	useEffect(() => {
		function handleClickOutside(event: any) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
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

  const onValueChange = (selectedValue: string | number) => {
		setSelectedItem(selectedValue);
		setIsFocused(false);
		if (isLang(selectedValue)) {
			chLang(selectedValue);
		}
	};
  useEffect(() => {
		setIsFocused(false);
	}, [selectedItem]);

  return (
    <div className='localesContainer' ref={wrapperRef}>
        <div className='localesBTN'
			onClick={() => setIsFocused(!isFocused)}>
			{selectedItem ?? placeHolder}
			<div className='localesIcon'>
				<FontAwesomeIcon icon={faCaretDown}/>
			</div>
		</div>
		{isFocused && (
			<ul className='localesUl'>
				{locales.map(({ id, imageUrl, label, labelValue }) => (
					<li key={id} onClick={() => {onValueChange(labelValue)}}
						className='localesLi'>
						<img src={imageUrl} alt='' 
						className={styles.icon_Flag}/>
						{label}
					</li>
				))}
			</ul>
		)}
    </div>
  )
}

export default Locales