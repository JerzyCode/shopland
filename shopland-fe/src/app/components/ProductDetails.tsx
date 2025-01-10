import { useParams } from 'react-router-dom';

export function ProductDetails() {
    const { id } = useParams<{ id: string }>();


    return (
        <div>
            <h2>Szczegóły produktu {id}</h2>
        </div>
    );
}
