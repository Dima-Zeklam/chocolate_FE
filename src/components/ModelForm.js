import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap';

class ModelForm extends React.Component {
    render() {
        return (
            <>
                {/* show={this.state.show}
        closeHundler={this.closeHundler}
        updateFav={this.updateFav}
        selscted={this.state.selscted}
         title: e.target.title.value,
      imageUrl: e.target.imageUrl.value */}
                <Modal show={this.props.show} onHide={this.props.closeHundler}>
                    <Form onSubmit={this.props.updateFav}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>name</Form.Label>
                            <Form.Control type="text" name="title" defaultValue={this.props.selscted.title}/>
                           
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>image URL</Form.Label>
                            <Form.Control type="text" name="imageUrl" defaultValue={this.props.selscted.imageUrl} />
                           
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Save changes
                        </Button>
                    </Form>
                    <Button onClick={this.props.closeHundler} variant="primary" type="submit">
                        Close
                    </Button>
                </Modal>
            </>
        )
    }
}

export default ModelForm;
