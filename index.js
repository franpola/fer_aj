

window.addEventListener('DOMContentLoaded', onDomContentLoaded);

function onDomContentLoaded() {
  const form = document.querySelector('#form');
  const btnEnviar = document.querySelector('#btn_enviar');
  const fragment = document.createDocumentFragment();
  let inputNames = {};

  window
    .fetch('./preguntas.json')
    .then((response) => response.json())
    .then((preguntas) => {
      Object.entries(preguntas).forEach((p) => {
        const idPregunta = p[0];
        const respuestas = p[1].respuestas;

        const titulo = document.createElement('p');
        titulo.innerHTML = p[1].texto;
        titulo.classList.add('titulo');

        fragment.appendChild(titulo);

        // pintamos las respuestas
        Object.entries(respuestas).forEach((res) => {
          const idRes = res[0];
          const textRes = res[1];

          const div = document.createElement('div');
          div.classList.add('opcion');

          const input = document.createElement('input');
          input.type = 'radio';
          input.id = `${idPregunta}_${idRes}`;
          input.value = textRes;
          input.name = `radio_${idPregunta}`;

          inputNames[`radio_${idPregunta}`] = null;

          const label = document.createElement('label');
          label.setAttribute('for', `${idPregunta}_${idRes}`);
          label.innerHTML = textRes;

          div.appendChild(input);
          div.appendChild(label);

          fragment.appendChild(div);
        });
      });

      fragment.appendChild(document.createElement('br'));
      fragment.appendChild(document.createElement('br'));

      form.insertBefore(fragment, btnEnviar);
    });

  btnEnviar.addEventListener('click', function (event) {
    event.preventDefault();

    // validar formulario;
    let isValid = true;

    if (isValid) {
        btnEnviar.setAttribute('disabled', true);
        window
          .fetch('./respuestas.json')
          .then(response => response.json())
          .then(correctas => {
            for (let name in inputNames) {
                const input = [].slice.call(form[name]).find(node => node.checked);
                const seleccionDelUsuario = input.id.split('_');
                const pregunta = seleccionDelUsuario[0];
                const seleccionUsuario = seleccionDelUsuario[1];
                const respuestaCorrecta = correctas[pregunta];

                if (seleccionUsuario === respuestaCorrecta) {
                    input.parentElement.classList.add('correcta');
                } else {
                    input.parentElement.classList.add('incorrecta');
                    const el = document.querySelector(`#${pregunta}_${respuestaCorrecta}`);
                    el.parentElement.classList.add('correcta');
                }
            }
          });
    }

  });
}

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
