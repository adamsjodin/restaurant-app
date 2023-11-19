import { useQuery } from "@tanstack/react-query"
import { wait } from "../../../../utils/functions"
import offers from '../../../../testdata/offers.json'
import './Offers.scss';

function Offers() {
    const offersQuery = useQuery({
        queryKey: ["offers"],
        queryFn: () => wait(500).then(() => [...offers]),
    })

    if(offersQuery.isLoading) return <h2>Loading...</h2>
    if(offersQuery.isError) {
        return <pre>{JSON.stringify(offersQuery.error)}</pre>
    }
  return (
    <section className="offers">
        {offersQuery.data.map((offer) => (
            <article className="offer" key={offer.id}>
                <figure className="offer__image" style={{ backgroundImage: `url(${offer.imgUrl})` }}></figure>
                <section className="offer__info">
                    <h3 className="offer__info--title">{offer.title}</h3>
                    <p className="offer__info--desc">{offer.description}</p>
                    
                    { offer.bundle ? 
                        <section className="offer__info--priceBox">
                            <div className="priceBox--bundle">{offer.bundleText} {offer.price[0]} kr</div>
                            <div className="priceBox--single">1 for {offer.price[1]} kr</div>
                        </section>
                     :
                     <div className="offer__info--price">{ offer.price > 0 ? `${offer.price} kr` : ""}</div>
                    }
                </section>
            </article>
        ))}
    </section>
  )
}

export default Offers