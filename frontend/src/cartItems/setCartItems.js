function setCartItems (allItems = [], newItem){
    let itemExist = allItems.find(item => item.id === newItem._id )

    let items = allItems

    if(itemExist){
        items = items.map((item) => {
            if(item._id === itemExist._id){
                item.qty = item.qty + 1 
            }
            return item

        })
    }else {
        items = [...items, {...newItem, qty: 1}]
    }
    localStorage.setItem('cartItems',JSON.stringify(items))
    return items
}