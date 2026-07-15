// 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    const TAMANIO_CELDA = 25;

    let serpiente = [
      {x: 8, y: 8},
      {x: 7, y: 8},
      {x: 6, y: 8}
    ];

    let comida = {x: 12, y: 8};
    let direccionActual = "derecha";
    let intervaloSerpiente = null;
    let puntaje = 0;

    // Primera pintura del juego al cargar la página
    dibujarTodo();

    // =========================
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarTablero() {
      ctx.strokeStyle = "#3a2f5c";
      ctx.beginPath();

      for (let x = 0; x <= canvas.width; x = x + TAMANIO_CELDA) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }

      for (let y = 0; y <= canvas.height; y = y + TAMANIO_CELDA) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }

      ctx.stroke();
    }

    function pintarParte(lineaX, lineaY, color) {
      let x = lineaX * TAMANIO_CELDA;
      let y = lineaY * TAMANIO_CELDA;

      ctx.fillStyle = color;
      ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

      ctx.strokeStyle = "#170a2b";
      ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
    }

    function pintarSerpiente() {
      let parte;
      for (let i = 0; i < serpiente.length; i++) {
        parte = serpiente[i];
        if (i === 0) {
          pintarParte(parte.x, parte.y, "#facc15");
        } else {
          pintarParte(parte.x, parte.y, "#f43f5e");
        }
      }
    }

    function pintarComida() {
      let lineasVerticales = canvas.width / TAMANIO_CELDA;
      let lineasHorizontales = canvas.height / TAMANIO_CELDA;

      let x = Math.floor(Math.random() * lineasVerticales);
      let y = Math.floor(Math.random() * lineasHorizontales);

      comida = {x: x, y: y};
      pintarParte(comida.x, comida.y, "#22d3ee");
    }

    function dibujarTodo() {
      limpiarCanvas();
      dibujarTablero();
      pintarParte(comida.x, comida.y, "#22d3ee");
      pintarSerpiente();
    }

    // =========================
    // MOVIMIENTO
    // =========================

    function moverDerecha() {
      let cabeza = serpiente[0];
      let nuevaCabeza = {x: cabeza.x + 1, y: cabeza.y};
      serpiente.unshift(nuevaCabeza);
      serpiente.pop();
    }

    function moverIzquierda() {
      let cabeza = serpiente[0];
      let nuevaCabeza = {x: cabeza.x - 1, y: cabeza.y};
      serpiente.unshift(nuevaCabeza);
      serpiente.pop();
    }

    function moverArriba() {
      let cabeza = serpiente[0];
      let nuevaCabeza = {x: cabeza.x, y: cabeza.y - 1};
      serpiente.unshift(nuevaCabeza);
      serpiente.pop();
    }

    function moverAbajo() {
      let cabeza = serpiente[0];
      let nuevaCabeza = {x: cabeza.x, y: cabeza.y + 1};
      serpiente.unshift(nuevaCabeza);
      serpiente.pop();
    }

    function cambiarDireccion(direccion) {
      direccionActual = direccion;
    }

    // =========================
    // COMIDA Y CRECIMIENTO
    // =========================

    function atrapaComida() {
      let cabeza = serpiente[0];
      if (cabeza.x === comida.x && cabeza.y === comida.y) {
        return true;
      } else {
        return false;
      }
    }

    function crecerSerpiente() {
      let cola = serpiente[serpiente.length - 1];
      let nuevaParte;

      if (direccionActual === "derecha") {
        nuevaParte = {x: cola.x - 1, y: cola.y};
      } else if (direccionActual === "izquierda") {
        nuevaParte = {x: cola.x + 1, y: cola.y};
      } else if (direccionActual === "arriba") {
        nuevaParte = {x: cola.x, y: cola.y + 1};
      } else {
        nuevaParte = {x: cola.x, y: cola.y - 1};
      }

      serpiente.push(nuevaParte);
    }

    // =========================
    // JUEGO AUTOMÁTICO
    // =========================

    function moverSerpiente() {
      if (direccionActual === "derecha") {
        moverDerecha();
      } else if (direccionActual === "izquierda") {
        moverIzquierda();
      } else if (direccionActual === "arriba") {
        moverArriba();
      } else if (direccionActual === "abajo") {
        moverAbajo();
      }

      if (atrapaComida()) {
        puntaje = puntaje + 1;
        document.getElementById("puntaje").innerHTML = puntaje;
        crecerSerpiente();
        pintarComida();
      }

      dibujarTodo();
    }

    function iniciarJuego() {
      clearInterval(intervaloSerpiente);
      intervaloSerpiente = setInterval(moverSerpiente, 200);
      document.getElementById("estado").innerHTML = "Jugando";
    }

    function pausarJuego() {
      clearInterval(intervaloSerpiente);
      document.getElementById("estado").innerHTML = "Pausado";
    }

    function reiniciarJuego() {
      clearInterval(intervaloSerpiente);
      serpiente = [
        {x: 8, y: 8},
        {x: 7, y: 8},
        {x: 6, y: 8}
      ];
      direccionActual = "derecha";
      puntaje = 0;
      document.getElementById("puntaje").innerHTML = puntaje;
      document.getElementById("estado").innerHTML = "Listo";
      pintarComida();
      dibujarTodo();
    }