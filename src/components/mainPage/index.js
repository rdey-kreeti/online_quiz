import React, {Component} from 'react';
import LabelledInput from '../labelledInput';
import Button from '../button';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      dateOfBirth: ''
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onFormSubmit = () => {
    const {name, email} = this.state;
    localStorage.setItem('loggedInUser', JSON.stringify({name: name, email: email}));
    this.props.history.push('/questions');
  }

  render() {
    console.log(this.props, 'asd')
    return (
      <React.Fragment>
        <LabelledInput label="Name" type="text" placeholder="Name" name="name" value={this.state.name} onChange={this.onChange} />
        <LabelledInput label="Email" type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.onChange} />
        <LabelledInput label="Date of Birth" type="date" placeholder="DOB" name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.onChange}/>
        <Button type="submit" text="Submit" onClick={this.onFormSubmit}/>
      </React.Fragment>
    )
  }
}

export default HomePage;