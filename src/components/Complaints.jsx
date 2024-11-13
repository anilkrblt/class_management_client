import Button from 'react-bootstrap/Button';
import React from 'react';
import { ListGroup, Card, Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';


const Complaints = () => {
    var complaints = [
        {name:"Zeynep Şentürk", exp: "Sınıf arıza bildirimi", class: "D201"}, 
        {name:"Melih Yaşar", exp: "Sınıf arıza bildirimi", class: "L208"}, 
        {name:"Sıla Yıldız", exp: "Sınıf arıza bildirimi", class: "L201"}, 
        {name:"Ali Duru", exp: "Sınıf arıza bildirimi", class: "D204"}, 
      ]

        return  <Container style={{width: "25rem"}}>
    
        <h2 className="my-4 text-center">Şikayetler</h2>
        <ListGroup style={{ width: '25rem' }}>
          {complaints.map((item, index) => (
            <Card 
            key={index} 
            className="my-1"
            style={{ backgroundColor: index % 2 === 0 ? '#fef7ff' : 'white' }}>
              <Card.Body className="d-flex align-items-center justify-content-between">
           
                <Image 
                    src= {item.logo}
                    roundedCircle
                    width={50} 
                    className='me-3'
             />
                <div>
                  <Card.Title className="text-start">{item.name}</Card.Title>
                  <Card.Text className="text-start">
                    {item.exp} - {item.class} 
                  </Card.Text>
                </div>
                <Button variant='danger'>İncele</Button>
              </Card.Body>
            </Card>
          ))}
        </ListGroup>
    
        </Container>
}


export default Complaints