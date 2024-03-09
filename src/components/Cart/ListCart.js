
const ListCart = ({ item }) => {

    return (
        <li key={item.id}>
            {item.name} -
            {item.price} -
            {item.quantityL}  -
            {item.quantityM} -
            {item.quantityS}
        </li>
    );
};

export default ListCart;


