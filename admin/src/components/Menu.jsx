import Container from 'react-bootstrap/Container'
import AddProduct from './AddProduct'
import AllProducts from './AllProducts'


// eslint-disable-next-line react/prop-types
export default function Menu({ showAllProducts }) {

    // const [showAllProducts, setShowAllProducts] = useState(true)

    return (
        <>
            <Container fluid className='flex-body'>
                {showAllProducts ? <AllProducts /> : <AddProduct />}
            </Container>
        </>
    )
}
