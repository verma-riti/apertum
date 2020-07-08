import React, {useState, useEffect} from  'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function UserList() {
	const [userData, setUserData] = useState([])
	
	 useEffect(() => {
		const token = localStorage.getItem('token');
		console.log("token = ", token)
        const headers = { 'Accept': 'application/json',
                      'Authorization': `Bearer ${token}`}

        axios.get('https://apertum-interview.herokuapp.com/api/users', { headers })
          .then(function (response) {
          setUserData(response.data)
	      })
	      .catch(function (error) {
	        console.log(error);
	      });
	}, [])
	 const onSubmit = (e) => {
	 	let searchKey = e.target.name;
	 	if(searchKey === "age>=20"){
	 		setUserData(userData.filter(user => user.age >= 20))
	 	}
	 	if(searchKey === "age<30"){
	 	 setUserData(userData.filter(user => user.age <30))
	 	}

	 	if(searchKey === "lenOfFullName>=10"){
	 	 setUserData(userData.filter(user =>{
	 	 	let fullName = user.firstName + user.lastName; 
	 	 	let lenOfFullName=fullName.length; 
	 	 	return lenOfFullName>=10}))
	 	}

	 }
	return(
		<div>
		<Container>
			<h1 className="mt40 mb30">Users List</h1>
				<Row>
					<Col sm={12}>
						<Form onClick={onSubmit}>
						  {['checkbox'].map((type) => (
						    <div key={`inline-${type}`} className="mb-3">
						      <Form.Check inline name="age>=20" label="age>=20" type={type} id={`inline-${type}-1`} />
						      <Form.Check inline name="age<30" label="age<30" type={type} id={`inline-${type}-2`} />
						      <Form.Check inline name="lenOfFullName>=10" label="Length of fullname >=10"  type={type} id={`inline-${type}-3`} />
						    </div>
						  ))}
						</Form>
					</Col>
				</Row>
			  <Row>
			    {userData.map((item,i) =>{
		            return(
		              <Col sm={3}  key={i} className="mt30">
		              	<div className="card">
							<h3>{item.firstName} {item.lastName}</h3>
							<p>Age: {item.age}</p>
						</div>
		              </Col>
		            )
		          })}
			  </Row>
			</Container>
		</div>
	)
}

export default UserList;