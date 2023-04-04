import Table from 'react-bootstrap/Table';

export const AccountDetails = () => {
    return (
        <>
        <h1>Account Details</h1>
        <Table striped bordered style={{marginTop:"20px",width:"500px"}}>
          <tbody>
            <tr>
              <td><b>Id</b></td>
              <td>123</td>
            </tr>
            <tr>
              <td><b>Name</b></td>
              <td>Mary</td>
            </tr>
            <tr>
              <td ><b>Phone Number</b></td>
              <td>123456789</td>
            </tr>
          </tbody>
        </Table>
        </>
    );

};
