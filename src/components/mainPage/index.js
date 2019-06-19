import React, {Component} from 'react';
import LabelledInput from '../labelledInput';
import Button from '../button';
import InputValidation from '../inputValidation';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      dateOfBirth: '',
      errors: {}
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  isValid = () => {
    const {errors, isValid} = InputValidation(this.state);

    if (!isValid) {
      this.setState({errors})
    }

    return isValid;
  }

  onFormSubmit = () => {
    const {name, email} = this.state;
    const isInputsValid = this.isValid();

    if (isInputsValid) {
      localStorage.setItem('loggedInUser', JSON.stringify({name: name, email: email}));
      this.props.history.push('/questions');
    }
  }

  render() {
    const {errors} = this.state;
    return (
      <React.Fragment>
        <LabelledInput label="Name" type="text" placeholder="Name" name="name" value={this.state.name} onChange={this.onChange} error={errors.name} />
        <LabelledInput label="Email" type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.onChange} error={errors.email} />
        <LabelledInput label="Date of Birth" type="date" placeholder="DOB" name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.onChange} error={errors.dateOfBirth} />
        <Button type="submit" text="Submit" onClick={this.onFormSubmit}/>
      </React.Fragment>
    )
  }
}

export default HomePage;