import Container from 'react-bootstrap/Container'
import AddProduct from '../components/AddProduct'
import AllProducts from '../components/AllProducts'


// eslint-disable-next-line react/prop-types
export default function Menu({ showAllProducts }) {

    return (
        <>
            <Container fluid className='flex-body'>
                {showAllProducts ? <AllProducts /> : <AddProduct />}
            </Container>
        </>
    )
}
