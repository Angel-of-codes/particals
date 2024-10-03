const canvas = document.getElementById("starfieldCanvas");
      const ctx = canvas.getContext("2d");

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const stars = [];
      const numStars = 500;
      const speed = 2;

      class Star {
        constructor() {
          this.init();
        }

        init() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.z = Math.random() * canvas.width;
        }

        update() {
          this.z -= speed;
          if (this.z <= 0) {
            this.init();
            this.z = canvas.width;
          }
        }

        draw() {
          const x = (this.x - canvas.width / 2) * (canvas.width / this.z);
          const y = (this.y - canvas.height / 2) * (canvas.width / this.z);
          const radius = canvas.width / this.z;

          ctx.beginPath();
          ctx.arc(
            x + canvas.width / 2,
            y + canvas.height / 2,
            radius,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = "#FFF";
          ctx.fill();
          ctx.closePath();
        }
      }

      function init() {
        for (let i = 0; i < numStars; i++) {
          stars.push(new Star());
        }
      }

      function animate() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach((star) => {
          star.update();
          star.draw();
        });

        requestAnimationFrame(animate);
      }

      init();
      animate();

      window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });