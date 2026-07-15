// 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    const TAMANIO_CELDA = 25;

    const serpiente = [
      {x: 8, y: 5},
      {x: 7, y: 5},
      {x: 6, y: 5}
    ];

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

    function pintarParte(lineaX, lineaY) {
      let x = lineaX * TAMANIO_CELDA;
      let y = lineaY * TAMANIO_CELDA;

      ctx.fillStyle = "#f43f5e";
      ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

      ctx.strokeStyle = "#170a2b";
      ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
    }

    function pintarSerpiente() {
      let parte;
      for (let i = 0; i < serpiente.length; i++) {
        parte = serpiente[i];

        if (i === 0) {
          ctx.fillStyle = "#facc15";
        } else {
          ctx.fillStyle = "#f43f5e";
        }

        let x = parte.x * TAMANIO_CELDA;
        let y = parte.y * TAMANIO_CELDA;
        ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

        ctx.strokeStyle = "#170a2b";
        ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
      }
    }

    function dibujarTodo() {
      limpiarCanvas();
      dibujarTablero();
      pintarSerpiente();
    }