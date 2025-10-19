import React from "react";
class App extends React.Component {
constructor(props) {
super(props);
this.state = {
name: "",
submittedName: ""
};
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
}
handleChange(event) {
this.setState({ name: event.target.value });
}
handleSubmit(event) {
event.preventDefault();
this.setState({ submittedName: this.state.name });
}
render() {
return (
<div>
<h1>React Components, Props, and State Demo</h1>
<Greeting name={this.state.submittedName} />
<form onSubmit={this.handleSubmit}>
<label>
Enter your name:
<input
type="text"

value={this.state.name}
onChange={this.handleChange} />
</label>
<button type="submit">Submit</button>
</form>
</div>
);
}
}
function Greeting(props) {
return (
<div>
{props.name ? <h2>Hello, {props.name}!</h2> : <h2>Please enter
your name.</h2>}
</div>
);
}
export default App;