import React from 'react'
import {Card,Button} from 'react-bootstrap';

class ChocoCard extends React.Component {
    render() {
        return (
            <>
                    {this.props.chocoData.map((item, key) => {
                        return (
                            <Card key={key} style={{ width: '18rem',display:'inline-block', margin:'30px' , }}>
                                <Card.Img variant="top" src={item.imageUrl} />
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Button onClick={()=>{this.props.addToFav(item)}} variant="primary">Add to favourit</Button>
                                </Card.Body>
                            </Card>
                        );
                    })}
            </>
        )
    }
}

export default ChocoCard;
