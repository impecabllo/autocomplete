import React, { useState } from "react"
import Autocomplete from "../../components/Autocomplete"
import { Option } from "../../components/Autocomplete/Dropdown"

import style from "./Home.module.scss"

const BASE_URL = "https://fakestoreapi.com"

const Home: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<Array<Option>>([])
  const [selectedProducts, setSelectedProducts] = useState<Array<Option>>([])
  const [selectedJewelery, setSelectedJewelery] = useState<Array<Option>>([])

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>Autocomplete example</h2>
      <div className={style.content}>
        <Autocomplete
          url={`${BASE_URL}/users`}
          onSelect={selected => setSelectedUsers(selected)}
          valueKey="username"
          labelKey="username"
        />
        <Autocomplete
          url={`${BASE_URL}/products`}
          onSelect={selected => setSelectedProducts(selected)}
          valueKey="title"
          labelKey="title"
        />
        <Autocomplete
          url={`${BASE_URL}/products/category/jewelery`}
          onSelect={selected => setSelectedJewelery(selected)}
          valueKey="title"
          labelKey="title"
        />
      </div>
      <h2 className={style.title}>Selected values:</h2>
      <div className={style.content}>
        <div>
          <h4>Users:</h4>
          <ul>
            {selectedUsers.length > 0 ? selectedUsers.map(user => (
              <li key={user.value}>{user.label}</li>
            )) : (
              <div>No selected users</div>
            )}
          </ul>
        </div>
        <div>
          <h4>Products:</h4>
          <ul>
            {selectedProducts.length > 0 ? selectedProducts.map(product => (
              <li key={product.value}>{product.label}</li>
            )) : (
              <div>No selected products</div>
            )}
          </ul>
        </div>
        <div>
          <h4>Jewelery:</h4>
          <ul>
            {selectedJewelery.length > 0 ? selectedJewelery.map(jewelery => (
              <li key={jewelery.value}>{jewelery.label}</li>
            )) : (
              <div>No selected jewelery</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home