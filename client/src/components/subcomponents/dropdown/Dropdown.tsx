import { useState, useRef, useEffect } from "react";
import  "./Dropdown.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

export interface IDropdownOption {
	// Each child in a list should have a unique "key" prop.
	id: number;
	label: string | number;
	labelValue: string | number;
}

interface IDropdownProps {
	name?: string;
	options: IDropdownOption[];
	required?: boolean;
	tabIndex?: number;
	className?: string;
	type?: string;
	placeHolder?: string;
	labelName?: string;
}
// Dropdown component default value
Dropdown.defaultProps = {
	name: '',
	type: '',
	className: '',
	placeHolder: '',
	required: false,
	tabIndex: 0,
	labelName: ''
};

// useEffect: used to close the dropdown whenever the user clicks 
// anywhere on the page.
// onValueChange: handles the state update and replaces the placeholder
// with the item that chooses from the dropdown.
function Dropdown({
	labelName,
	name,
	options,
	placeHolder,
	type,
	required,
	className,
	tabIndex,
}: IDropdownProps) {
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
	};
	useEffect(() => {
		setIsFocused(false);
	}, [selectedItem]);

	return (
		<div className='dropDownContainer' ref={wrapperRef}>
			<div className='dropdownHeader'>
				<span className='dropDownLabel'>{labelName}</span>
				{required && (
					<span className='labelRequired'>*</span>
				)}
			</div>
			<div tabIndex={tabIndex} className='dropDownBTN'
				onClick={() => setIsFocused(!isFocused)}>
				{selectedItem ?? placeHolder}
				{type === 'arrow-down' && (
					<div className='dropDownIcon'>
						<FontAwesomeIcon icon={faCaretDown}/>
					</div>
				)}
			</div> 
			{isFocused && (
				<ul className='dropDownUl'>
					{options.map(({ id, label, labelValue }) => (
						<li key={id} onClick={() => {onValueChange(labelValue)}}
							className='dropDownLi'>
							{label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default Dropdown;