'use strict'

const DESCUENTO_ESTUDIANTE = 0.8;
const DESCUENTO_TRAINEE    = 0.5;
const DESCUENTO_JUNIOR     = 0.15;
const TARIFA               = 200;

const inpNombre     = document.querySelector("#nombre");
const inpApellido   = document.querySelector("#apellido");
const inpCorreo     = document.querySelector("#correo");
const selCategoria  = document.querySelector("#categoria");
const divTotalPagar = document.querySelector("#total-pagar");
const inpCantidad   = document.querySelector("#cantidad");
const btnBorrar     = document.querySelector("#boton-borrar");

function calcularTotal (pTarifa, pCantidad, pDescuento) {
    
    // console.log(`tarif: ${pTarifa} canti: ${pCantidad} desc: ${pDescuento}`);

    return roundToTwo((pTarifa * pCantidad) * (1 - pDescuento));
};

function obtenerDescuento (pValCategoria) {

    // console.log ('DBG> categoria: ' + pValCategoria);
    
    switch (pValCategoria) {
        case '0': 
          return 0;
          break;
        case '1': 
          return DESCUENTO_ESTUDIANTE;
          break;
        case '2': 
          return DESCUENTO_TRAINEE;
          break;
        case '3': 
          return DESCUENTO_JUNIOR;
          break;
    }

};

function mostrarTotalPagar () {
    
    // console.log(`cantidad ${inpCantidad.value}`);

    let tot = calcularTotal (TARIFA, 
                             inpCantidad.value, 
                             obtenerDescuento(selCategoria.value));

    divTotalPagar.textContent = `Total a pagar: $${tot}`;


}; 

function limpiarTodo () {
  
  inpNombre.value = "";
  inpApellido.value = "";
  inpCorreo.value = "";
  inpCantidad.value = 1;
  selCategoria.selectedIndex = 0;
  
  mostrarTotalPagar();

};

// JavaScript for disabling form submissions if there are invalid fields
// 'use strict' is required
(() => {

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
    
    // Loop over them and prevent submission
    Array.from(forms).forEach (form => {

      form.addEventListener ('submit', event => {
        
        // console.log('en callback de submit. ', event);

        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            /*
              Si los datos son correctos, por el momento solo muestra
              el todal y no hace nada
             */
            mostrarTotalPagar();  
            event.preventDefault();
            event.stopPropagation();
        };
  
        form.classList.add('was-validated');

      }, false);

    });
  })();

document.addEventListener("DOMContentLoaded", () => {
    /*
      Los totales que dependen de valores default de pantalla (en este caso
      el total a pagar) tienen que aparecer calculados al terminar de cargar
      la pantalla
    */
      mostrarTotalPagar();
});

inpCantidad.addEventListener('change', mostrarTotalPagar);

selCategoria.addEventListener('change', mostrarTotalPagar);

btnBorrar.addEventListener('click', limpiarTodo);
