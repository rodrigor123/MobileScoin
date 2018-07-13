//import libraries
import React, { Component } from 'react';

import DropDown from './DropDown';
import texts from '../../config/texts';

const Months = texts.global.months;

class DateDropDown extends Component {
    constructor(props) {
        super(props);

        this.getDays = this.getDays.bind(this);
        this.getMonths = this.getMonths.bind(this);
    }

    getMonths() {
        return Array(...Array(12)).map((_, i) => {
            return {
                label: Months[i].substr(0, 3),
                value: i
            }
        })
    }

    getDays() {
        const maxDays = new Date(this.props.value.year, this.props.value.month+1, 0).getDate();

        return Array(...Array(maxDays)).map((_, i) => {
            return {
                label: '' + (i+1),
                value: i+1
            }
        })
    }

    getYears() {
        return Array(...Array(90)).map((_, i) => {
            return {
                label: '' + (new Date().getFullYear()-i),
                value: new Date().getFullYear()-i
            }
        })
    }

    render() {
        let getValues = this.getDays;

        const { inputStyle, styleInput, placeholder, value, type, handleValueChange } = this.props;

        if(type === 'month') getValues = this.getMonths;
        if(type === 'year') getValues = this.getYears;

        return (
            <DropDown                
                pickerStyle={inputStyle}
                styleInput={styleInput}
                placeholder={placeholder}
                value={value[type]}
                handleValueChange={handleValueChange}
                options={getValues()}
            />
        );
    }
}

export default DateDropDown;