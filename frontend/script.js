const API_URL = 'http://localhost:8080/api/products'

    const productsList = document.getElementById('products-list')
    const form = document.querySelector('#form')
    const edit = document.querySelector('.edit')
    const formEdit = document.querySelector('#formEdit')
    const register_wrapper = document.querySelector('#register_wrapper')

    // Adiciona evento de click ao botao excluir
    function addEventoDeBotaoExcluir() {
      const botoesExcluir = document.querySelectorAll('.botao-excluir')
      botoesExcluir.forEach(botao => {
        botao.onclick = function(e) {
          e.preventDefault()

          const id = this.dataset.id
          
          fetch(`${API_URL}/${id}`, {
            method: 'DELETE',

          }).then(response => {
            response.json().then(data => {
              if (data.message === 'success') {
                alert('Produto excluído com sucesso')
                obterLista()
                register_wrapper.classList.remove('hidden')
                edit.classList.add('hidden')
              }else {
                alert('Ocorreu um erro, tente novamente mais tarde')
              }
            })
          })
        }
      })
    }

    // Adiciona evento de click ao botao editar 
    function addEventoDeBotaoEditar() {
      const botoesEditar = document.querySelectorAll('.botao-editar')

      botoesEditar.forEach(botao => {
        botao.onclick = function(e) {
          e.preventDefault()

          register_wrapper.classList.add('hidden')
          edit.classList.remove('hidden')

          const id = this.dataset.id
          const name = this.dataset.name
          const brand = this.dataset.brand
          const price = this.dataset.price

          document.forms['formEdit'].id.value = id
          document.forms['formEdit'].name.value = name
          document.forms['formEdit'].brand.value = brand
          document.forms['formEdit'].price.value = price
        }
      })
    }

    //Obtém a lista de produtos
    function obterLista() {
      fetch(API_URL).then(response => {
        response.json().then(data => {
          const productsHtml = data.map(product => `
            <li>
              Nome: ${product.name} - Marca: ${product.brand} - Preço: ${product.price}
              <a 
                href="#"
                class="botao-editar" 
                data-id="${product._id}" 
                data-name="${product.name}" 
                data-brand="${product.brand}" 
                data-price="${product.price}">
                [Editar]
              </a>
              <a href="#!" class="botao-excluir" data-id="${product._id}">[Excluir]</a>
            </li>
          `).join('')

          productsList.innerHTML = productsHtml

          addEventoDeBotaoExcluir()
          addEventoDeBotaoEditar()
        })
      })
    }
    obterLista()

    // Fazer o Cadastro de produtos
    form.onsubmit = function(e) {
      e.preventDefault()

      const name = document.forms['form'].name.value
      const brand = document.forms['form'].brand.value
      const price = document.forms['form'].price.value

      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          brand,
          price,
        })
      }).then(response => {
        response.json().then(data => {
          if (data.message === 'success') {
            alert('Cadastro realizado com sucesso!')
            form.reset()
            obterLista()
          } else {
            alert('Ocorreu um erro, tente novamente mais tarde!')
          }
        })
      })
    }

    // Ao editar um produto
    formEdit.onsubmit = function(e) {
      e.preventDefault()

      const id = document.forms['formEdit'].id.value
      const name = document.forms['formEdit'].name.value
      const brand = document.forms['formEdit'].brand.value
      const price = document.forms['formEdit'].price.value
      
      fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          brand,
          price
        })
      }).then(response => {
        response.json().then(data => {
          if (data.message === 'success') {
            formEdit.reset()
            edit.classList.add('hidden')
            register_wrapper.classList.remove('hidden')
            obterLista()
            alert('Produto editado com sucesso')
          }else {
            alert('Ocorreu um erro, tente novamente mais tarde')
          }
        })
      })
    }