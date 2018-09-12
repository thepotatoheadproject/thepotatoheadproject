import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Input from '../Input/Input'
import RadioGroup from '../RadioGroup/RadioGroup';
import NumberSelect from '../NumberSelect/NumberSelect';


class BabyInfo extends Component {


  handleInputChangeForBaby = name => event => {
    console.log(name, event);
    this.props.handleInputChangeForBaby({
      name,
      value: event.target.value,
      index: this.props.babyIndex
    })
  }


  render() {
    return (
      <div id="babyDiv">


        <div>
          <p className="requestFormPtag"><b>Baby's Info:</b></p>
        </div>
        
      <div className="baby-form">


        <div className="name-info">

            <Input
              type="text"
              label="First Name"
              placeholder="First Name"
              onChange={this.handleInputChangeForBaby('firstName')}
            />

            <Input
              type="text"
              label="Last Name"
              placeholder="Last Name"
              onChange={this.handleInputChangeForBaby('lastName')}
            />

        </div>


        <div className="date-gender">

              <Input 
                label="Birth Date"
                placeholder="mm/dd/yyyy"
                type="date"
                onChange={this.handleInputChangeForBaby('birthDate')}
              />   
              
              <RadioGroup 
                title="Gender"
                name="gender"
                onChange={this.handleInputChangeForBaby}
                data={[
                  { value: 'girl', label: 'Girl' },
                  { value: 'boy', label: 'Boy' }
                ]}
              />

        </div>

        <div className="gestation-weight">
          <div className="select-group">
            <p>Gestation</p>
            <div>
              <NumberSelect 
                min={20}
                max={40}
                label="Weeks"
                name="gestationWeeks"
                onChange={this.handleInputChangeForBaby}
              />
              <NumberSelect 
                max={6}
                label="Days"
                name="gestationDays"
                onChange={this.handleInputChangeForBaby}
              />
            </div>            
          </div>
          <div className="select-group">
            <p>Weight</p>
            <div>
              <NumberSelect 
                max={6}
                label="Pounds"
                name="weightPounds"
                onChange={this.handleInputChangeForBaby}
              />
              <NumberSelect 
                max={15}
                label="Ounces"
                name="weightOunces"
                onChange={this.handleInputChangeForBaby}
              />
            </div> 
          </div>      
        </div>

        </div>

        <div id="addRemoveDiv">
          <p className="requestFormPtag"><b>Multiples?</b></p>
          <button
            className="Button"
            onClick={this.props.addAnotherBaby}>
            Add Another Baby
            </button>
          <button
            className="Button"
            onClick={this.props.removeBaby}>
            Undo Add
            </button>
        </div>


      </div>
    )
  }
}

export default BabyInfo;