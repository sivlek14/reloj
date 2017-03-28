
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		rojo = false,
		radio = 110,
		radioNumeros = radio + 15;
		angulo = 0,
		tamanioManecilla = canvas.width/25,
		tamanioManecillaHora = canvas.width/10;

	function dibujarCirculo()
	{
		context.beginPath();
		context.lineWidth = 5;
		context.strokeStyle = "gold";
		context.arc(canvas.width/2,canvas.height/2,radio,0,Math.PI*2);
		context.stroke();
	}

	function dibujarNumeros()
	{
		for(var i=1;i<=12;i++)
		{
			angulo = ((i-3) * 0.1666 * Math.PI);
			var y = null;
			switch(i)
			{
				case 1:
					y = "I"
					break;
				case 2:
					y = "II"
					break;
				case 3:
					y = "III"
					break;
				case 4:
					y = "IIII"
					break;
				case 5:
					y = "V"
					break;
				case 6:
					y = "VI"
					break;
				case 7:
					y = "VII"
					break;
				case 8:
					y = "VIII"
					break;
				case 9:
					y = "IX"
					break;
				case 10:
					y = "X"
					break;
				case 11:
					y = "XI"
					break;
				case 12:
					y = "XII"
					break;
				default:
					y = "X";
					break;
			}
			context.font = "11px Arial";
			context.fillText(
				y,
				canvas.width/2+Math.cos(angulo)*(radioNumeros)-context.measureText(i).width/2,
				canvas.height/2+Math.sin(angulo)*(radioNumeros)+5
			);
		}
	}

	function dibujarPuntoCentrico()
	{
		context.beginPath();
		context.fillStyle = "gold";
		context.arc( canvas.width / 2, canvas.height/2,5,0,Math.PI*2);
		context.fill();
	}

	function dibujarManecillas(loc, isHour)
	{
		var angulo = (Math.PI * 2) * (loc / 60) - Math.PI / 2,
		radioManecillas = isHour ? 
		radio - tamanioManecilla - tamanioManecillaHora : 
		radio - tamanioManecilla;

		context.moveTo(
			canvas.width / 2, canvas.height / 2
		);
		context.lineTo(
			canvas.width / 2  + Math.cos(angulo) * radioManecillas, 
			canvas.height / 2 + Math.sin(angulo) * radioManecillas
		);
		context.fillStyle = "#555";
		context.stroke();
	}

	function actualizarManecillas()
	{
		var fecha = new Date,
		hora = fecha.getHours();
		hora = hora > 12 ? hora - 12 : hora,

		dibujarManecillas( hora * 5 + ( fecha.getMinutes() / 60 ) * 5, true, 0.5);
		dibujarManecillas( fecha.getMinutes(), false, 0.5);
		dibujarManecillas( fecha.getSeconds(), false, 0.2);
	}

	function iniciarReloj()
	{
		context.clearRect(0, 0, canvas.width, canvas.height);
		dibujarCirculo();
		dibujarNumeros();
		dibujarPuntoCentrico();
		actualizarManecillas();
	}
	function initApp()
	{
		loop = setInterval(iniciarReloj, 1000);
	}