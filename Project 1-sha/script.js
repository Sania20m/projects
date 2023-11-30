async function addToBill() {
    const price = document.getElementById('price').value;
    const dish = document.getElementById('dish').value;
    const table = document.getElementById('table').value;
  
    try {
      const response = await fetch('https://crudcrud.com/api/98d313f8d24747d9b8a3ae8f09c8d10b/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price, dish, table }),
      });
  
      if (response.ok) {
        await displayOrders();
      }
    } catch (error) {
      console.error('Error adding order:', error);
    }
  }
  
  async function displayOrders() {
    try {
      const response = await fetch('https://crudcrud.com/api/98d313f8d24747d9b8a3ae8f09c8d10b/orders');
      const data = await response.json();
  
      const tables = { table1: [], table2: [], table3: [] };
      data.forEach(order => {
        tables[`table${order.table}`].push(order);
      });
  
      for (let i = 1; i <= 3; i++) {
        const ul = document.getElementById(`table${i}Orders`);
        ul.innerHTML = '';
        tables[`table${i}`].forEach(order => {
          const li = document.createElement('li');
          li.textContent = `Price: ${order.price}, Dish: ${order.dish}`;
  
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete Order';
          deleteButton.addEventListener('click', async function() {
            await deleteOrder(order._id, i);
          });
  
          li.appendChild(deleteButton);
          ul.appendChild(li);
        });
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }
  
  async function deleteOrder(orderId, table) {
    try {
      const response = await fetch(`https://crudcrud.com/api/98d313f8d24747d9b8a3ae8f09c8d10b/orders/${orderId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        const ul = document.getElementById(`table${table}Orders`);
        ul.innerHTML = ''; // Clear the list in DOM
  
        // After deleting from the API, fetch updated orders and display
        await displayOrders();
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  }
  
  displayOrders();
  