import React from "react";

/*
export default function Ajay(){
    return (
        <h1>Hello Ajay</h1>
    )
}
*/

/*
const products = [
    { title: 'Cabbage', isFruit: false, id: 1 },
    { title: 'Garlic', isFruit: false, id: 2 },
    { title: 'Apple', isFruit: true, id: 3 },
];

export default function listing() {

    let listitem = products.map(product =>
        <li
            key={product.id}
            style={{ 
                color: product.isFruit ? 'green' : 'yellow' 
            }}
        >
            {product.title}
        </li>
    );
    return (
        <ul>{listitem}</ul>
    )
}
*/
function Item({ name, isPacked }) {

    if (isPacked) {
        return <li className="item">{name} ✅</li>;
      }
      return <li className="item">{name}</li>;
    }
  
  
  export default function PackingList() {
    return (
      <section>
        <h1>Sally Ride's Packing List</h1>
        <ul>
          <Item 
            isPacked={true} 
            name="Space suit" 
          />
          <Item 
            isPacked={true} 
            name="Helmet with a golden leaf" 
          />
          <Item 
            isPacked={false} 
            name="Photo of Tam" 
          />
        </ul>
      </section>
    );
  }